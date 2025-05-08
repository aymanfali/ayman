import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import '../../../css/slider-pagination.css';
import { Button } from '../ui/button';

interface HeroSlides {
    id: number;
    title: string;
    image: string;
}

function HeroSlider({ heroSlides }: { heroSlides: HeroSlides[] }) {
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
        slidesToShow: 1,
        slidesToScroll: 1,
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
                {heroSlides.map((slide) => (
                    <div key={slide.id}>
                        <img
                            src={`/storage/${slide.image}`}
                            alt={slide.title}
                            loading="lazy"
                            className="h-92 w-full rounded-xl object-cover shadow-md"
                            onError={(e) => (e.target.src = '/ayman.png')}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default HeroSlider;
