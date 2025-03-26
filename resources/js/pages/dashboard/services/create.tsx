import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { Check, MinusCircle, PlusCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { Editor } from 'primereact/editor';

type ServiceForm = {
    name: string;
    description: string;
    image: File | null;
    faqs: { question: string; answer: string }[];
};

export default function CreateService() {
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm<ServiceForm>({
        name: '',
        description: '',
        image: null,
        faqs: [],
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Services', href: '/dashboard/services' },
        { title: 'New Service', href: '/dashboard/services/create' },
    ];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const addFaq = () => {
        setData('faqs', [...data.faqs, { question: '', answer: '' }]);
    };

    const updateFaq = (index: number, field: 'question' | 'answer', value: string) => {
        const updatedFaqs = [...data.faqs];
        updatedFaqs[index][field] = value;
        setData('faqs', updatedFaqs);
    };

    const removeFaq = (index: number) => {
        setData(
            'faqs',
            data.faqs.filter((_, i) => i !== index),
        );
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('services.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit service" />
            <div className="p-4">
                <div className="">
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            {/* service Name */}
                            <div className="grid grid-cols-1 items-center">
                                <Label htmlFor="name" className="mb-2">
                                    Service Name
                                </Label>
                                <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="col-span-3" />
                                <InputError id="name-error" message={errors.name} />
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
                                    Service Description
                                </Label>
                                <Editor
                                    value={data.description}
                                    onTextChange={(e) => setData('description', e.htmlValue)}
                                    style={{ height: '320px' }}
                                />
                                <InputError id="description-error" message={errors.description} />
                            </div>
                            <Separator />

                            {/* FAQs Section */}
                            <div className="mt-4">
                                <div className="flex items-center justify-between">
                                    <Label className="mb-2">Frequently Asked Questions</Label>
                                    {/* Add FAQ Button */}
                                    <Button type="button" onClick={addFaq} className="mt-2">
                                        <PlusCircle />
                                    </Button>
                                </div>

                                {data.faqs.map((faq, index) => (
                                    <div key={index} className="my-4 rounded-lg border p-2">
                                        <div className="m-2 flex items-center justify-between">
                                            <Label>Question #{index + 1}</Label>
                                            {/* Remove FAQ Button */}
                                            <Button
                                                type="button"
                                                onClick={() => removeFaq(index)}
                                                variant="destructive"
                                                className="mt-2 flex items-center gap-1"
                                            >
                                                <MinusCircle size={16} />
                                            </Button>
                                        </div>
                                        <div className="grid gap-2">
                                            <Input
                                                placeholder="Question"
                                                value={faq.question}
                                                onChange={(e) => updateFaq(index, 'question', e.target.value)}
                                            />
                                            <InputError id={`faq-question-error-${index}`} message={errors[`faqs.${index}.question`]} />

                                            <Textarea
                                                placeholder="Answer"
                                                value={faq.answer}
                                                onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                                            />
                                            <InputError id={`faq-answer-error-${index}`} message={errors[`faqs.${index}.answer`]} />
                                        </div>
                                    </div>
                                ))}
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
