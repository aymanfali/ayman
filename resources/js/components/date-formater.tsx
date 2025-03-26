import { format } from 'date-fns';

export const DateFormatter = ({ isoString }: { isoString: string }) => {
    const formattedDate = format(new Date(isoString), 'yyyy-MM-dd hh:mm:ss a');

    return <p>{formattedDate}</p>;
};

export const NativeDateFormatter = ({ isoString }: { isoString: string }) => {
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC',
    }).format(new Date(isoString));

    return <p>{formattedDate}</p>;
};
