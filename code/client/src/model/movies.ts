import type gender from "./gender.js";

type movies = {
	movie_id: number;
	title: string;
	description: string;
	release_date: Date;
	duration: string;
	poster_url: string;
	trailer_url: string;
	director: string;
	gender_ids: string;
	genders: gender[];
};

export default movies;
