import type React from 'react';
import { useState } from 'react';
import '../assets/css/CompactView.css'; // Adjust the path as necessary
// import { MovieCard } from '../components/MovieCard/MovieCard';
import type movies from '../model/movies';

const CompactView: React.FC = () => {
  const [movies, setMovies] = useState<movies[]>([]);

  const sortedMovies = [...movies].sort((a, b) => {
    return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
  });

  return (
    <div className="compact-view">
      <div className="view-header">
        <h1>Vue compacte des films</h1>
        <div className="sort-controls">
          <button className="sort-button active">
            Trier par date de sortie
          </button>
        </div>
      </div>

      <div className="compact-grid">
        {sortedMovies.map((movie) => (
          <div key={movie.movie_id} className="compact-card">
            <img src={movie.poster_url} alt={movie.title} />
            <div className="compact-info">
              <h3>{movie.title}</h3>
              <div className="compact-meta">
                <span className="year">{movie.release_date}</span>
              </div>
              <p className="duration">{movie.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompactView;
