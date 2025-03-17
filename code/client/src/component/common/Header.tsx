import Nav from "./Nav";
// import d'un css d'un composant
import styles from "../../assets/css/header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		// en react, l'attribut class est remplacé par className
		<header className={styles["site-header"]}>
			<div className={styles["site-logo"]}>
				{/* utiliser / pour cibler le dossier public */}
				<Link to={"/"}>
					<img src="" alt="" />
				</Link>
			</div>
			<Nav />
		</header>
	);
};
export default Header;
