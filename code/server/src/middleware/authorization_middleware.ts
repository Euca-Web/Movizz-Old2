import type { NextFunction, Request, Response } from "express";

class AuthMiddleware {
    //vérifier la validité du token et le role de l'utilisateur
    public check = (roles : string[]) => (req: Request, res: Response, next: NextFunction) => {
        // console.log(roles);
        //récupérer le contenu dans l'entête Autorization: Bearer token
        const token = req.headers.authorization?.split("Bearer")[1];
        console.log(token);
 
        //passer au middleware suivant
        next();
    };
}
export default AuthMiddleware;