import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Monitor, Moon, Sun } from 'lucide-react';
import { Appearance, useAppearance } from '../hooks/use-appearance'; // Import the hook

const ThemeModeToggle = () => {
    const { appearance, updateAppearance } = useAppearance();

    const getLabel = (mode: Appearance) => {
        switch (mode) {
            case 'light':
                return (
                    <>
                        <Sun className="mr-2 h-[1.2rem] w-[1.2rem]" /> Light Mode
                    </>
                );
            case 'dark':
                return (
                    <>
                        <Moon className="mr-2 h-[1.2rem] w-[1.2rem]" /> Dark Mode
                    </>
                );
            case 'system':
                return (
                    <>
                        <Monitor className="mr-2 h-[1.2rem] w-[1.2rem]" /> System Mode
                    </>
                );
            default:
                return 'Toggle Theme';
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {(['light', 'dark', 'system'] as Appearance[]).map((mode) => (
                    <DropdownMenuItem key={mode} onClick={() => updateAppearance(mode)}>
                        {getLabel(mode)}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ThemeModeToggle;
