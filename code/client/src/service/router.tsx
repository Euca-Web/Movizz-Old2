import { createBrowserRouter } from "react-router-dom";
import HomePage from "../page/HomePage";
import ContactPage from "../page/ContactPage";
import BaseLayout from "../layout/BaseLayout";
import AdminHomePage from "../page/admin/AdminHomePage";
import AdminMoviePage from "../page/admin/AdminMoviePage";
import AdminMovieFormPage from "../page/admin/AdminMovieFormPage";
import AdminDelete from "../page/admin/AdminDelete";
import RegisterPage from "../page/register/RegisterPage";
import LoginPage from "../page/Login/LoginPage";
import LogoutPage from "../page/LogoutPage";
import Guard from "../component/common/Guard";

const router = createBrowserRouter([
	{
		// préfixe de toutes le URL enfants
		path: "/",
		// Utilisation d'une mise en page
		element:<Guard roles_id={[1]}>
					<BaseLayout />
				</Guard>,
		// Référencer les pages utilisant la mise en page
		children: [
			{
				path: "",
				element: <HomePage />,
			},
			{
				path: "contact",
				element: <ContactPage />,
			},
			{
				path: "register",
				element: <RegisterPage />,
			},
			{
				path: "login",
				element: <LoginPage/>,
			},
			{
				path: "logout",
				element: <LogoutPage />,
			},
		],
	},
	{
		// préfixe de toutes le URL enfants
		path: "/admin/",
		// Utilisation d'une mise en page
		element: <BaseLayout />,
		// Référencer les pages utilisant la mise en page
		children: [
			{
				path: "",
				element: <AdminHomePage/>,
			},
			{
				path: "movie",
				element: <AdminMoviePage/>,
			},
			{
				path: "movie/form/:movie_id?",
				element: <AdminMovieFormPage/>,
			},
			{
				path : "movie/delete/:movie_id",
				element : <AdminDelete/>
			}
		],
	},
]);

export default router;
