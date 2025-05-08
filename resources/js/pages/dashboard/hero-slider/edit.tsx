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

interface HeroSlider {
    id: number;
    title: string;
    description: string;
    image: string;
    status: string;
}

export default function EditSlide({ slides }: { slides: HeroSlider }) {
    
    const [title, setTitle] = useState<string>(slides.title);
    const [description, setDescription] = useState<string>(slides.description);
    const [image, setImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [status, setStatus] = useState(slides.status);
    const { errors } = usePage().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Hero Slider', href: '/dashboard/hero-slider' },
        { title: slides.title, href: `/dashboard/hero-slider/${slides.title}` },
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

        router.post(route('hero-slider.update', slides.id), {
            _method: 'put',
            title,
            description,
            image,
            status,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Slide" />
            <div className="p-4">
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {/* Slide Name */}
                        <div className="grid grid-cols-1 items-center">
                            <Label htmlFor="title" className="mb-2">
                                Slide Title
                            </Label>
                            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
                            <InputError id="title-error" message={errors.title} />
                        </div>

                        <div className="border-accent flex flex-col space-x-2 rounded-lg border p-4">
                            <Label className="mb-5">Status</Label>
                            <RadioGroup defaultValue="valid" value={slides.status} onValueChange={(value) => setStatus(value)}>
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
                            {slides.image && (
                                <img
                                    src={`/storage/${slides.image}`}
                                    alt={slides.title}
                                    className={'border-accent mt-3 h-32 w-32 rounded-lg border ' + (previewImage ? 'opacity-30' : '')}
                                />
                            )}
                            <div className="flex items-center justify-center">
                                {previewImage && (
                                    <img src={previewImage} alt={slides.title} className="border-accent mt-3 h-32 w-32 rounded-lg border" />
                                )}
                            </div>
                            <InputError id="image-error" message={errors.image} />
                        </div>

                        {/* Slide Description */}
                        <div className="grid grid-cols-1 items-center">
                            <Label htmlFor="description" className="mb-2">
                                Slide Description
                            </Label>
                            <Editor value={description} onTextChange={(e) => setDescription(e.htmlValue)} style={{ height: '320px' }} />
                            <InputError id="description-error" message={errors.description} />
                        </div>
                    </div>

                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
