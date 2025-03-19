class UserAPI{
    private route = 'users';
    //Selectionner tous les enregistrements
    public SelectAll = async () => {


        const request = new Request
        (`${import.meta.env.VITE_API_URL}/${this.route}`

        );
        const response = await fetch(request);
        return response.json();
    };
    //Selectionner un enregistrement
    public SelectOne = async (id: number) => {
        const request = new Request(
            `${import.meta.env.VITE_API_URL}/${this.route}/${id}`
        );
        const response = await fetch(request);
        return response.json();
    };

    //Créer un enregistrement
    public insert = async (data:FormData) => {
        const request = new Request
        (`${import.meta.env.VITE_API_URL}/${this.route}`, {
            method: 'POST', 
            body: data
        });
        const response = await fetch(request);
        return response.json();
    };
    
    //Mettre à jour un enregistrement
    public update = async (data:FormData) => {
        const request = new Request
        (`${import.meta.env.VITE_API_URL}/${this.route}`, {
            method: 'PUT', 
            body: data
        });
        const response = await fetch(request);
        return response.json();
    };

    //Supprimer un enregistrement
    public delete = async (data: FormData) => {
        const request = new Request
        (`${import.meta.env.VITE_API_URL}/${this.route}`, {
            method: 'DELETE',
            body: data
        });
        const response = await fetch(request);
        return response.json();
    }
}
export default UserAPI;