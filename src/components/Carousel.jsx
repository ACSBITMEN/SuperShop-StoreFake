// src/components/Carousel.jsx
import { useState, useEffect, useCallback } from "react";
import ImgBanner1 from "../assets/banner-1.jpg";
import ImgBanner2 from "../assets/banner-2.jpg";
import ImgBanner3 from "../assets/banner-4.jpg";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";

// Banners en uso del carousel
const images = [
    ImgBanner2,
    ImgBanner1,
    ImgBanner3,
];

export default function Carousel() {
    const [current, setCurrent] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [transitioning, setTransitioning] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const nextSlide = useCallback(() => {
        if (transitioning) return;
        
        setTransitioning(true);
        setCurrent((prev) => (prev + 1) % images.length);
        // Reset
        setTimeout(() => setTransitioning(false), 500);
    }, [transitioning]);

    const prevSlide = () => {
        if (transitioning) return;
        
        setTransitioning(true);
        setCurrent((prev) => (prev - 1 + images.length) % images.length);
        // Reset
        setTimeout(() => setTransitioning(false), 500);
    };

    const goToSlide = (index) => {
        if (transitioning || index === current) return;
        
        setTransitioning(true);
        setCurrent(index);
        // Reset
        setTimeout(() => setTransitioning(false), 500);
    };

    // Efecto para el desplazamiento automático de los banners
    useEffect(() => {
        let interval;
        if (isAutoPlaying) {
            interval = setInterval(() => {
                nextSlide();
            }, 4000); // Cambian cada X segundos
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isAutoPlaying, nextSlide]);

    return (
        <div 
            className="relative w-full h-[35rem] overflow-hidden rounded-sm mb-8"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative w-full h-full">
                {images.map((img, index) => (
                    <div 
                        key={index} 
                        className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out ${
                            index === current 
                                ? "translate-x-0 z-10" 
                                : index < current 
                                    ? "-translate-x-full" 
                                    : "translate-x-full"
                        }`}
                    >
                        <img
                            src={img}
                            alt={`Slide ${index}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Degradado */}
            <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#F3F4F6] to-transparent z-20"></div>

            {/* Botones de navegación left y right */}
            <button
                onClick={prevSlide}
                className={`absolute text-xl left-0 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white text-black px-5 py-4 rounded-r-full transition-all duration-300 z-30 ${
                    isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                disabled={transitioning}
            >
                <ArrowLeft className="w-6 h-6" /> 
            </button>
            <button
                onClick={nextSlide}
                className={`absolute text-xl right-0 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white text-black px-5 py-4 rounded-l-full transition-all duration-300 z-30 ${
                    isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                disabled={transitioning}
            >
                <ArrowRight className="w-6 h-6" /> 
            </button>

            {/* Botón de play/pause */}
            <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`absolute top-4 left-4 bg-white/50 hover:bg-white text-black p-2 rounded-full transition-all duration-300 z-30 ${
                    isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            >
                {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>

            {/* Indicadores de posicion del carousel - Siempre visibles */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                {images?.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        disabled={transitioning}
                        className={`w-3 h-3 rounded-full transition-all ${
                            current === index 
                                ? "bg-white scale-125" 
                                : "bg-gray-400 hover:bg-gray-300"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}