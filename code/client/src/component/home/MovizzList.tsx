import { useEffect, useState } from "react";
import MovieAPI from "../../service/movie_api";
import type movie from "../../model/movies";

const MovizzList = () => {
	// état pour stocker les résultats de la requête HTTP
	const [movie, setMovie] = useState<movie[]>([]);

	// use effect permet de déclencher des instructions à un moment de vie d'un composant
	// - affiché
	// - mise à jour avec un état
	// désafficher

	useEffect(() => {
		// récuperer tous les enregistrements
		// then permet de récuperer les données d'une promesses lorsque la fonction n'est pas asynchrone
		new MovieAPI().SelectAll().then((results) => setMovie(results.data));
	}, []);

	return (
		<>
			{/* 
			map est la seule boucle disponible dans le HTML de react
			les accolades dans le HTML permettent de séparer la partie HTML de la partie JS
		*/}
			{movie.map((result) => (
				<article key={Math.random()}>
					<h2>{result.title}</h2>
					<p>Temps : {result.duration}</p>
					<p>Poster : {result.poster_url}</p>
				</article>
			))}
		</>
	);
};
export default MovizzList;
