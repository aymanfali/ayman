import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import clsx from 'clsx';

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    label: string;
    options: Option[];
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ label, options, placeholder, onChange, value, className}) => {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className={clsx('w-[100px]', className)}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
