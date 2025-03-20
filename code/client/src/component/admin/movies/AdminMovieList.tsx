import { useEffect, useState } from "react";
import MovieAPI from "../../../service/movie_api";
import type movies from "../../../model/movies";
import { Link } from "react-router-dom";

const AdminMovieList = () => {
	//etat pour stocker les films
	const [movies, setMovies] = useState<movies[]>([]);
	//appel de l'api pour recuperer les films
	useEffect(() => {
		new MovieAPI().SelectAll().then((response) => setMovies(response.data));
	}, []);
	return (
		<>

			<p>
				<Link to={"/admin/movie/form"}>Ajouter un film</Link>
			</p>

			<table>
				<tr>
					<th>Titre</th>
					<th>Genres</th>
					<th>Durée</th>
					<th>Année</th>
					<th>Poster</th>
					{/* <th>Réalisateur</th> */}
					<th />
				</tr>
				{movies.map((movie) => {
					return (
						<tr key={Math.random()}>
							<td>{movie.title}</td>
							<td>
								<ul>
									{movie.genders.map((gender) => {
										return <li key={gender.gender_id}>{gender.gender_name}</li>;
									})}
								</ul>
							</td>
							<td>{movie.duration}</td>
							<td>
								{
									new Date(movie.release_date)
										.toLocaleDateString()
										.split(" ")[0]
								}
							</td>
							<td>
								<img src={`$import.meta.env.VITE_API_URL}/img/${movie.poster_url}`} alt="" />
							</td>
							{/* <td>
								{movie.director}
							</td> */}
							<td>
								<Link className= "btn" to={`/admin/movie/form/${movie.movie_id}`}> Editer </Link>
								<Link className= "btn" to={`/admin/movie/delete/${movie.movie_id}`}> Supprimer </Link>
							</td>
						</tr>
					);
				})}
			</table>
		</>
	);
};

export default AdminMovieList;
