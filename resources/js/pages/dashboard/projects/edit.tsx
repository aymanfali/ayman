import FilesUploader from '@/components/dashboard/file-upload';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Editor } from 'primereact/editor';
import { FormEventHandler, useState } from 'react';

interface Project {
    id: number;
    name: string;
    github_link: string;
    description: string;
    image: string;
    status: string;
    files: { file: string }[];
}

export default function EditProject({ project }: { project: Project }) {
    const [name, setName] = useState<string>(project.name);
    const [github_link, setGitHubLink] = useState<string>(project.github_link);
    const [description, setDescription] = useState<string>(project.description);
    const [image, setImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [status, setStatus] = useState(project.status);
    const [files, setFiles] = useState<{ file: string }[]>(project.files || []);
    const { errors } = usePage().props;    

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'projects', href: '/dashboard/projects' },
        { title: project.name, href: `/dashboard/projects/${project.name}` },
    ];

    const handleFilesChange = (files) => {
        setFiles(files);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        router.post(route('projects.update', project.id), {
            _method: 'put',
            name,
            github_link,
            description,
            image,
            status,
            files,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit project" />
            <div className="p-4">
                <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                        <div className="grid gap-4 py-4">
                            {/* project Name */}
                            <div className="grid grid-cols-1 items-center">
                                <Label htmlFor="name" className="mb-2">
                                    project Name
                                </Label>
                                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                                <InputError id="name-error" message={errors.name} />
                            </div>

                            <div className="grid grid-cols-1 items-center py-4">
                                <Label className="mb-2">Gallery</Label>
                                <FilesUploader
                                    currentImages={project.files}
                                    onFilesChange={handleFilesChange}
                                    maxFileSize={10 * 1024 * 1024} // 10MB
                                    allowedFileTypes={['image/png', 'image/jpeg']}
                                />
                                <InputError id="files-error" message={errors.files} />
                            </div>

                            {/* project Description */}
                            <div className="grid grid-cols-1 items-center">
                                <Label htmlFor="name" className="mb-2">
                                    project Description
                                </Label>
                                <Editor value={description} onTextChange={(e) => setDescription(e.htmlValue)} style={{ height: '320px' }} />
                                <InputError id="description-error" message={errors.description} />
                            </div>
                        </div>

                        <Button type="submit" className="w-full">
                            Submit
                        </Button>
                    </div>
                    <div className="col-span-1">
                        {/* project Github Link */}
                        <div className="grid grid-cols-1 items-center py-4">
                            <Label htmlFor="name" className="mb-2">
                                Github Link
                            </Label>
                            <Input id="github_link" value={github_link} onChange={(e) => setGitHubLink(e.target.value)} className="col-span-3" />
                            <InputError id="github_link-error" message={errors.github_link} />
                        </div>
                        <div className="border-accent flex flex-col space-x-2 rounded-lg border p-4">
                            <Label className="mb-5">Status</Label>
                            <RadioGroup defaultValue="valid" value={status} onValueChange={(value) => setStatus(value)}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="valid" id="valid" />
                                    <Label htmlFor="valid">Valid</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="invalid" id="invalid" />
                                    <Label htmlFor="invalid">Invalid</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Image Upload */}
                        <div className="grid grid-cols-1 items-center">
                            <Label htmlFor="image" className="mb-2">
                                Image
                            </Label>
                            <Input id="image" type="file" onChange={handleFileChange} className="col-span-3" />
                            {project.image && (
                                <img
                                    src={`/storage/${project.image}`}
                                    alt={project.name}
                                    className={'border-accent mt-3 h-32 w-32 rounded-lg border ' + (previewImage ? 'opacity-30' : '')}
                                />
                            )}
                            <div className="flex items-center justify-center">
                                {previewImage && (
                                    <img src={previewImage} alt={project.name} className="border-accent mt-3 h-32 w-32 rounded-lg border" />
                                )}
                            </div>

                            <InputError id="image-error" message={errors.image} />
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
