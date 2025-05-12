import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import GuestLayout from '@/layouts/guest-layout';
import { Code } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Projects {
    id: number;
    name: string;
    description: string;
    image: string;
    github_link: string;
}

export default function Projects({ projects }: { projects: Projects[] }) {
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
                <section id="projects">
                    <div className="container-width">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-3xl font-bold">My Projects</h2>
                            <div className="mx-auto h-1 w-16"></div>
                            <p className="mx-auto mt-4 max-w-2xl">
                                Here are some of the projects I've worked on. Each project showcases different skills and technologies that I've
                                mastered over the years.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {projects.map((project) => (
                                <Card key={project.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={`/storage/${project.image}`}
                                            alt={project.name}
                                            loading="lazy"
                                            onError={(e) => (e.target.src = '/ayman.png')}
                                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                    </div>
                                    <CardHeader>
                                        <CardTitle>{project.name}</CardTitle>
                                        <CardDescription dangerouslySetInnerHTML={{ __html: project.description }} />
                                    </CardHeader>
                                    <CardContent>
                                        {/* TODO//: tags */}
                                        {/* <div className="flex flex-wrap gap-2">
                                            {project.tech.map((tech, idx) => (
                                                <span key={idx} className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-600">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div> */}
                                    </CardContent>
                                    <CardFooter className="flex gap-4">
                                        {/* <Button variant="outline" size="sm" className="flex items-center gap-1" asChild>
                                            <a href={project.liveLink}>
                                                <Link className="h-4 w-4" />
                                                <span>Live Demo</span>
                                            </a>
                                        </Button> */}
                                        <Button variant="outline" size="sm" className="flex items-center gap-1" asChild>
                                            <a href={project.github_link}>
                                                <Code className="h-4 w-4" />
                                                <span>Source Code</span>
                                            </a>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </GuestLayout>
    );
}
