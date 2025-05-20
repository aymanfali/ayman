'use client';

import { Link, usePage } from '@inertiajs/react';
import * as React from 'react';

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Code, ContactRoundIcon, HomeIcon, MenuIcon, Workflow } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';

type Project = {
    id: string | number;
    name: string;
    description: string;
};
type Service = {
    id: string | number;
    name: string;
    description: string;
};

function isProjectArray(data: unknown): data is Project[] {
    return (
        Array.isArray(data) &&
        data.every((item) => typeof item === 'object' && item !== null && 'id' in item && 'name' in item && 'description' in item)
    );
}
function isServiceArray(data: unknown): data is Service[] {
    return (
        Array.isArray(data) &&
        data.every((item) => typeof item === 'object' && item !== null && 'id' in item && 'name' in item && 'description' in item)
    );
}

const getCleanUrl = (url: string): string => {
    return url.replace(/^\/(en|ar)(\/|$)/, '/');
};

export function NavigationHeader() {
    const { url } = usePage();
    const basenUrl = getCleanUrl(url);
    const { projects, services } = usePage().props;
    const { locale } = usePage().props as unknown as { locale: string };
    const { t } = useLaravelReactI18n();

    return (
        <>
            <div dir={locale == 'ar' ? 'rtl' : 'ltr'}>
                <NavigationMenu className="max-lg:hidden">
                    <NavigationMenuList dir={locale == 'ar' ? 'rtl' : 'ltr'}>
                        <NavigationMenuItem>
                            <Link href="/">
                                <div className="me-5">
                                    <img src={'/ayman.png'} width={80} alt="Ayman Logo" />
                                </div>
                            </Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem className={basenUrl === '/' ? 'bg-accent rounded-md' : ''}>
                            <Link href="/">
                                <NavigationMenuLink> {t('layout.home')}</NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem dir={locale == 'ar' ? 'rtl' : 'ltr'}>
                            <NavigationMenuTrigger className="bg-transparent">{t('layout.projects')}</NavigationMenuTrigger>
                            <NavigationMenuContent dir={locale == 'ar' ? 'rtl' : 'ltr'}>
                                <ul className="grid gap-3 p-4 md:w-[400px] lg:grid-cols-[.75fr_1fr]">
                                    {isProjectArray(projects) &&
                                        projects.map((project) => (
                                            <Link key={project.id} href={`/projects/${project.id}`}>
                                                <ListItem>
                                                    <div className="flex items-center">
                                                        <Code size={20} className="me-3" />
                                                        {project.name}
                                                    </div>
                                                </ListItem>
                                            </Link>
                                        ))}
                                </ul>
                                <ul>
                                    <Link href="/projects">
                                        <ListItem className="text-center">{t('layout.show_all')}</ListItem>
                                    </Link>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem dir={locale == 'ar' ? 'rtl' : 'ltr'}>
                            <NavigationMenuTrigger className="bg-transparent">{t('layout.services')}</NavigationMenuTrigger>
                            <NavigationMenuContent dir={locale == 'ar' ? 'rtl' : 'ltr'}>
                                <ul className="grid gap-3 p-4 md:w-[400px] lg:grid-cols-[.75fr_1fr]">
                                    {isServiceArray(services) &&
                                        services.map((service) => (
                                            <Link key={service.id} href={`/services/${service.id}`}>
                                                <ListItem>
                                                    <div className="flex items-center">
                                                        <Workflow size={20} className="me-3" />
                                                        {service.name}
                                                    </div>
                                                </ListItem>
                                            </Link>
                                        ))}
                                </ul>
                                <ul>
                                    <Link href="/services">
                                        <ListItem className="text-center">{t('layout.show_all')}</ListItem>
                                    </Link>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem className={basenUrl === '/contact-us' ? 'bg-accent rounded-md' : ''}>
                            <Link href="/contact-us">
                                <NavigationMenuLink>{t('layout.contact_us')}</NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Mobile Menu */}
                <div className="flex items-center">
                    <Sheet>
                        <SheetTrigger asChild className="lg:hidden">
                            <Button variant="outline">
                                <MenuIcon />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side={locale == 'ar' ? 'right' : 'left'}>
                            <SheetHeader>
                                <SheetTitle>{t('layout.portfolio')}</SheetTitle>
                                <SheetDescription>{t('layout.description')}</SheetDescription>
                            </SheetHeader>
                            <div className="mt-4 space-y-2">
                                <Link
                                    href="/"
                                    className={`menu-link hover:bg-accent m-2 flex rounded-md p-2 ${basenUrl === '/' ? 'bg-accent rounded-md' : ''}`}
                                    dir={locale == 'ar' ? 'rtl' : 'ltr'}
                                >
                                    <HomeIcon className="mx-3" size={20} />
                                    {t('layout.home')}
                                </Link>
                                <Link
                                    href="/contact-us"
                                    className={`menu-link hover:bg-accent m-2 flex rounded-md p-2 ${basenUrl === '/contact-us' ? 'bg-accent rounded-md' : ''}`}
                                    dir={locale == 'ar' ? 'rtl' : 'ltr'}
                                >
                                    <ContactRoundIcon className="mx-3" size={20} />
                                    {t('layout.contact_us')}
                                </Link>
                                <Link
                                    href="/projects"
                                    className={`menu-link hover:bg-accent m-2 flex rounded-md p-2 ${basenUrl === '/projects' ? 'bg-accent rounded-md' : ''}`}
                                    dir={locale == 'ar' ? 'rtl' : 'ltr'}
                                >
                                    <Code className="mx-3" size={20} />
                                    {t('layout.projects')}
                                </Link>
                                <Link
                                    href="/services"
                                    className={`menu-link hover:bg-accent m-2 flex rounded-md p-2 ${basenUrl === '/services' ? 'bg-accent rounded-md' : ''}`}
                                    dir={locale == 'ar' ? 'rtl' : 'ltr'}
                                >
                                    <Workflow className="mx-3" size={20} />
                                    {t('layout.services')}
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>

                    <Link href="/" className="lg:hidden">
                        <div className="me-5">
                            <img src="ayman.png" width={80} alt="Ayman Logo" />
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <div>
                <a
                    ref={ref}
                    className={cn(
                        'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none',
                        className,
                    )}
                    {...props}
                >
                    <div className="text-sm leading-none font-medium">{title}</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
                </a>
            </div>
        </li>
    );
});
ListItem.displayName = 'ListItem';
