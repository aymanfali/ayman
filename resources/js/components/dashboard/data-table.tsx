'use client';

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '../ui/checkbox';
import { CustomSelect } from './select';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '../ui/pagination';

interface Option {
    value: string;
    label: string;
}

interface DataTableProps<TData> {
    data: TData[];
    columns: ColumnDef<TData>[];
    filterPlaceholder?: string;
    onDelete: (selectedIds: number[]) => void; // Callback for deletion
}

export function DataTable<TData>({ data, columns, onDelete }: DataTableProps<TData>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [selectedFilter, setSelectedFilter] = React.useState<string>('name');
    const [filterValue, setFilterValue] = React.useState<string>('');

    const rowsPerPage: Option[] = [
        { value: '10', label: '10' },
        { value: '25', label: '25' },
        { value: '50', label: '50' },
        { value: '100', label: '100' },
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    });

    // Handle filter change and set filter value accordingly
    const handleFilterChange = (value: string) => {
        setFilterValue(value);
        table.getColumn(selectedFilter)?.setFilterValue(value);
    };

    // Handle column selection from the dropdown
    const handleDropdownChange = (column: string) => {
        setSelectedFilter(column);
        table.getColumn(column)?.setFilterValue(filterValue); // Apply filter to the selected column
    };

    // Count selected rows
    const selectedItemsCount = table.getSelectedRowModel().rows.length;
    const selectedRowIds = table.getSelectedRowModel().rows.map((row) => row.id);
    const selectedItems = table.getSelectedRowModel().rows;

    const handleDelete = () => {
        if (selectedRowIds.length === 0) {
            alert('No rows selected!');
            return;
        }

        const selectedIds = selectedItems.map((row) => row.original.id);

        // Call the onDelete function passed in as prop to delete the selected rows
        onDelete(selectedIds);
        table.resetRowSelection();
    };
    return (
        <div className="w-full">
            {/* Filter by Name or Status */}
            <div className="flex items-center justify-between gap-2 py-4">
                <div className="flex">
                    {/* Filter input field */}
                    <Input
                        placeholder={`Filter by ${selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)}`}
                        value={filterValue}
                        onChange={(e) => handleFilterChange(e.target.value)}
                        className="max-w-sm rounded-r-[0px]"
                    />
                    {/* Dropdown to choose between Name or Status */}
                    <CustomSelect
                        className="w-[150px] rounded-l-[0px]"
                        label="Filter by"
                        options={[
                            { value: 'name', label: 'Name' },
                            { value: 'status', label: 'Status' },
                        ]}
                        value={selectedFilter}
                        onChange={handleDropdownChange}
                        placeholder={'Filter by'}
                    />
                </div>

                <div className="flex items-center gap-1">
                    {selectedItemsCount > 0 ? (
                        <>
                            <span>{selectedItemsCount} item(s) selected</span>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" disabled={selectedItems.length === 0}>
                                        Delete Selected
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete the selected {selectedItems.length} item(s).
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleDelete}>Confirm</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </>
                    ) : (
                        ''
                    )}
                    {/* Columns Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {/* Add checkbox for selecting all rows */}
                                <TableHead>
                                    <Checkbox
                                        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                                        aria-label="Select all"
                                    />
                                </TableHead>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {/* Add checkbox to select individual row */}
                                    <TableCell>
                                        <Checkbox
                                            checked={row.getIsSelected()}
                                            onCheckedChange={(value) => row.toggleSelected(!!value)}
                                            aria-label="Select row"
                                        />
                                        {/* <input
                                            type="checkbox"
                                            checked={selectedRowIds.has(row.id)}
                                            onChange={(e) => handleRowSelection(row.id, e.target.checked)}
                                        /> */}
                                    </TableCell>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Custom Pagination Controls */}
            <div className="flex items-center justify-between py-4">
                {/* Rows per page selector */}
                <div>
                    <CustomSelect
                        label="Show Items"
                        options={rowsPerPage}
                        placeholder="Rows per page"
                        value={String(table.getState().pagination.pageSize)}
                        onChange={(value) => table.setPageSize(Number(value))}
                    />
                </div>

                <Pagination>
                    <PaginationContent>
                        <PaginationItem>{table.getCanPreviousPage() && <PaginationPrevious onClick={() => table.previousPage()} />}</PaginationItem>
                        {Array.from({ length: table.getPageCount() }, (_, index) => {
                            const currentPage = table.getState().pagination.pageIndex;
                            const totalPages = table.getPageCount();

                            // Show first, last, current, and neighbors; use ellipsis for gaps
                            if (
                                index === 0 || // First page
                                index === totalPages - 1 || // Last page
                                (index >= currentPage - 1 && index <= currentPage + 1) // Current +/- 1
                            ) {
                                return (
                                    <PaginationItem>
                                        <PaginationLink
                                            key={index}
                                            onClick={() => table.setPageIndex(index)}
                                            className={table.getState().pagination.pageIndex === index ? `border-accent border` : ''}
                                        >
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                );
                            }

                            // Left Ellipsis
                            if (index === currentPage - 2 && currentPage > 2) {
                                return <PaginationEllipsis key="left-ellipsis" />;
                            }

                            // Right Ellipsis
                            if (index === currentPage + 2 && currentPage < totalPages - 3) {
                                return <PaginationEllipsis key="right-ellipsis" />;
                            }
                            return null;
                        })}
                        <PaginationItem>{table.getCanNextPage() && <PaginationNext onClick={() => table.nextPage()} />}</PaginationItem>
                    </PaginationContent>
                </Pagination>

                {/* Pagination Info */}
                <div className="text-sm whitespace-nowrap">
                    (Showing {table.getRowModel().rows.length} of {table.getRowCount()} results)
                </div>
            </div>
        </div>
    );
}
