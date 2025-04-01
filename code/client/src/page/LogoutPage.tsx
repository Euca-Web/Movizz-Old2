import { useContext, useEffect } from "react"
import { UserContext } from "../provider/UserProvider"
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => { 
        //supprimer l'utilisateur du contexte
        setUser({} as any);
        //redirection
        navigate("/");
        // window.location.href = "/";
    }, [])
  return <></>
}

export default LogoutPage