import { useContext, useEffect } from "react";
import type GuardProps from "../../model/props/guard_props"
import { UserContext } from "../../provider/UserProvider";
import { useNavigate } from "react-router-dom";

const Guard = ({ children, roles_id }: GuardProps) => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        // Tester si l'utilisateur est connecté
        // Si le rôle de l'utilisateur n'est pas dans la liste des rôles autorisés
        if (roles_id?.indexOf(user.role_id) === -1) {
            window.sessionStorage.setItem("notice", "Nique ta mère de là !"); 
            //redirection
            navigate("/");
        }
    }, [roles_id, user, navigate])
    return <>
        {children}
    </>
}

export default Guard