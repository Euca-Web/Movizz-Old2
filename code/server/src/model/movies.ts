import type gender from "./gender.js";

type movies = {
	movie_id: number;
	title: string;
	release_year: Date;
	duration: string;
	summary: string;
	poster: string;
	teaser: string;
	gender_ids: string;
	genders: gender[];
};

export default movies;
