import { Link } from "react-router-dom";
import styles from "../../assets/css/nav.module.css";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../../provider/UserProvider"; // Ensure this import exists

const Nav = () => {
	// crée une référence : lien vers un élément HTML
	// remplace l'utilisation de querySelector / querySelectorAll
	const siteNav = useRef<HTMLElement | null>(null); // crée un état = useState
	// const [état, setter de l'état ] = useState<typer l'état>(valeur initiale de l'état)
	const [NavMobileIsVisible, setNavMobileIsVisible] = useState<boolean>(false);
	// clic sur le bouton de navigation mobile
	const click = () => {
		// modifier l'état à l'aide de setter
		setNavMobileIsVisible(!NavMobileIsVisible);
		// console.log(NavMobileIsVisible);
	};

	//récupérer l'utilisateur

	const { user } = useContext(UserContext); // récupère le contexte

	// Les balises a sont remplacées par le composant
	//  les attributs href sot remplacés par to
	return (
		<>
			{JSON.stringify(user)}
			{/* 
            attribut ref permet de relier un référence à une balise HTML 
            */}
			{/* 
            la seule condition disponible dans le HTML du react : condition ternaire
            condition ? vraie : faux
            si une autre condition est à utiliser, il est nécessaire de crée une fonction externe
            */}
			<nav
				className={`${styles["site-nav"]} ${NavMobileIsVisible ? styles["site-nav-visible"] : ""}`}
				ref={siteNav}
			>
				<Link to={"/"}> Home </Link>
				<Link to={"/contact"}> Contact </Link>

				{user.role_id === 2 ? (
				<Link to={'/admin'}>Administration</Link>
				) : null}
				
				{user.role_id ? (
					<Link to={"/logout"}> Déconnexion </Link>
				) : (
					<>
						<Link to={"/register"}> Inscription </Link>
						<Link to={"/login"}> Connexion </Link>
					</>)}

			
			</nav>
			{/* ajouter des évènements : 
                - utiliser l'évènement directement dans la balise 
                - dans le composant on crée une fonction lié à l'évènement
            */}
			<button
				className={styles["btn-nav-mobile"]}
				type="button"
				onClick={click}
			>
				-
			</button>
		</>
	);
};
export default Nav;
