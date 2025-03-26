import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { MinusCircle, PlusCircle } from 'lucide-react';
import { Editor } from 'primereact/editor';
import { FormEventHandler, useState } from 'react';

interface Faq {
    question: string;
    answer: string;
}

interface Service {
    id: number;
    name: string;
    description: string;
    image: string;
    status: string;
    faqs: Faq[];
}

export default function EditService({ service }: { service: Service }) {
    const [name, setName] = useState<string>(service.name);
    const [description, setDescription] = useState<string>(service.description);
    const [image, setImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>(service.faqs || []);
    const [status, setStatus] = useState(service.status);
    const { errors } = usePage().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Services', href: '/dashboard/services' },
        { title: service.name, href: `/dashboard/services/${service.name}` },
    ];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const addFaq = () => {
        setFaqs([...faqs, { question: '', answer: '' }]);
    };

    const updateFaq = (index: number, field: 'question' | 'answer', value: string) => {
        const updatedFaqs = [...faqs];
        updatedFaqs[index][field] = value;
        setFaqs(updatedFaqs);
    };

    const removeFaq = (index: number) => {
        setFaqs(faqs.filter((_, i) => i !== index));
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        router.post(route('services.update', service.id), {
            _method: 'put',
            name,
            description,
            image,
            faqs,
            status,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit service" />
            <div className="p-4">
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {/* Service Name */}
                        <div className="grid grid-cols-1 items-center">
                            <Label htmlFor="name" className="mb-2">
                                Service Name
                            </Label>
                            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                            <InputError id="name-error" message={errors.name} />
                        </div>

                        <div className="border-accent flex flex-col space-x-2 rounded-lg border p-4">
                            <Label className="mb-5">Status</Label>
                            <RadioGroup defaultValue="valid" value={service.status} onValueChange={(value) => setStatus(value)}>
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
                            {service.image && (
                                <img
                                    src={`/storage/${service.image}`}
                                    alt={service.name}
                                    className={'border-accent mt-3 h-32 w-32 rounded-lg border ' + (previewImage ? 'opacity-30' : '')}
                                />
                            )}
                            <div className="flex items-center justify-center">
                                {previewImage && (
                                    <img src={previewImage} alt={service.name} className="border-accent mt-3 h-32 w-32 rounded-lg border" />
                                )}
                            </div>
                            <InputError id="image-error" message={errors.image} />
                        </div>

                        {/* Service Description */}
                        <div className="grid grid-cols-1 items-center">
                            <Label htmlFor="name" className="mb-2">
                                Service Description
                            </Label>
                            <Editor value={description} onTextChange={(e) => setDescription(e.htmlValue)} style={{ height: '320px' }} />
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

                            {faqs.map((faq, index) => (
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

                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
