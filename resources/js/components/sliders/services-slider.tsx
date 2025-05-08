import { ArrowLeft, ArrowRight, Text } from 'lucide-react';
import { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import '../../../css/slider-pagination.css';
import { Button } from '../ui/button';

interface Service {
    id: number;
    name: string;
    image: string;
}

function ServicesSlider({ services }: { services: Service[] }) {
    let sliderRef = useRef(null);
    const next = () => {
        sliderRef.slickNext();
    };
    const previous = () => {
        sliderRef.slickPrev();
    };

    const settings = {
        dots: true,
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
        appendDots: (dots) => (
            <div>
                <Button variant={'link'} className="cursor-pointer" onClick={previous}>
                    <ArrowLeft />
                </Button>
                <ul className="w-fit"> {dots} </ul>
                <Button variant={'link'} className="cursor-pointer" onClick={next}>
                    <ArrowRight />
                </Button>
            </div>
        ),
    };
    return (
        <div className="slider-container">
            <Slider
                ref={(slider) => {
                    sliderRef = slider;
                }}
                {...settings}
            >
                {services.map((service) => (
                    <div key={service.id}>
                        <div className="group border-accent relative m-3 rounded-2xl border">
                            <img
                                src={`/storage/${service.image}`}
                                alt={service.name}
                                loading="lazy"
                                className="h-64 w-full rounded-xl object-cover shadow-md"
                                onError={(e) => (e.target.src = '/ayman.png')}
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 z-10 rounded-2xl bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                            <div
                                className="absolute top-1/2 left-1/2 z-20 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded px-4 py-2 opacity-0 shadow transition-all duration-300 ease-out group-focus-within:opacity-100 group-hover:opacity-100"
                                role="dialog"
                                aria-label="Project Information Overlay"
                            >
                                <div className="flex h-full w-full flex-col items-center justify-center">
                                    <p className="p-3 text-center text-base font-medium">{service.name}</p>
                                    <a href={`services/${service.id}`}>
                                        <Button className="mt-2 cursor-pointer" aria-label="View on GitHub">
                                            <Text size={20} />
                                            <p>Show more</p>
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default ServicesSlider;
