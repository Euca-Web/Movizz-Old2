class MovizzAPI {
	public SelectAll = async () => {
		console.log(`${import.meta.env.VITE_API_URL}/movie`);

		// récupération de tous les enregistrements
		const request = new Request(`${import.meta.env.VITE_API_URL}/movie`);

		// exécuter la requête
		const response = await fetch(request);

		//récupérer la réponse
		return response.json();
	};
}
export default MovizzAPI;
