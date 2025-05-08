import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Link } from 'lucide-react';

const Projects = () => {
    const projects = [
        {
            title: 'E-commerce Website',
            description: 'A full-featured online store with product catalog, shopping cart, and secure checkout.',
            tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80',
            liveLink: '#',
            codeLink: '#',
        },
        {
            title: 'Portfolio Website',
            description: 'A responsive portfolio website showcasing projects and skills with a modern design.',
            tech: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
            image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80',
            liveLink: '#',
            codeLink: '#',
        },
        {
            title: 'Task Management App',
            description: 'A productivity application to manage tasks, set priorities, and track progress.',
            tech: ['React', 'Redux', 'Firebase', 'Material UI'],
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80',
            liveLink: '#',
            codeLink: '#',
        },
    ];

    return (
        <section id="projects" className="section-padding">
            <div className="container-width">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-900">My Projects</h2>
                    <div className="mx-auto h-1 w-16 bg-purple-600"></div>
                    <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                        Here are some of the projects I've worked on. Each project showcases different skills and technologies that I've mastered over
                        the years.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, index) => (
                        <Card key={index} className="overflow-hidden transition-shadow hover:shadow-lg">
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                            <CardHeader>
                                <CardTitle>{project.title}</CardTitle>
                                <CardDescription>{project.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((tech, idx) => (
                                        <span key={idx} className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-600">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="flex gap-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-1 border-purple-600 text-purple-600 hover:bg-purple-50"
                                    asChild
                                >
                                    <a href={project.liveLink}>
                                        <Link className="h-4 w-4" />
                                        <span>Live Demo</span>
                                    </a>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                                    asChild
                                >
                                    <a href={project.codeLink}>
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
    );
};

export default Projects;
