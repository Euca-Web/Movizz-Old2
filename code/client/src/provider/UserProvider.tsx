import { createContext } from "react";
import UserProviderContext from "../model/context/user_provider_context";
import UserProviderProps from "../model/props/user_provider_props";

//créer un contexte
const UserContext = createContext({} as UserProviderContext);

//provider: composant qui contient un context
//children  représente les composants enfant du provider
const UserProvider = ({ children }: UserProviderProps) => {
    return <UserContext.Provider value={{text: "Kakou Kakou"}}> {children}

    </UserContext.Provider>
}

export { UserContext, UserProvider };