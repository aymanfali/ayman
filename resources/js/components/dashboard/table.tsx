import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Define Types
interface TableHeader {
    label: string;
    key: string;
    className?: string;
}

interface ItemTableProps {
    caption?: string;
    headers: TableHeader[];
    data: Record<string, string | number>[];
}

// Reusable Table Component
const ItemsTable: React.FC<ItemTableProps> = ({ caption, headers, data }) => {
    return (
        <Table>
            {caption && <TableCaption>{caption}</TableCaption>}

            <TableHeader>
                <TableRow>
                    {headers.map((header, index) => (
                        <TableHead key={index} className={header.className || ''}>
                            {header.label}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {headers.map((header, colIndex) => (
                            <TableCell key={colIndex} className={header.className || ''}>
                                {row[header.key]}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default ItemsTable;
