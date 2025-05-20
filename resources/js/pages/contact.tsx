import GuestLayout from '@/layouts/guest-layout';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Check } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';

type ContactForm = {
    first_name: string;
    last_name: string;
    email: string;
    subject: string;
    content: string;
};

interface Flash {
    success?: string;
    danger?: string;
}

export default function ContactUs() {
    const { flash } = usePage<{ flash: Flash }>().props;
    const [isScrolled, setIsScrolled] = useState(false);
    const { t } = useLaravelReactI18n();

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm<ContactForm>({
        first_name: '',
        last_name: '',
        email: '',
        subject: '',
        content: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('contact-us.store'));
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
    }, [flash.success]);

    return (
        <>
            <GuestLayout>
                <div className={`${isScrolled ? `mt-32` : ''}`}>
                    <h1 className="mb-4 text-center text-4xl font-bold md:text-5xl">{t('contact_us.contact_us')}</h1>
                    <p className="mb-6 text-center text-lg">{t('contact_us.contact_us_sub')}</p>
                    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl rounded-xl p-4 shadow-md">
                        {/* Name Fields: Responsive Flex/Grid */}
                        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Input
                                name="first_name"
                                type="text"
                                placeholder={t('contact_us.first_name')}
                                className="w-full"
                                value={data.first_name}
                                onChange={(e) => setData('first_name', e.target.value)}
                                required
                            />
                            {errors.first_name && <p className="text-sm text-red-600">{errors.first_name}</p>}
                            <Input
                                name="last_name"
                                type="text"
                                placeholder={t('contact_us.last_name')}
                                className="w-full"
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                                required
                            />
                            {errors.last_name && <p className="text-sm text-red-600">{errors.last_name}</p>}
                        </div>

                        <Input
                            name="email"
                            type="email"
                            placeholder={t('contact_us.email')}
                            className="mb-4 w-full"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}

                        <Input
                            name="subject"
                            type="text"
                            placeholder={t('contact_us.subject')}
                            className="mb-4 w-full"
                            value={data.subject}
                            onChange={(e) => setData('subject', e.target.value)}
                        />
                        {errors.subject && <p className="text-sm text-red-600">{errors.subject}</p>}

                        {/* Textarea */}
                        <div className="mb-4">
                            <Textarea
                                name="content"
                                placeholder={t('contact_us.write')}
                                className="min-h-[150px] w-full"
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                required
                            />
                            {errors.content && <p className="text-sm text-red-600">{errors.content}</p>}
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <Button type="submit" className="rounded-md px-6 py-2 transition" disabled={processing}>
                                {processing ? t('contact_us.submitting') : t('contact_us.submit')}
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
                        </div>
                    </form>
                </div>
            </GuestLayout>
        </>
    );
}
