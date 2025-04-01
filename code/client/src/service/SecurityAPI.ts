import users from '../model/users';

class SecurityAPI { 

    public register = async (data: Partial<users>) => {
        const request = new Request
        (`${import.meta.env.VITE_API_URL}/register`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        const response = await fetch(request);
        return response.json();
    }
    public login = async (data: Partial<users>) => {
        const request = new Request
        (`${import.meta.env.VITE_API_URL}/login`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        const response = await fetch(request);
        return response.json();
    }
    
}
export default SecurityAPI;