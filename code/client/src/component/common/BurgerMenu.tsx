import type React from "react";
import "../..assets/css/BurgerMenu.css";

interface BurgerMenuProps {
	isOpen: boolean;
	toggleMenu: () => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ isOpen, toggleMenu }) => {
	const iconPath = isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16";
	return (
		<button
			className="burger-menu"
			onClick={toggleMenu}
			type="button"
			aria-label={isOpen ? "Close menu" : "Open menu"}
		>
			{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
<svg
				viewBox="0 0 24 24"
				width="24"
				height="24"
				stroke="white"
				strokeWidth="2"
				fill="none"
			>
				<path d={iconPath} />
			</svg>
		</button>
	);
};

export default BurgerMenu;
