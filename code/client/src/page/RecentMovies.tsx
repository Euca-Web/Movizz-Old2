import type React from 'react';
import { useState } from 'react';
import '../assets/css/RecentMovies.css'; // Adjust the path as necessary
import type movies from '../model/movies';

const RecentMovies: React.FC = () => {
  const [movies, setMovies] = useState<movies[]>([]);

  return (
    <div className="recent-movies">
      <h1>Films sortis récemment</h1>
      
      <div className="movies-grid">
        {movies.map((movie) => (
          <div key={movie.movie_id} className="movie-card">
            <div className="movie-poster">
              <img src={movie.poster_url} alt={movie.title} />
              <div className="movie-release-date">
                Sorti le {new Date(movie.release_date).toLocaleDateString()}
              </div>
            </div>
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <div className="movie-meta">
                <span>{movie.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentMovies;
