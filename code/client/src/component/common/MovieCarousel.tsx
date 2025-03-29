import React, { useState } from 'react';
import './MovieCarousel.css';

interface Movie {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const MovieCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const movies: Movie[] = [
    {
      id: 1,
      title: "GODZILLA VS KONG",
      description: "Dans Godzilla vs. Kong, les deux Titans s'affrontent violemment alors que Kong est guidé vers la Terre creuse, son monde d'origine. Leur duel tourne à l'alliance lorsqu'ils doivent affronter Mechagodzilla, une menace créée par l'homme.",
      imageUrl: "/src/assets/movies/godzilla-vs-kong.jpg"
    }
    // Ajoutez d'autres films ici
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % movies.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + movies.length) % movies.length);
  };

  return (
    <section className="movie-carousel">
      <h2 className="carousel-title">Les Derniers films ajoutés sur Movizz</h2>
      
      <div className="carousel-container">
        <button className="carousel-button prev" onClick={prevSlide}>❮</button>
        
        <div className="carousel-slide">
          <img 
            src={movies[currentSlide].imageUrl} 
            alt={movies[currentSlide].title}
            className="carousel-image"
          />
          <div className="carousel-content">
            <h3>{movies[currentSlide].title}</h3>
            <p>{movies[currentSlide].description}</p>
            <button className="watch-button">Regarder</button>
          </div>
        </div>

        <button className="carousel-button next" onClick={nextSlide}>❯</button>
      </div>
    </section>
  );
};

export default MovieCarousel;
