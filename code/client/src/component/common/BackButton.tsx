import type React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/BackButton.css';

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button 
      className="back-button" 
      type='button'
      onClick={() => navigate(-1)}
      aria-label="Retour à la page précédente"
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M19 12H5M12 19L5 12L12 5" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
      <span>Retour</span>
    </button>
  );
};

export default BackButton;
