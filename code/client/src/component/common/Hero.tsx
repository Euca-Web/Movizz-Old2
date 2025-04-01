import type React from 'react';
import { useState, useEffect } from 'react';
import '../../assets/css/Hero.css';

const Hero: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className="hero">
      <div className="hero-backdrop">
        <img 
          src="https://image.tmdb.org/t/p/original/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg" 
          alt="Dune: Part Two" 
          className="hero-backdrop-image"
        />
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content">
        <button className="hero-title-button">
          <h1 className="hero-title">Black Panther : Wakanda Forever</h1>
        </button>
        {!isMobile && (
          <p className="hero-description">
            La Reine Ramonda, Shuri, M'Baku, Okoye et les Dora Milaje luttent pour protéger 
            leur nation des ingérences d'autres puissances mondiales après la mort du Roi T'Challa. 
            Alors que le peuple s'efforce d'aller de l'avant, nos héros vont devoir s'unir et 
            compter sur l'aide de la mercenaire Nakia et d'Everett Ross pour faire entrer le 
            royaume du Wakanda dans une nouvelle ère.
          </p>
        )}

      </div>
    </div>
  );
};

export default Hero;
