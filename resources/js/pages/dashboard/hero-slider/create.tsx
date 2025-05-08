import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { Check } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { Editor } from 'primereact/editor';

type HeroSliderForm = {
    title: string;
    description: string;
    image: File | null;
};

export default function CreateSlide() {
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm<HeroSliderForm>({
        title: '',
        description: '',
        image: null,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Hero Slider', href: '/dashboard/hero-slides' },
        { title: 'New Slide', href: '/dashboard/hero-slides/create' },
    ];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('hero-slider.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Slide" />
            <div className="p-4">
                <div className="">
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            {/* Slide Name */}
                            <div className="grid grid-cols-1 items-center">
                                <Label htmlFor="title" className="mb-2">
                                    Slide Title
                                </Label>
                                <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} className="col-span-3" />
                                <InputError id="name-error" message={errors.title} />
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
                                <InputError id="image-error" message={errors.image} />
                            </div>
                            <div className="grid grid-cols-1 items-center">
                                <Label htmlFor="name" className="mb-2">
                                    Slide Description
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
