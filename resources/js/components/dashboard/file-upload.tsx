import { XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FilesUploaderProps {
    onFilesChange: (files: File[]) => void;
    maxFileSize?: number;
    allowedFileTypes?: string[];
    onError?: (error: string) => void;
    fileSizeFormatter?: (size: number) => string;
    renderFilePreview?: ((file: File) => React.ReactNode) | null;
    currentImages?: {
        [x: string]: string; file: string 
}[];
}

export default function FilesUploader({
    onFilesChange,
    maxFileSize = 5 * 1024 * 1024, // Default 5MB
    allowedFileTypes = [],
    onError = () => {}, // Error handler
    fileSizeFormatter = (size) => (size < 1024 * 1024 ? `${(size / 1024).toFixed(1)} KB` : `${(size / (1024 * 1024)).toFixed(2)} MB`),
    renderFilePreview = null, // Custom file preview renderer
    currentImages = [],
}: FilesUploaderProps) {
    const [files, setFiles] = useState([...currentImages]);
    const [dragging, setDragging] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    // Convert the max file size to a readable format
    const maxFileSizeReadable = `${(maxFileSize / (1024 * 1024)).toFixed(2)} MB`;

    useEffect(() => {
        // Cleanup ObjectURLs when the component unmounts or files change
        return () => {
            files.forEach((file) => {
                if (file.previewUrl) {
                    URL.revokeObjectURL(file.previewUrl);
                }
            });
        };
    }, [files]);

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        const droppedFiles = Array.from(event.dataTransfer.files);
        handleFileValidation(droppedFiles);
    };

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        handleFileValidation(selectedFiles);
    };

    const handleFileValidation = (filesToAdd) => {        
        let validFiles = [];
        let errorMessages = [];

        filesToAdd.forEach((file) => {
            // Check if the file already exists in the state
            const fileExists = files.some((existingFile) => existingFile.name === file.name && existingFile.size === file.size);

            if (fileExists) {
                errorMessages.push(`${file.name} is already added.`);
                return; // Skip adding duplicate file
            }

            // Validate file type
            if (allowedFileTypes.length > 0 && !allowedFileTypes.includes(file.type)) {
                errorMessages.push(`${file.name} is not a valid file type.`);
                return;
            }

            // Validate file size
            if (file.size > maxFileSize) {
                errorMessages.push(`${file.name} is too large. Max size is ${maxFileSizeReadable}.`);
            } else {
                file.previewUrl = URL.createObjectURL(file); // Create preview URL
                validFiles.push(file);
            }
        });

        if (errorMessages.length > 0) {
            setErrorMessages(errorMessages);
            onError(errorMessages); // Notify parent about errors
        } else {
            setErrorMessages([]);
            setFiles((prevFiles) => {
                const updatedFiles = [...prevFiles, ...validFiles];
                onFilesChange(updatedFiles); // Notify parent component about updated files
                return updatedFiles;
            });
        }
    };

    const removeFile = (index) => {
        setFiles((prevFiles) => {
            const newFiles = [...prevFiles];
            const removedFile = newFiles.splice(index, 1)[0];
            if (removedFile.previewUrl) {
                URL.revokeObjectURL(removedFile.previewUrl); // Clean up ObjectURL
            }
            onFilesChange(newFiles); // Notify parent component about updated files
            return newFiles;
        });
    };

    return (
        <div
            className={`mx-auto w-full rounded-lg border-2 p-4 text-center transition-all duration-200 ${dragging ? 'border-blue-500' : 'border-dashed border-gray-300'}`}
            onDrop={handleDrop}
            onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
        >
            <input type="file" multiple onChange={handleFileChange} className="hidden" id="fileInput" />
            <label htmlFor="fileInput" className="block cursor-pointer rounded-lg p-6">
                Drag & Drop files here or <span className="text-blue-500">browse</span>
            </label>

            {/* Max file size message */}
            <p className="mt-2 text-sm text-gray-500">Max file size: {maxFileSizeReadable}</p>

            {/* Display all error messages */}
            {errorMessages.length > 0 && (
                <div className="mt-2 text-sm text-red-500">
                    {errorMessages.map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            )}
            {files.length > 0 && (
                <button
                    onClick={() => {
                        files.forEach((file) => file.previewUrl && URL.revokeObjectURL(file.previewUrl));
                        setFiles([]);
                        onFilesChange([]);
                    }}
                    className="mt-3 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                >
                    Remove All
                </button>
            )}

            {/* Grid View */}
            <div className="mt-4 grid grid-cols-3 gap-3">
                {files.map((file, index) => (
                    <div
                        key={index}
                        className="relative flex flex-col items-center rounded-lg border p-2"
                        draggable="true"
                        onDragStart={(e) => e.preventDefault()} // Prevent dragging
                    >
                        {/* Check for previewUrl for new files */}
                        {file.previewUrl ? (
                            <img src={file.previewUrl} alt="preview" className="h-16 w-16 rounded-md object-cover" />
                        ) : file.files ? (
                            // If file.url exists, show the current (pre-existing) image
                            <img src={`/storage/${file.files}`} alt="current" className="h-16 w-16 rounded-md object-cover" />
                        ) : (
                            // Default for unknown file types
                            <div className="flex h-16 w-16 items-center justify-center rounded-md bg-gray-200 text-xs text-gray-500">{file.name}</div>
                        )}

                        <div className="mt-1 w-full text-center text-sm">
                            <span className="block w-full truncate text-xs font-medium">{file.name}</span>
                            {/* Ensure file size is displayed correctly */}
                            <span className="text-xs text-gray-500">{file.size ? fileSizeFormatter(file.size) : ''}</span>
                        </div>

                        <button
                            onClick={() => removeFile(index)}
                            className="absolute top-0 right-0 rounded p-1 text-red-500 hover:cursor-pointer hover:bg-red-500 hover:text-white"
                        >
                            <XIcon size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
