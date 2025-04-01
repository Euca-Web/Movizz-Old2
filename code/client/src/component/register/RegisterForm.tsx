import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import SecurityAPI from "../../service/SecurityAPI";
import type users from "../../model/users";
import { useState } from "react";


const RegisterForm = () => {
const {
handleSubmit,
register,
formState: { errors },
} = useForm<users>();

// Redirection
    const navigate = useNavigate();

//Message du formulaire
const [message, setMessage] = useState<string>();



const OnSubmit = async (values: users) => {
console.log(values);

// Requete HTTP
const request = await new SecurityAPI().register(values)
console.log(request);

// Tester le code de statut HTTP
    if ([200, 201].indexOf(request.status) > -1) {

        // window.sessionStorage.setItem("notice", "Inscription réussie");
        // Redirection
        navigate("/login");
    } else {
        // Message
        setMessage("Erreur lors de l'inscription");
    }
}


// récuperer l'id de l'URL
const { id } = useParams();

return (
<form onSubmit={handleSubmit(OnSubmit)}>
        <h2>Register</h2>
        {
            message ? <p>{ message }</p> : null
        }
<div>
{/* NICKNAME */}
<label htmlFor="username">Nickname:</label>
{/* reprendre STRICTEMENT le nom des colonnes SQL */}
<input
type="text"
{...register("username", {
required: "Prénom requis",
minLength: {
value: 2,
message: "Prénom requis",
},
})}
/>
<small>{errors.username?.message}</small>
</div>

            <div>
{/* EMAIL */}
<label htmlFor="email">Email:</label>
{/* reprendre STRICTEMENT le nom des colonnes SQL */}
<input
type="email"
{...register("email", {
required: "Email requis",
minLength: {
value: 2,
message: "Email requis",
},
})}
/>
<small>{errors.email?.message}</small>
</div>

            <div>
{/* PASSWORD */}
<label htmlFor="password_hash">Mot de passe:</label>
{/* reprendre STRICTEMENT le nom des colonnes SQL */}
<input
type="password"
{...register("password_hash", {
required: "Mot de passe requis",
minLength: {
value: 2,
message: "Mot de passe requis",
},
})}
/>
<small>{errors.password_hash?.message}</small>
</div>

<div>
<input type="hidden"{...register('user_id') } value={id} />
<button type="submit">Submit</button>
</div>
</form>
);
};

export default RegisterForm;