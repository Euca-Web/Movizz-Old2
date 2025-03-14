import { useForm } from "react-hook-form"
import movies from "../../../model/movies";

const AdminMovieForm = () => {
/*
    handleSubmit: Fonction qui permet de gérer la soumission du formulaire
    register: Fonction qui permet de lier un input à un champ du formulaire
    formState: Objet qui contient des informations sur le formulaire
    errors: Objet qui contient les erreurs du formulaire
*/
    const { handleSubmit, register, formState : {errors} } = useForm<movies>();

    // Fonction qui sera appelée lors de la soumission du formulaire
    const onsubmitmovie = (values: movies) => {
        console.log(values);
    }

  return (
    <form onSubmit={handleSubmit(onsubmitmovie)}>
         <p>
          <label htmlFor="gender_id">Genre :</label>
          <input type="text" {...register('genders', { required: " Ce champ est obligatoire !", 
            minLength: {value: 2, message: " Le genre doit faire à minima 2 caractères ! "}
          })} />
          {errors.genders && <span>{errors.genders.message}</span>}

        </p>
        <p>
          <label htmlFor="title">Titre :</label>
          <input type="text" {...register('title', { required: " Ce champ est obligatoire ! " })} />
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
          <input type="text" {...register('poster_url', { required: " Ce champ est obligatoire ! " })} />
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