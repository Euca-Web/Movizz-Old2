import { createContext, useState } from "react";
import type UserProviderContext from "../model/context/user_provider_context";
import type UserProviderProps from "../model/props/user_provider_props";
import type users from "../model/users";

//créer un contexte
const UserContext = createContext({} as UserProviderContext);

//provider: composant qui contient un context
//children  représente les composants enfant du provider
const UserProvider = ({ children }: UserProviderProps) => {
    const [user , setUser] = useState<users>({} as users);
    return <UserContext.Provider value={{ user, setUser }}>
        {children}
    </UserContext.Provider>
}

export { UserContext, UserProvider };