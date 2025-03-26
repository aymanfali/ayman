import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

interface Category {
    id: number;
    name: string;
    image: string;
    status: string;
}

export default function Edit({ category }: { category: Category }) {
    const [name, setName] = useState<string>(category.name);
    const [image, setImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [status, setStatus] = useState(category.status);
    const { errors } = usePage().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Categories', href: '/dashboard/categories' },
        { title: category.name, href: `/dashboard/categories/${category.name}` },
    ];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(route('categories.update', category.id), {
            _method: 'put',
            name,
            image,
            status,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Category" />
            <div className="p-4">
                <div className="flex items-center justify-center">
                    <form onSubmit={handleSubmit} className="max-w-[450px]">
                        <div className="grid gap-4 py-4">
                            {/* Category Name */}
                            <div className="grid grid-cols-1 items-center">
                                <Label htmlFor="name" className="mb-2">
                                    Category Name
                                </Label>
                                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                                <InputError id="name-error" message={errors.name} />
                            </div>

                            <div className="border-accent flex flex-col space-x-2 rounded-lg border p-4">
                                <Label className="mb-5">Status</Label>
                                <RadioGroup defaultValue="valid" value={category.status} onValueChange={(value) => setStatus(value)}>
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
                                {category.image && (
                                    <img
                                        src={`/storage/${category.image}`}
                                        alt={category.name}
                                        className={'border-accent mt-3 h-32 w-32 rounded-lg border ' + (previewImage ? 'opacity-30' : '')}
                                    />
                                )}
                                <div className="flex items-center justify-center">
                                    {previewImage && (
                                        <img src={previewImage!} alt={category.name} className="border-accent mt-3 h-32 w-32 rounded-lg border" />
                                    )}
                                </div>
                                <InputError id="image-error" message={errors.image} />
                            </div>
                        </div>

                        <Button type="submit" className="w-full">
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
