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
import { Link } from '@inertiajs/react';
import { LogIn, LogOut, Settings, User } from 'lucide-react';

export default function Header({ auth }) {
    const cleanup = useMobileNavigation();

    return (
        <nav className="flex items-center justify-between">
            <NavigationHeader />
            <div className="flex gap-4">
                <ThemeToggleButton />
                {auth.user ? (
                    <>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem className="flex">
                                        <User className="mr-2" />
                                        Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex">
                                        <Settings className="mr-2" />
                                        Settings
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link className="flex" method="post" href={route('logout')} as="button" onClick={cleanup}>
                                        <LogOut className="mr-2" />
                                        Log out
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Link
                            href={route('dashboard')}
                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Dashboard
                        </Link>
                    </>
                ) : (
                    <>
                        <Link href={route('login')} className="hover:bg-accent border-accent rounded-md border p-2 text-sm leading-normal max-lg:hidden">
                            <p className='flex'>
                                    <LogIn className='me-2' size={20} />
                                    Login
                            </p>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
