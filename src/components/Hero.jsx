import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import gsap from "gsap";

const Hero = ({ movies }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideRef = useRef(null);

    const nextSlide = () => {
        gsap.fromTo(
            slideRef.current,
            { opacity: 1 },
            {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    setCurrentIndex((prev) =>
                        prev === movies.length - 1 ? 0 : prev + 1
                    );
                },
            }
        );
    };

    const prevSlide = () => {
        gsap.fromTo(
            slideRef.current,
            { opacity: 1 },
            {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    setCurrentIndex((prev) =>
                        prev === 0 ? movies.length - 1 : prev - 1
                    );
                },
            }
        );
    };

    useEffect(() => {
        gsap.fromTo(slideRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
    }, [currentIndex]);

    useEffect(() => {
        const interval = setInterval(nextSlide, 7000);
        return () => clearInterval(interval);
    }, []);

    if (!movies || movies.length === 0) return null;

    const movie = movies[currentIndex];

    // Calculate star rating (same as MovieCard)
    const rating = movie.vote_average || 0;
    const starRating = rating / 2; // Convert 10-point rating to 5-star scale
    const fullStars = Math.floor(starRating);
    const hasHalfStar = starRating - fullStars > 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="relative w-full h-[75vh] overflow-hidden rounded-xl mt-[70px]">
            {/* Background Image */}
            <div ref={slideRef} className="absolute inset-0">
                <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/40 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="wrapper relative top-1/2 bottom-16 text-white z-10">
                <h2 className="text-4xl font-bold mb-2">{movie.title}</h2>
                <div className="flex items-center gap-6 text-sm opacity-90">
                    <span>{movie.release_date?.split("-")[0]}</span>

                    <div className="rating flex items-center gap-1 text-yellow-400">
                        {[...Array(fullStars)].map((_, i) => (
                            <FontAwesomeIcon key={`full-${i}`} icon={solidStar} />
                        ))}

                        {hasHalfStar && <FontAwesomeIcon icon={faStarHalfAlt} />}

                        {[...Array(emptyStars)].map((_, i) => (
                            <FontAwesomeIcon key={`empty-${i}`} icon={regularStar} />
                        ))}

                        <span className="ml-2 text-white text-sm">
                            ({starRating.toFixed(1)} / 5)
                        </span>
                    </div>
                </div>
                <p className="mt-3 text-sm opacity-80 line-clamp-3">{movie.overview}</p>
            </div>

            {/* Controls */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 z-20"
            >
                <FaChevronLeft />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 z-20"
            >
                <FaChevronRight />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {movies.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${
                            index === currentIndex
                                ? "bg-gradient-to-r from-[#D6C7FF] to-[#AB8BFF]"
                                : "bg-white/70"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hero;
