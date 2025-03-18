import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MovieAPI from "../../service/movie_api";

const AdminDelete = () => {
	// récupération des paramètres de l'url
	const { movie_id } = useParams();

	//navigation
	const navigate = useNavigate();

	useEffect(() => {
		const formData = new FormData();
		formData.append("movie_id", movie_id as string);

		new MovieAPI().delete(formData).then((response) => {
			navigate("/admin/movie");
		});
	}, [movie_id, navigate]);

	return (
		<div>
			<h1>Deleted !</h1>
		</div>
	);
};

export default AdminDelete;
