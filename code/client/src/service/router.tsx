import { createBrowserRouter } from "react-router-dom";
import HomePage from "../page/HomePage";
import BaseLayout from "../layout/BaseLayout";
import AdminHomePage from "../page/admin/AdminHomePage";
import AdminMoviePage from "../page/admin/AdminMoviePage";
import AdminMovieFormPage from "../page/admin/AdminMovieFormPage";
import AdminDelete from "../page/admin/AdminDelete";
import Guard from "../component/common/Guard";
import MoviesAZ from "../page/MoviesAZ";
import CompactView from "../page/CompactView";
import RecentMovies from "../page/RecentMovies";
import LegalNotice from "../page/Legal/LegalNotice";
import TermsOfUse from "../page/Legal/TermsOfUse";
import Contact from "../page/Contact/Contact";
import LoginForm from "../component/login/LoginForm";
import RegisterForm from "../component/register/RegisterForm";

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
				path: "films-az",
				element: <MoviesAZ/>
			},
			{
				path: "films-recents",
				element: <RecentMovies/>
			},
			{
				path: "films-compact",
				element: <CompactView/>
			},
			{
				path: "mentions-legales",
				element: <LegalNotice/>
			},
			{
				path: "conditions-utilisation",
				element: <TermsOfUse/>
			},
			{
				path: "contact",
				element: <Contact/>
			},
			{
				path: "login",
				element: <LoginForm />
			},
			{
				path: "register",
				element: <RegisterForm />
			}
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
