import type React from 'react';
import '../../assets/css/Legal.css'; // Assurez-vous d'importer le fichier CSS approprié

const LegalNotice: React.FC = () => {
  return (
    <div className="legal-page">
      <h1>Mentions légales</h1>
      
      <section className="legal-section">
        <h2>1. Informations légales</h2>
        <p>
          Le site Movizz est édité par [Votre Nom], dont le siège social est situé à [Adresse].
          Email : contact@movizz.com
        </p>
      </section>

      <section className="legal-section">
        <h2>2. Hébergement</h2>
        <p>
          Le site est hébergé par [Nom de l'hébergeur], [Adresse de l'hébergeur].
        </p>
      </section>

      <section className="legal-section">
        <h2>3. Propriété intellectuelle</h2>
        <p>
          L'ensemble du contenu de ce site (textes, images, vidéos, etc.) est protégé par le droit d'auteur.
          Toute reproduction ou représentation totale ou partielle de ce site est strictement interdite
          sans autorisation expresse.
        </p>
      </section>

      <section className="legal-section">
        <h2>4. Protection des données personnelles</h2>
        <p>
          Conformément à la loi Informatique et Libertés et au RGPD, vous disposez d'un droit d'accès,
          de rectification et de suppression des données vous concernant. Pour exercer ce droit,
          contactez-nous via notre formulaire de contact.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Cookies</h2>
        <p>
          Ce site utilise des cookies pour améliorer l'expérience utilisateur. En continuant à naviguer
          sur ce site, vous acceptez leur utilisation.
        </p>
      </section>
    </div>
  );
};

export default LegalNotice;
