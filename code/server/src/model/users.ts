type users = {
    user_id: number;
    username: string;
    email: string; 
    password_hash: string;
    role_id: number;
    //partie aléatoire de la clé
    key: string;
}

export default users;