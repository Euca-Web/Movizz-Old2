import { useForm } from "react-hook-form";
import type movies from "../../../model/movies";
import MovieAPI from "../../../service/movie_api";
import { useEffect, useState } from "react";
import type gender from "../../../model/gender";
import GenderAPI from "../../../service/GenderAPI";
import "../../../assets/css/style.css";
import { useNavigate, useParams } from "react-router-dom";

const AdminMovieForm = () => {
	/*
    handleSubmit: Fonction qui permet de gérer la soumission du formulaire
    register: Fonction qui permet de lier un input à un champ du formulaire
    formState: Objet qui contient des informations sur le formulaire
    errors: Objet qui contient les erreurs du formulaire
    reset: Fonction qui permet de réinitialiser le formulaire mais sur les cases à cocher il faut utiliser un array
*/
	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
	} = useForm<movies>();
	const navigate = useNavigate();
	const [genders, setgenders] = useState<gender[]>(); // tableau de genres

	const { movie_id } = useParams();

	// const [loading, setloading] = useState<boolean>(true); // chargement de la page
	// const [error, seterror] = useState<string | null>(null); // erreur de chargement

	useEffect(() => {
		// éxecuter en chaîne les promesses
		Promise.allSettled([
			new GenderAPI().SelectAll(),
			movie_id ? new MovieAPI().SelectOne(movie_id as unknown as number) : null,
		]).then((responses) => {
			//si la première promesse est tenue
			if (responses[0].status === "fulfilled") {
				setgenders(responses[0].value.data);
			}

			if (responses[1].status === "fulfilled") {
				reset({
					...responses[1].value.data,
					release_date: responses[1].value.data.release_date.split("T")[0],
				});
			}

			if (movie_id && responses[1]?.status === "fulfilled") {
				reset({
					...responses[1].value.data,
					gender_ids: responses[1].value.data.gender_ids.split(","),
				});
			}
		});
	}, [reset, movie_id]);

	// Fonction qui sera appelée lors de la soumission du formulaire

	/*deux types de formulaires:
      - sans fichier: 
          la propriété body de la requête HTTP peut être en JSON: JSON, stringify
          dans la requête HTTP, utiliser l'en-tête HTTP: Content-Type : application/json
    
      -avec fichier:
          La propriété body de la requête HTTP doit être en FormData
          La balise <form> doit posséder l'attribut enctyper="multipart/form-data"
  */
	const onsubmitmovie = async (values: movies) => {
		//créer un FormData en reprenant STRICTEMENT le nom des champs
		const formData = new FormData();
		formData.append("movie_id", values.movie_id.toString());
		formData.append("gender_ids", values.gender_ids);
		formData.append("title", values.title);
		formData.append("summary", values.summary);
		formData.append("release_date", values.release_date.toString());
		//formData.append('release_date', values.release_date as unknown as string);
		formData.append("duration", values.duration);
		formData.append("poster_url", values.poster_url[0]);
		//formData.append('poster_url', values.poster_url[0]);
		formData.append("trailer_url", values.trailer_url);
		formData.append("director", values.director);

		//console.log(values);
		//console.log(formData);

		//requête HTTP
		const request = movie_id
		? await new MovieAPI().update(formData)
		: await new MovieAPI().insert(formData);	


		

		if ([201, 201].indexOf(request.status) > -1) {
			//redirection
			navigate("/admin/movie");

			//récupérer les données de la réponse
			const { movie_id } = useParams();
			console.log(movie_id);
		}
	};
	return (
		<form
			// className={styles.form}
			onSubmit={handleSubmit(onsubmitmovie)}
			encType="multipart/form-data"
		>
			<p>
				<label htmlFor="gender_ids">Genre :</label>
				{/* <select id="gender_ids" {...register('gender_ids', { required: " Ce champ est obligatoire !" })}> 
            <option value=""> -- Choisir un genre -- </option> 
            {genders?.map((gender:gender) => {
              return <option key={Math.random()} value={gender.gender_id}>{gender.gender_name}</option>
            })}
          </select> */}
				<input
					type="checkbox"
					{...register("gender_ids", {
						required: " Ce champ est obligatoire !",
					})}
					/>
					<label> </label>
				
				{errors.gender_ids && <span>{errors.gender_ids.message}</span>}
			</p>
			<p>
				<label htmlFor="title">Titre :</label>
				<input
					type="text"
					{...register("title", {
						required: " Ce champ est obligatoire ! ",
						minLength: {
							value: 2,
							message: " Le genre doit faire à minima 2 caractères ! ",
						},
					})}
				/>
				{errors.title && <span>{errors.title.message}</span>}
			</p>
			<p>
				<label htmlFor="summary">Summary :</label>
				<input type="text" {...register("summary")} />
				{errors.summary && <span>{errors.summary.message}</span>}
			</p>
			<p>
				<label htmlFor="release_date">Date de sortie :</label>
				<input
					type="date"
					{...register("release_date", {
						required: " Ce champ est obligatoire ! ",
					})}
				/>
				{errors.release_date && <span>{errors.release_date.message}</span>}
			</p>
			<p>
				<label htmlFor="duration">Durée :</label>
				<input
					type="text"
					{...register("duration", {
						required: " Ce champ est obligatoire ! ",
					})}
				/>
				{errors.duration && <span>{errors.duration.message}</span>}
			</p>
			<p>
				<label htmlFor="poster_url">URL de l'affiche :</label>
				<input
					type="file"
					id="poster_url"
					{...register("poster_url", movie_id? {} : {
						required: " Ce champ est obligatoire ! ",
					})}	
				/>
				{errors.poster_url && <span>{errors.poster_url.message}</span>}
			</p>
			<p>
				<label htmlFor="trailer_url">URL de la bande annonce :</label>
				<input type="text" {...register("trailer_url")} />
				{errors.trailer_url && <span>{errors.trailer_url.message}</span>}
			</p>
			<p>
				<label htmlFor="director">Réalisateur :</label>
				<input type="text" {...register("director")} />
				{errors.director && <span>{errors.director.message}</span>}
			</p>
			<p>
				<input type="hidden" {...register('movie_id')} value= {movie_id}/>
				<button type="submit"> Ajouter </button>
			</p>
		</form>
	);
};

export default AdminMovieForm;
