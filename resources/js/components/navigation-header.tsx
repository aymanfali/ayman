'use client';

import { Link } from '@inertiajs/react';
import * as React from 'react';

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { ContactRoundIcon, HomeIcon, MenuIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';

const components: { title: string; href: string; description: string }[] = [
    {
        title: 'Alert Dialog',
        href: '/docs/primitives/alert-dialog',
        description: 'A modal dialog that interrupts the user with important content and expects a response.',
    },
    {
        title: 'Hover Card',
        href: '/docs/primitives/hover-card',
        description: 'For sighted users to preview content available behind a link.',
    },
    {
        title: 'Progress',
        href: '/docs/primitives/progress',
        description: 'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
    },
    {
        title: 'Scroll-area',
        href: '/docs/primitives/scroll-area',
        description: 'Visually or semantically separates content.',
    },
    {
        title: 'Tabs',
        href: '/docs/primitives/tabs',
        description: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
    },
    {
        title: 'Tooltip',
        href: '/docs/primitives/tooltip',
        description: 'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
    },
];

export function NavigationHeader() {
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
                    <NavigationMenuItem>
                        <Link href="/">
                            <div className={navigationMenuTriggerStyle()}>Home</div>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                <li className="row-span-3">
                                    <div>
                                        <a
                                            className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none select-none focus:shadow-md"
                                            href="/"
                                        >
                                            {/* <Icons.logo className="h-6 w-6" /> */}
                                            <div className="mt-4 mb-2 text-lg font-medium">shadcn/ui</div>
                                            <p className="text-muted-foreground text-sm leading-tight">
                                                Beautifully designed components built with Radix UI and Tailwind CSS.
                                            </p>
                                        </a>
                                    </div>
                                </li>
                                <ListItem href="/docs" title="Introduction">
                                    Re-usable components built using Radix UI and Tailwind CSS.
                                </ListItem>
                                <ListItem href="/docs/installation" title="Installation">
                                    How to install dependencies and structure your app.
                                </ListItem>
                                <ListItem href="/docs/primitives/typography" title="Typography">
                                    Styles for headings, paragraphs, lists...etc
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                {components.map((component) => (
                                    <ListItem key={component.title} title={component.title} href={component.href}>
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/contact-us">
                            <div className={navigationMenuTriggerStyle()}>Contact Us</div>
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
