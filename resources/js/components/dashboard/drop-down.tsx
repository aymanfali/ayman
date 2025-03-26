import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ReactNode } from 'react';

// Define types for menu items
interface MenuItemType {
    type?: 'label' | 'separator' | 'sub';
    label?: string;
    shortcut?: string;
    onClick?: () => void;
    disabled?: boolean;
    children?: MenuItemType[];
}

interface DropdownMenuComponentProps {
    triggerLabel: ReactNode;
    menuItems: MenuItemType[];
}

/**
 * Reusable Dropdown Menu Component
 */
export function DropdownMenuComponent({ triggerLabel, menuItems = [] }: DropdownMenuComponentProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{triggerLabel}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                {menuItems.map((item, index) => (
                    <MenuItem key={index} item={item} />
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

/**
 * MenuItem - Renders different menu structures (item, group, sub-menu)
 */
function MenuItem({ item }: { item: MenuItemType }) {
    if (item.type === 'label') {
        return <DropdownMenuLabel>{item.label}</DropdownMenuLabel>;
    }

    if (item.type === 'separator') {
        return <DropdownMenuSeparator />;
    }

    if (item.type === 'sub' && item.children) {
        return (
            <DropdownMenuSub>
                <DropdownMenuSubTrigger>{item.label}</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                        {item.children.map((subItem, index) => (
                            <MenuItem key={index} item={subItem} />
                        ))}
                    </DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSub>
        );
    }

    return (
        <DropdownMenuItem onClick={item.onClick} disabled={item.disabled}>
            {item.label}
            {item.shortcut && <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>}
        </DropdownMenuItem>
    );
}
