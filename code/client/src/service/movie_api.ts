class MovieAPI{
    //Selectionner tous les enregistrements
    public SelectAll = async () => {
        const request = new Request
        (`${import.meta.env.VITE_API_URL}/movie`

        );
        const response = await fetch(request);
        return response.json();
    };
    //Selectionner un enregistrement
    public SelectOne = async (id: number) => {
        const request = new Request(
            `${import.meta.env.VITE_API_URL}/movie/${id}`
        );
        const response = await fetch(request);
        return response.json();
    };

    //Créer un enregistrement
    public insert = async (data:FormData) => {
        const request = new Request
        (`${import.meta.env.VITE_API_URL}/movie`, {
            method: 'POST', 
            body: data
        });
        const response = await fetch(request);
        return response.json();
    };
    
    //Mettre à jour un enregistrement
}
export default MovieAPI;