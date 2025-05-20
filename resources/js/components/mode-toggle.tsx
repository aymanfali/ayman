import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Monitor, Moon, Sun } from 'lucide-react';
import { Appearance, useAppearance } from '../hooks/use-appearance'; // Import the hook

const ThemeModeToggle = () => {
    const { updateAppearance } = useAppearance();

    const getLabel = (mode: Appearance) => {
        switch (mode) {
            case 'light':
                return (
                    <>
                        <Sun className="mx-2 h-[1.2rem] w-[1.2rem]" />
                    </>
                );
            case 'dark':
                return (
                    <>
                        <Moon className="mx-2 h-[1.2rem] w-[1.2rem]" />
                    </>
                );
            case 'system':
                return (
                    <>
                        <Monitor className="mx-2 h-[1.2rem] w-[1.2rem]" />
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
            <DropdownMenuContent align="end" className='flex'>
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
