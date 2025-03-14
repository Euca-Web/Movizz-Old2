class MovieAPI{
    //Selectionner tous les enregistrements
    public SelectAll = async () => {
        const request = new Request(`${import.meta.env.VITE_API_URL}/movie`);
        const response = await fetch(request);
        return response.json();
    };
}
export default MovieAPI;