class GenderAPI{
    //Selectionner tous les enregistrements
    public SelectAll = async () => {
        const request = new Request(`${import.meta.env.VITE_API_URL}/gender`);
        const response = await fetch(request);
        return response.json();
    };
    //Créer un enregistrement
    public insert = async (data:FormData) => {
        const request = new Request(`${import.meta.env.VITE_API_URL}/gender`, { // Correction de l'URL
            method: 'POST', 
            body: data
        });
        const response = await fetch(request);
        return response.json();
    };
}
export default GenderAPI;