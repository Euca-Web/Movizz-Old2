import type React from 'react';
import '../../assets/css/Legal.css'; // Assurez-vous d'importer le fichier CSS approprié

const TermsOfUse: React.FC = () => {
  return (
    <div className="legal-page">
      <h1>Conditions d'utilisation</h1>

      <section className="legal-section">
        <h2>1. Acceptation des conditions</h2>
        <p>
          En accédant et en utilisant Movizz, vous acceptez d'être lié par les présentes conditions d'utilisation.
          Si vous n'acceptez pas ces conditions, nous vous prions de ne pas utiliser notre service.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. Description du service</h2>
        <p>
          Movizz est une plateforme de streaming de films et séries qui permet aux utilisateurs de :
        </p>
        <ul>
          <li>Découvrir et regarder des films et séries en streaming</li>
          <li>Créer des listes de favoris personnalisées</li>
          <li>Recevoir des recommandations personnalisées</li>
          <li>Participer à la communauté via les commentaires et notes</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>3. Compte utilisateur</h2>
        <h3>3.1 Création de compte</h3>
        <p>
          Pour profiter pleinement de nos services, vous devez créer un compte utilisateur. Vous vous engagez à :
        </p>
        <ul>
          <li>Fournir des informations exactes et à jour</li>
          <li>Protéger vos identifiants de connexion</li>
          <li>Ne pas partager votre compte avec des tiers</li>
        </ul>

        <h3>3.2 Responsabilité</h3>
        <p>
          Vous êtes responsable de toutes les activités effectuées depuis votre compte.
          Signalez immédiatement toute utilisation non autorisée.
        </p>
      </section>

      <section className="legal-section">
        <h2>4. Contenu et droits d'auteur</h2>
        <p>
          Tout le contenu disponible sur Movizz est protégé par les droits d'auteur. Vous vous engagez à :
        </p>
        <ul>
          <li>Ne pas télécharger ou redistribuer le contenu</li>
          <li>Ne pas contourner les protections techniques</li>
          <li>Respecter les droits de propriété intellectuelle</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>5. Règles d'utilisation</h2>
        <p>En utilisant Movizz, vous acceptez de ne pas :</p>
        <ul>
          <li>Utiliser le service à des fins commerciales</li>
          <li>Partager des contenus illégaux ou inappropriés</li>
          <li>Perturber le fonctionnement du service</li>
          <li>Collecter des données sur les autres utilisateurs</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>6. Modifications du service</h2>
        <p>
          Nous nous réservons le droit de modifier ou d'interrompre temporairement ou définitivement
          tout ou partie du service, avec ou sans préavis. Vous acceptez que nous ne soyons pas
          responsables envers vous ou tout tiers pour toute modification ou interruption du service.
        </p>
      </section>

      <section className="legal-section">
        <h2>7. Contact</h2>
        <p>
          Pour toute question concernant ces conditions d'utilisation, contactez-nous à :
          <a href="mailto:contact@movizz.com"> contact@movizz.com</a>
        </p>
      </section>
    </div>
  );
};

export default TermsOfUse;
