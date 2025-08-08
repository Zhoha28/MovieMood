import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const MovieCard = ({
                       movie: { title, vote_average, poster_path, original_language, release_date },
                   }) => {
    const rating = vote_average || 0;
    const starRating = rating / 2; // Convert 10-point rating to 5-star scale

    const fullStars = Math.floor(starRating);
    const hasHalfStar = starRating - fullStars > 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="movie-card">
            {poster_path ? (
                <img
                    src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                    alt={title}
                />
            ) : (
                // Placeholder div when no poster
                <div
                    className='text-gradient'
                    style={{
                        height: '350px', // same approximate height as the img
                        backgroundColor: 'black',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: '#ff3c78',
                        fontWeight: '700',
                        fontSize: '1.5rem',
                        userSelect: 'none',
                        borderRadius: '0.5rem'
                    }}
                    aria-label="No poster available"
                >
                    MovieMood
                </div>
            )}

            <div className="mt-5">
                <h3>{title}</h3>

                <div className="content">
                    <div className="rating flex items-center flex-wrap gap-1 text-yellow-400">
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

                    <div className="inner-content block text-white text-sm mt-2">
                        <span className="lang uppercase">{original_language}</span>
                        <span> &nbsp; | &nbsp; </span>
                        <span className="year">{release_date ? release_date.split('-')[0] : 'N/A'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
