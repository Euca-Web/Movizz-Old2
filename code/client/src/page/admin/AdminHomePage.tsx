import { Link } from "react-router-dom";

const AdminHomePage = () => {
	return (
		<>
			<h1>AdminHomePage</h1>
			<Link to={"/admin/movie"}>Manage Movies</Link>
		</>
	);
};

export default AdminHomePage;
