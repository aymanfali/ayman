import ThemeToggleButton from '@/components/mode-toggle';
import { NavigationHeader } from '@/components/navigation-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { Link, router, usePage } from '@inertiajs/react';
import { LogIn, LogOut, Settings, User } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';
import { useEffect, useState } from 'react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

type HeaderProps = {
    auth: {
        user: {
            name: string;
            email: string;
        };
    };
};
  

export default function Header({ auth }: HeaderProps) {
    const cleanup = useMobileNavigation();
    const { locale } = usePage().props as unknown as { locale: string };
    const [selectedLang, setSelectedLang] = useState(locale);
    const { setLocale } = useLaravelReactI18n();
    const { t } = useLaravelReactI18n();
    

    const localeChange = (value: string) => {
        if (value !== selectedLang) {            
            setLocale(value);
            router.get(
                `/${value}`,
                {},
                {
                    preserveScroll: true,
                    preserveState: true,
                },
            );
        }
    };    

    useEffect(() => {
        setSelectedLang(locale);
    }, [locale]);

    return (
        <nav className="flex items-center justify-between" dir={locale == 'ar' ? 'rtl' : 'ltr'} aria-label={t('layout.main')}>
            <NavigationHeader />

            <div className="flex gap-4">
                <Select value={selectedLang} onValueChange={localeChange}>
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder={t('layout.languageSelector')} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>{t('layout.languages')}</SelectLabel>
                            {[
                                { value: 'en', label: 'English', flag: '/assets/usa-flag.png' },
                                { value: 'ar', label: 'العربية', flag: '/assets/ksa-flag.png' },
                            ].map((lang) => (
                                <SelectItem key={lang.value} value={lang.value}>
                                    <div className="flex items-center gap-2">
                                        <img src={lang.flag} width={20} alt={`${lang.label} Flag`} className="rounded-full" />
                                        {lang.label}
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <ThemeToggleButton />

                {auth.user ? (
                    <>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>
                                        {auth.user?.name
                                            ?.split(' ')
                                            .map((n) => n[0])
                                            .join('')}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>{t('layout.myAccount')}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem className="flex">
                                        <User className="ml-2" />
                                        {t('layout.profile')}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex">
                                        <Settings className="ml-2" />
                                        {t('layout.settings')}
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link className="flex" method="post" href={route('logout')} as="button" onClick={cleanup}>
                                        <LogOut className="ml-2" />
                                        {t('layout.logout')}
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Link
                            href={route('dashboard')}
                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            {t('layout.dashboard')}
                        </Link>
                    </>
                ) : (
                    <Link href={route('login')} className="hover:bg-accent border-accent rounded-md border p-2 text-sm leading-normal max-lg:hidden">
                        <p className="flex">
                            <LogIn className="me-2" size={20} />
                            {t('layout.login')}
                        </p>
                    </Link>
                )}
            </div>
        </nav>
    );
}
