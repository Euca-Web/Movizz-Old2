import type React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/Footer.css";
import logo from "../../assets/svg/logo.svg";

const Footer: React.FC = () => {
	return (
		<footer className="footer">
			<div className="footer-content">
				<p className="welcome-text">
					Bienvenue sur Movizz, votre bibliothèque en ligne dédiée aux films
					récents et classiques. Explorez une vaste collection d'œuvres
					cinématographiques, soigneusement classées et accessibles
					gratuitement.
				</p>

				<div className="footer-links">
					<Link to="/conditions-utilisation">Conditions d'utilisation</Link>
					<Link to="/mentions-legales">Mentions Légales</Link>
					<Link to="/contact">Nous contacter</Link>
				</div>

				<div className="footer-logo">
					<img
						src={logo}
						alt="Movizz"
						className="footer-logo-image"
					/>
					<p className="copyright">© 2025 Movizz. Tous droits réservés.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
