import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import UserAPI from "../../service/UserAPI";	
import type users from "../../model/users";

// import type
const LoginForm = () => {
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
	} = useForm<users>();
	const navigate = useNavigate();

	const { user_id } = useParams();

	// const [loading, setloading] = useState<boolean>(true); // chargement de la page
	// const [error, seterror] = useState<string | null>(null); // erreur de chargement

	// useEffect(() => {	
	// 	// éxecuter en chaîne les promesses
	// 	Promise.allSettled([
	// 		new RoleAPI().SelectAll(),
	// 		user_id ? new UserAPI().SelectOne(user_id as unknown as number) : null,
	// 	]).then((responses) => {
	// 		//si la première promesse est tenue
	// 		if (responses[0].status === "fulfilled") {
	// 			setroles(responses[0].value.data);
	// 		}

	// 		if (responses[1].status === "fulfilled") {
	// 			reset({
	// 				...responses[1].value.data,
	// 				release_date: responses[1].value.data.release_date.split("T")[0],
	// 			});
	// 		}

	// 		if (user_id && responses[1]?.status === "fulfilled") {
	// 			reset({
	// 				...responses[1].value.data,
	// 				gender_ids: responses[1].value.data.gender_ids.split(","),
	// 			});
	// 		}
	// 	});
	// }, [reset, user_id]);

	// Fonction qui sera appelée lors de la soumission du formulaire

	/*deux types de formulaires:
      - sans fichier: 
          la propriété body de la requête HTTP peut être en JSON: JSON, stringify
          dans la requête HTTP, utiliser l'en-tête HTTP: Content-Type : application/json
    
      -avec fichier:
          La propriété body de la requête HTTP doit être en FormData
          La balise <form> doit posséder l'attribut enctyper="multipart/form-data"
  */
	const onsubmituser = async (values: users) => {
        console.log(values);
        
		//créer un FormData en reprenant STRICTEMENT le nom des champs
		const formData = new FormData();


		//console.log(values);
		//console.log(formData);

		//requête HTTP
		const request = user_id
		? await new UserAPI().update(formData)
		: await new UserAPI().insert(formData);	


		

		if ([201, 201].indexOf(request.status) > -1) {
			//redirection
			navigate("/admin/user");

			//récupérer les données de la réponse
			const { user_id } = useParams();
			console.log(user_id);
		}
	};
	return (
		<form
			// className={styles.form}
			onSubmit={handleSubmit(onsubmituser)}
			encType="multipart/form-data"
		>
			{/* <p>
				<label htmlFor="username">Username :</label>
				<input
					type="text"
					{...register("username", {
						required: " Ce champ est obligatoire !",
					})}
				/>
				{errors.user_id && <span>{errors.user_id.message}</span>}
			</p> */}
			<p>
				<label htmlFor="email">Email :</label>
				<input
					type="email"
					{...login("email", {
						required: " Ce champ est obligatoire ! ",
						minLength: {
							value: 2,
							message: " L'email doit faire à minima 2 caractères ! ",
						},
						maxLength: {
							value: 255,
							message: " L'email doit faire au max 255 caractères ! ",
						},
					})}
				/>
				{errors.email && <span>{errors.email.message}</span>}
			</p>
			<p>
				<label htmlFor="password_hash">Password :</label>
				<input type="password" {...login("password_hash", {
					required: " Ce champ est obligatoire !",
				})} />
				{errors.password_hash && <span>{errors.password_hash.message}</span>}
			</p>
			<p>
				<input type="hidden" {...login('user_id')} value= {user_id}/>
				<button type="submit"> Connexion </button>
			</p>
		</form>
	);
};

export default LoginForm;
