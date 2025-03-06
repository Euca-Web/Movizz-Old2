import type gender from "./gender.js";

type movies_gender = {
	movie_id: number;
	gender_id: number;
	// Composition permet d'associer la propritété d'un objet à un autre objet
	// movies: movie,
	// gender: gender
	// table de jointure : liste des indentifiants
	gender_ids: string;
	gender: gender[];
};

export default movies_gender;
