class DirectorAPI{
    //Selectionner tous les enregistrements
    public SelectAll = async () => {
        const request = new Request(`${import.meta.env.VITE_API_URL}/director`);
        const response = await fetch(request);
        return response.json();
    };
    //Créer un enregistrement
    public insert = async (data:FormData) => {
        const request = new Request(`${import.meta.env.VITE_API_URL}/director`, {
            method: 'POST', 
            body: data
        });
        const response = await fetch(request);
        return response.json();
    };
    
}
export default DirectorAPI;