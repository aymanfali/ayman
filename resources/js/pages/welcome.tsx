import HeroSlider from '@/components/sliders/hero-slider';
import ProjectsSlider from '@/components/sliders/projects-slider';
import ServicesSlider from '@/components/sliders/services-slider';
import GuestLayout from '@/layouts/guest-layout';

import { Link, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface HeroSlides {
    id: number;
    title: string;
    image: string;
}

interface Service {
    id: number;
    name: string;
    image: string;
}

interface Project {
    id: number;
    name: string;
    image: string;
    github_link: string;
}

interface Props {
    heroSlides: HeroSlides[];
    projects: Project[];
    services: Service[];
}

interface Flash {
    success?: string;
    danger?: string;
}

export default function Welcome({ services, projects, heroSlides }: Props) {
    const [isScrolled, setIsScrolled] = useState(false);
    const { flash } = usePage<{ flash: Flash }>().props;
    const { t } = useLaravelReactI18n();

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
                <main className="w-full">
                    <section className={`flex w-full flex-col p-5 xl:flex-row ${isScrolled ? `mt-32` : ''}`}>
                        {/* Text Content */}
                        <div className="flex w-full flex-col items-center justify-center text-center xl:w-1/2 xl:items-start xl:text-start">
                            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                                {t('home.hero_text')} <code className="text-blue-500">{t('home.highlighted_hero_word')}</code>
                            </h1>
                            <p className="mb-6 text-lg">{t('home.hero_sub_text')}.</p>
                            <Link
                                href="/contact-us"
                                className="border-accent hover:bg-accent focus:ring-accent m-3 inline-block rounded-2xl border px-6 py-3 text-lg transition focus:ring-2 focus:outline-none"
                            >
                                {t('home.contact_us')}
                            </Link>
                        </div>

                        {/* HeroSlider */}
                        <div className="border-accent mx-auto mt-8 w-full max-w-2xl rounded-2xl border p-5 xl:me-10 xl:mt-0 xl:w-1/2">
                            <HeroSlider heroSlides={heroSlides} />
                        </div>
                    </section>

                    <div className="border-accent my-5 border"></div>

                    <section className="projects flex w-full flex-col p-5 xl:flex-row">
                        <div className="flex w-full flex-col items-center justify-center text-center xl:w-1/3 xl:items-start xl:text-left">
                            <h1 className="mb-4 text-center text-4xl font-bold md:text-5xl">{t('home.projects')}</h1>
                            <p className="mb-6 text-center text-lg">{t('home.projects_sub_text')}</p>
                            <Link
                                href="/projects"
                                className="border-accent hover:bg-accent focus:ring-accent m-3 inline-block rounded-2xl border px-6 py-3 text-lg transition focus:ring-2 focus:outline-none"
                            >
                                {t('home.show_more')}
                            </Link>
                        </div>
                        <div className="border-accent mx-auto mt-8 w-full max-w-3xl rounded-2xl border p-5 xl:mt-0 xl:ml-10 xl:w-2/3">
                            <ProjectsSlider projects={projects} />
                        </div>
                    </section>

                    <div className="border-accent my-5 border"></div>

                    <section className="services flex w-full flex-col p-5 xl:flex-row">
                        <div className="flex w-full flex-col items-center justify-center text-center xl:w-1/3 xl:items-start xl:text-left">
                            <h1 className="mb-4 text-center text-4xl font-bold md:text-5xl">{t('home.services')}</h1>
                            <p className="mb-6 text-center text-lg">{t('home.services_sub_text')}</p>
                            <Link
                                href="/services"
                                className="border-accent hover:bg-accent focus:ring-accent m-3 inline-block rounded-2xl border px-6 py-3 text-lg transition focus:ring-2 focus:outline-none"
                            >
                                {t('home.show_more')}
                            </Link>
                        </div>
                        <div className="border-accent mx-auto mt-8 w-full max-w-3xl rounded-2xl border p-5 xl:mt-0 xl:ml-10 xl:w-2/3">
                            <ServicesSlider services={services} />
                        </div>
                    </section>
                </main>
            </GuestLayout>
        </>
    );
}
