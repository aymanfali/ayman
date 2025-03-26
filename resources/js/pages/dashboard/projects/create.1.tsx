import FileUploader from '@/components/dashboard/file-upload';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { Check } from 'lucide-react';
import { Editor } from 'primereact/editor';
import { FormEventHandler, useState } from 'react';

type ProjectForm = {
    name: string;
    description: string;
    github_link: string;
    image: File | null;
    files: { file: string; }[];
};

export default function CreateProject() {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [files, setFiles] = useState([]);

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm<ProjectForm>({
        name: '',
        description: '',
        github_link: '',
        image: null,
        files: [],
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Projects', href: '/dashboard/projects' },
        { title: 'New project', href: '/dashboard/projects/create' },
    ];

    const handleFilesChange = (updatedFiles) => {
        setFiles(updatedFiles);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('projects.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit project" />
            <div className="p-4">
                <div className="">
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            {/* project Name */}
                            <div className="grid grid-cols-1 items-center">
                                <Label htmlFor="name" className="mb-2">
                                    project Name
                                </Label>
                                <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="col-span-3" />
                                <InputError id="name-error" message={errors.name} />
                            </div>
                            {/* project Github Link */}
                            <div className="grid grid-cols-1 items-center">
                                <Label htmlFor="name" className="mb-2">
                                    Github Link
                                </Label>
                                <Input
                                    id="github_link"
                                    value={data.github_link}
                                    onChange={(e) => setData('github_link', e.target.value)}
                                    className="col-span-3"
                                />
                                <InputError id="github_link-error" message={errors.github_link} />
                            </div>

                            {/* Image Upload */}
                            <div className="grid grid-cols-1 items-center">
                                <Label htmlFor="image" className="mb-2">
                                    Image
                                </Label>
                                <Input id="image" type="file" onChange={handleFileChange} className="col-span-3" />

                                <div className="flex items-center justify-center">
                                    {previewImage && (
                                        <img src={previewImage} alt="Preview" className="border-accent mt-3 h-32 w-32 rounded-lg border" />
                                    )}
                                </div>

                                <FileUploader onFilesChange={handleFilesChange} />
                                <InputError id="image-error" message={errors.image} />
                            </div>

                            <div className="grid grid-cols-1 items-center">
                                <Label htmlFor="name" className="mb-2">
                                    Project Description
                                </Label>
                                <Editor
                                    value={data.description}
                                    onTextChange={(e) => setData('description', e.htmlValue)}
                                    style={{ height: '320px' }}
                                />
                                <InputError id="description-error" message={errors.description} />
                            </div>
                        </div>

                        <Button type="submit" className="w-full" disabled={processing}>
                            Submit
                        </Button>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="flex gap-1 text-sm text-neutral-600">
                                <Check /> Saved
                            </p>
                        </Transition>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
