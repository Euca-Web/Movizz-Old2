import type React from 'react';
import { formatDate, formatDuration } from '../../utils/dateFormatter';
import '../../assets/css/MovieCard.css';

interface MovieCardProps {
    movie_id: number;
    title: string;
    poster_url: string;
    rating?: number;
    type: 'movie';
}

const MovieCard: React.FC<MovieCardProps> = ({
    id,
    title,
    posterUrl,
    rating,
    type
}) => {
    return (
        <div className="movie-card">
            <div className="movie-type">{type}</div>
            {rating && <div className="movie-rating">{rating.toFixed(1)}</div>}
            <img 
                src={posterUrl} 
                alt={`Affiche du film ${title}`} 
                className="movie-poster"
                loading="lazy"
            />
            
            <div className="movie-overlay">
                <h3 className="movie-title">{title}</h3>
                
                <div className="movie-info">
                    <span>{formatDate}</span>
                    <span>•</span>
                    <span>{formattedDuration}</span>
                </div>
                
                <p className="movie-description">{description}</p>
                
                <div className="movie-actions">
                    <button 
                        className="movie-button primary"
                        onClick={() => onWatch?.(id)}
                    >
                        Regarder
                    </button>
                    
                    <button 
                        className="movie-button secondary"
                        onClick={() => onAddToFavorites?.(id)}
                    >
                        + Favoris
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
