import { DataTable } from '@/components/dashboard/data-table';
import { DateFormatter } from '@/components/date-formater';
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
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, PenIcon, PlusCircle, TrashIcon } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

interface HeroSlider {
    id: number;
    title: string;
    description: string;
    image: string;
    status: string;
    created_at: Date;
}

interface Flash {
    success?: string;
    danger?: string;
}

export default function Index({ slides }: { slides: HeroSlider[] }) {
    const { flash } = usePage<{ flash: Flash }>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Hero Slider',
            href: '/dashboard/hero-slider',
        },
    ];

    const { reset, delete: destroy } = useForm({
        id: null as number | null,
        name: '',
        image: null as File | null,
    });

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
    }, [flash.success]);

    const handleDelete = (id) => {
        destroy(route('heroslides.destroy', id), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const columns: ColumnDef<HeroSlider>[] = [
        {
            accessorKey: 'title',
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Slide Title
                        <ArrowUpDown />
                    </Button>
                );
            },
        },
        {
            accessorKey: 'image',
            header: 'Image',
            cell: ({ row }) => (
                <img
                    src={`/storage/${row.original.image}`}
                    alt={row.original.title}
                    className="border-accent h-10 w-10 rounded border p-1"
                    onError={(e) => (e.target.src = '/ayman.png')}
                />
            ),
        },
        {
            accessorKey: 'status',
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Status
                        <ArrowUpDown />
                    </Button>
                );
            },
            cell: ({ row }) => {
                const status = row.getValue('status');
                // Define status colors for light & dark themes
                const statusClasses = {
                    valid: 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200',
                    invalid: 'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200',
                    pending: 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
                    default: 'bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
                };

                return <span className={`rounded px-2 py-1 font-medium ${statusClasses[status] || statusClasses.default}`}>{status}</span>;
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
            // cell: ({ row }) => <DropdownMenuComponent triggerLabel={<EllipsisVertical />} menuItems={menuItems} />,
            cell: ({ row }) => {
                const item = row.original;
                return (
                    <>
                        <Link href={`hero-slider/${item.id}/edit`}>
                            <Button variant={'ghost'}>
                                <PenIcon />
                            </Button>
                        </Link>

                        {/* delete item alert dialog */}
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <Button variant={'ghost'}>
                                    <TrashIcon />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure to delete [ {item.title} ] ?</AlertDialogTitle>
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
                <Link href={`hero-slider/create`}>
                    <Button>
                        <PlusCircle />
                        New Slide
                    </Button>
                </Link>

                <DataTable
                    data={slides}
                    columns={columns}
                    filterPlaceholder="Search by ..."
                    onDelete={(selectedIds) => {
                        const selectedItemIds = slides.filter((slide) => selectedIds.includes(slide.id)).map((slide) => slide.id);
                        selectedItemIds.forEach((item: number) => handleDelete(item));
                    }}
                />
            </div>
        </AppLayout>
    );
}
