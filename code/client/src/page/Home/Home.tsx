import type React from "react";
import Hero from "../../component/common/Hero";
import PopularMovies from "../../component/common/PopularMovies";
import "../../assets/Home.css";

const Home: React.FC = () => {
	return (
		<>
			<Hero />
			<div className="content-container">
				<PopularMovies />
			</div>
		</>
	);
};

export default Home;
