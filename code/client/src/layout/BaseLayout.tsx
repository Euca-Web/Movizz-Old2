import { Outlet } from "react-router-dom";
import Footer from "../component/common/Footer";
import Header from "../component/common/Header";

//  Les mises en pages permettent de définir les composants communs à plusieurs mises en page
const BaseLayout = () => {
	return (
		<>
			<Header />
			{/*Outlet permet de définir l'emplacement du contenu particulier d'une page */}
			<Outlet />
			<Footer />
		</>
	);
};
export default BaseLayout;
