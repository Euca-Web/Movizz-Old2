import React from "react";

type GuardProps = {
    children: React.JSX.Element | React.JSX.Element[];
    //liste des rôles autorisés
    roles_id?: number[];
}
export default GuardProps