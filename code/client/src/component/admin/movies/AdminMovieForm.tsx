import { useForm } from "react-hook-form"
import type movies from "../../../model/movies";
import MovieAPI from "../../../service/movie_api";
import { useEffect, useState } from "react";
import type gender from "../../../model/gender";
import GenderAPI from "../../../service/GenderAPI";
import "../../../assets/css/style.css";

const AdminMovieForm = () => {
/*
    handleSubmit: Fonction qui permet de gérer la soumission du formulaire
    register: Fonction qui permet de lier un input à un champ du formulaire
    formState: Objet qui contient des informations sur le formulaire
    errors: Objet qui contient les erreurs du formulaire
*/
  const { handleSubmit, register, formState: { errors } } = useForm<movies>();
  const [genders, setgenders] = useState<gender[]>(); // tableau de genres

  // const [loading, setloading] = useState<boolean>(true); // chargement de la page
  // const [error, seterror] = useState<string | null>(null); // erreur de chargement
  
  useEffect(() => { 
    // éxecuter en chaîne les promesses
    Promise.allSettled([
      new GenderAPI().SelectAll()
    ]).then((responses) => {
        //si la première promesse est tenue 
        if (responses[0].status === 'fulfilled') {
          setgenders(responses[0].value.data);
          console.log(responses[0].value.data);
          
        }
      });
   }, []);

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
    formData.append('gender_id', values.gender_ids);
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('release_date', values.release_date.toString());
    //formData.append('release_date', values.release_date as unknown as string);
    formData.append('duration', values.duration);
    formData.append('poster_url', values.poster_url);
    //formData.append('poster_url', values.poster_url[0]);
    formData.append('trailer_url', values.trailer_url);
    formData.append('director', values.director);

    //console.log(values);
    //console.log(formData);

    //requête HTTP
    const request = await new MovieAPI().insert(formData);
    console.log(request);
    }
  return (
    <form
      // className={styles.form}
      onSubmit={handleSubmit(onsubmitmovie)}
      encType="multipart/form-data">
         <p>
          <label htmlFor="gender_ids">Genre :</label>
          <select id="gender_ids" {...register('gender_ids', { required: " Ce champ est obligatoire !" })}> 
            <option value=""> -- Choisir un genre -- </option> 
            {genders?.map((gender:gender) => {
              return <option key={Math.random()} value={gender.gender_id}>{gender.name}</option>
            })}
          </select>
          {/* <input type="text" {...register('gender_ids', { required: " Ce champ est obligatoire !" })} /> */}
          {errors.gender_id && <span>{errors.gender_id.message}</span>}
        </p>
        <p>
          <label htmlFor="title">Titre :</label>
          <input type="text" {...register('title', { required: " Ce champ est obligatoire ! ", 
            minLength: {value: 2, message: " Le genre doit faire à minima 2 caractères ! "} })} />
          {errors.title && <span>{errors.title.message}</span>}
        </p>
        <p>
          <label htmlFor="description">Description :</label>
          <input type="text" {...register('description')} />
          {errors.description && <span>{errors.description.message}</span>}
        </p>
        <p>
          <label htmlFor="release_date">Date de sortie :</label>
          <input type="date" {...register('release_date', { required: " Ce champ est obligatoire ! " })} />
          {errors.release_date && <span>{errors.release_date.message}</span>}
        </p>
        <p>
          <label htmlFor="duration">Durée :</label>
          <input type="text" {...register('duration', { required: " Ce champ est obligatoire ! " })} />
          {errors.duration && <span>{errors.duration.message}</span>}
        </p>
        <p>
          <label htmlFor="poster_url">URL de l'affiche :</label>
          <input type="file" {...register('poster_url', { required: " Ce champ est obligatoire ! " })} />
          {errors.poster_url && <span>{errors.poster_url.message}</span>}
        </p>    
        <p>
          <label htmlFor="trailer_url">URL de la bande annonce :</label>
          <input type="text" {...register('trailer_url')} />
          {errors.trailer_url && <span>{errors.trailer_url.message}</span>}
        </p>
        <p>
          <label htmlFor="director">Réalisateur :</label>
          <input type="text" {...register('director')} />
          {errors.director && <span>{errors.director.message}</span>}
      </p>
        <p>
            <button type="submit"> Ajouter </button>
        </p>
    </form>
  )
}

export default AdminMovieForm