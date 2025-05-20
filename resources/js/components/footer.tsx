import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { useLaravelReactI18n } from 'laravel-react-i18n';

const Footer = () => {
    const [visible, setVisible] = useState(false);
    const { t } = useLaravelReactI18n();

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <>
            <div className="border-accent my-5 w-full border"></div>

            <footer className="w-full px-4">
                {/* Scroll To Top Button */}
                <Button
                    onClick={scrollToTop}
                    className={`fixed right-10 bottom-10 z-50 p-3 shadow-lg transition-opacity duration-300 ${
                        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
                    }`}
                    aria-label="Scroll to top"
                    title="Scroll to top"
                >
                    <ArrowUp className="h-6 w-6" />
                </Button>

                {/* Top Section: Logo and Social Links */}
                <div className="mx-auto flex flex-col items-center space-y-6 sm:justify-between sm:space-y-0">
                    <div className="items-center space-x-4 min-md:flex">
                        <div className="border-accent rounded-2xl border p-2">
                            <img src="/ayman.png" width={80} alt="Ayman Logo" />
                        </div>
                    </div>

                    <h3 className="text-lg font-semibold">{t('layout.know_us')}</h3>

                    {/* Social Icons */}
                    <div className="m-3 flex flex-wrap justify-center gap-4">
                        <a
                            href="#"
                            aria-label="Email"
                            className="rounded-2xl p-3 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                        >
                            <Mail size={20} />
                        </a>
                        <a
                            href="#"
                            aria-label="LinkedIn"
                            className="rounded-2xl p-3 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                        >
                            <Linkedin size={20} />
                        </a>
                        <a
                            href="#"
                            aria-label="GitHub"
                            className="rounded-2xl p-3 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                        >
                            <Github size={20} />
                        </a>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-accent mx-auto my-10 w-20 border-t"></div>

                {/* Navigation Columns */}
                <div className="grid grid-cols-1 gap-10 text-center sm:grid-cols-2 sm:text-start md:grid-cols-3">
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">{t('layout.projects')}</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="hover:underline">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Press
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">{t('layout.services')}</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="hover:underline">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    {t('layout.contact_us')}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    {t('layout.privacy_policy')}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">{t('layout.support')}</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="hover:underline">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Docs
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    API
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-10 text-center text-sm text-gray-400">
                    Ayman &copy; {new Date().getFullYear()} {t('layout.copyright')}
                </div>
            </footer>
        </>
    );
};

export default Footer;
