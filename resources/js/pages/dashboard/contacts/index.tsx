import { DataTable } from '@/components/dashboard/data-table';
import { DateFormatter } from '@/components/date-formater';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, TrashIcon } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

interface Contacts {
    id: number;
    subject: string;
    email: string;
    created_at: Date;
}

interface Flash {
    success?: string;
    danger?: string;
}

export default function Index({ messages }: { messages: Contacts[] }) {
    const { flash } = usePage<{ flash: Flash }>().props;

    const { reset, delete: destroy } = useForm({
        id: null as number | null,
    });

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
    }, [flash.success]);

    const handleDelete = (id) => {
        destroy(route('contact-us.destroy', id), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Contacts',
            href: '/dashboard/contacts',
        },
    ];

    const columns: ColumnDef<Contacts>[] = [
        {
            accessorKey: 'subject',
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Subject
                        <ArrowUpDown />
                    </Button>
                );
            },
        },
        {
            accessorKey: 'email',
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Email
                        <ArrowUpDown />
                    </Button>
                );
            },
        },
        {
            accessorKey: 'created_at',
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Created At
                        <ArrowUpDown />
                    </Button>
                );
            },
            cell: ({ row }) => {
                return <DateFormatter isoString={String(row.original.created_at)} />;
            },
        },
        {
            accessorKey: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                const item = row.original;
                return (
                    <>
                        {/* delete item alert dialog */}
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <Button variant={'ghost'}>
                                    <TrashIcon />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you sure to delete the message "[ {item.subject} ]" from [{item.email}]?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the selected item! Continue?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(item.id)}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </>
                );
            },
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="p-4">
                <DataTable
                    data={messages}
                    columns={columns}
                    filterPlaceholder="Search by ..."
                    onDelete={(selectedIds) => {
                        const selectedItemIds = messages.filter((message) => selectedIds.includes(message.id)).map((message) => message.id);
                        selectedItemIds.forEach((item: number) => handleDelete(item));
                    }}
                />
            </div>
        </AppLayout>
    );
}
