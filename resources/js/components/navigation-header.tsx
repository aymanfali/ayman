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

export function NavigationHeader() {
    const url = usePage().url;
    const { projects, services } = usePage().props;

    return (
        <>
            <NavigationMenu className="max-lg:hidden">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href="/">
                            <div className="me-5">
                                <img src="ayman.png" width={80} alt="Ayman Logo" />
                            </div>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem className={url === '/' ? 'bg-accent rounded-md' : ''}>
                        <Link href="/">
                            <NavigationMenuLink>Home</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-transparent">Projects</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                {isProjectArray(projects) &&
                                    projects.map((project) => (
                                        <Link href={`/projects/${project.id}`}>
                                            <ListItem key={project.id}>
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
                                    <ListItem className="text-center">Show All</ListItem>
                                </Link>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-transparent">Services</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                {isServiceArray(services) &&
                                    services.map((service) => (
                                        <Link href={`/services/${service.id}`}>
                                            <ListItem key={service.id}>
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
                                    <ListItem className="text-center">Show All</ListItem>
                                </Link>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem className={url === '/contact-us' ? 'bg-accent rounded-md' : ''}>
                        <Link href="/contact-us">
                            <NavigationMenuLink>Contact Us</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                    <Button variant="outline">
                        <MenuIcon />
                    </Button>
                </SheetTrigger>
                <SheetContent side={'left'}>
                    <SheetHeader>
                        <SheetTitle>Portfolio</SheetTitle>
                        <SheetDescription>This is Ayman</SheetDescription>
                    </SheetHeader>
                    <Link
                        href="/"
                        className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground mx-3 flex rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
                    >
                        <HomeIcon className="mx-3" size={20} />
                        Home
                    </Link>
                    <Link
                        href="/"
                        className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground mx-3 flex rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
                    >
                        <ContactRoundIcon className="mx-3" size={20} />
                        Contact Us
                    </Link>
                </SheetContent>
            </Sheet>

            <Link href="/" className="lg:hidden">
                <div className="me-5">
                    <img src="ayman.png" width={80} alt="Ayman Logo" />
                </div>
            </Link>
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
