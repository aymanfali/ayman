import Footer from '@/components/footer';
import Header from '@/components/header';
import { Toaster } from '@/components/ui/sonner';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function GuestLayout({ children }: AppLayoutProps) {
    const { auth } = usePage<SharedData>().props;
    const [isScrolled, setIsScrolled] = useState(false);
    const { locale } = usePage().props as unknown as { locale: string };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div dir={locale == 'ar' ? 'rtl' : 'ltr'} className="mx-auto flex max-w-7xl flex-col items-center lg:justify-center">
                <header
                    className={`border-accent mb-6 w-full border-b p-2 text-sm transition-all duration-300 not-has-[nav]:hidden ${
                        isScrolled
                            ? `fixed top-0 z-50 m-4 mx-auto rounded-3xl bg-white/70 shadow-md backdrop-blur-md max-sm:w-full sm:max-w-2xl md:max-w-3xl xl:max-w-7xl dark:bg-[#1b1b18]/70`
                            : ''
                    } `}
                >
                    <Header auth={auth} />
                </header>
                <div className="w-full justify-center p-5 opacity-100 transition-opacity duration-700 lg:grow starting:opacity-0">{children}</div>
                <Toaster position="top-right" richColors />
                <Footer />
            </div>
        </>
    );
}
