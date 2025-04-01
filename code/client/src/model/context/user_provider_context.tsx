import { Dispatch, SetStateAction } from "react";
import users from "../users";

//typer les données contenues dans le context 
type UserProviderContext = {
    user : users;
    setUser : Dispatch<SetStateAction<users>>;
};
export default UserProviderContext