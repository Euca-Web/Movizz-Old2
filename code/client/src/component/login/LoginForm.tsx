import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import users from "../../model/users";
import { useState } from "react";
import SecurityAPI from "../../service/SecurityAPI";
import Notice from "../common/Notice";


const LoginForm = () => {
const {
handleSubmit,
register,
formState: { errors },
} = useForm<users>();

// Redirection
const navigate = useNavigate();

// Message du formulaire
const [message, setMessage] = useState<string>();

const OnSubmit = async (values: users) => {
console.log(values);

// Requete HTTP
const request = await new SecurityAPI().login(values)
console.log(request);

// Tester le code de statut HTTP
if ([200, 201].indexOf(request.status) > -1) {
// Stocker un message en session
window.sessionStorage.setItem("notice", "Account created");
// Redirection
 navigate("/admin");
} else {
setMessage("Check your email please");
}
}


// récuperer l'id de l'URL
const { id } = useParams();

return (
<form onSubmit={handleSubmit(OnSubmit)}>
<p>Login</p>

<Notice />
{message ? <p>{message}</p> : null}

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

export default LoginForm;