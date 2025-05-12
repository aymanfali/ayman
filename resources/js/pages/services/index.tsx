import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import GuestLayout from '@/layouts/guest-layout';
import { Check, Code } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Services {
    id: number;
    name: string;
    description: string;
    image: string;
}

const ServiceCard = ({
    title,
    description,
    icon: Icon,
    cta = 'Learn more',
}: {
    title: string;
    description: string;
    icon: React.ElementType;
    cta?: string;
}) => {
    return (
        <Card className="flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg p-2">
                    <Icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                <CardDescription className="">{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <ul className="space-y-2 text-sm">
                    {title === 'Web Development' && (
                        <>
                            <li className="flex gap-2">
                                <div className="me-3 h-1.5 w-1.5 rounded-full">
                                    <Check size={20} />
                                </div>
                                <span>Responsive websites</span>
                            </li>
                            <li className="flex gap-2">
                                <div className="me-3 h-1.5 w-1.5 rounded-full">
                                    <Check size={20} />
                                </div>
                                <span>Frontend & backend solutions</span>
                            </li>
                            <li className="flex gap-2">
                                <div className="me-3 h-1.5 w-1.5 rounded-full">
                                    <Check size={20} />
                                </div>
                                <span>E-commerce development</span>
                            </li>
                        </>
                    )}
                </ul>
            </CardContent>
            <CardFooter>
                <Button variant="outline" className="mt-2">
                    {cta}
                </Button>
            </CardFooter>
        </Card>
    );
};

const Services = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <GuestLayout>
            <div className={isScrolled ? `mt-32` : ''}>
                <section id="services" className="section-padding bg-gradient-to-b">
                    <div className="container-width">
                        <div className="mb-12 text-center">
                            <p className="mb-2 font-medium">What I Offer</p>
                            <h2 className="mb-4 text-3xl font-bold md:text-4xl">My Services</h2>
                            <p className="mx-auto max-w-2xl">
                                I provide comprehensive solutions tailored to meet your digital needs, from development to design and strategic
                                consulting.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            <ServiceCard title="Web Development" description="Custom web solutions built with the latest technologies." icon={Code} />
                        </div>
                    </div>
                </section>
            </div>
        </GuestLayout>
    );
};

export default Services;
