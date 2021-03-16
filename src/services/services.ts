import Contact from '../model/Contact';
import Alert from '../model/Alert';
import RegisterResponse from '../model/RegisterResponse';

export default class Services {

    static BASE_URL = "http://localhost:5000";

    static parseJSON = <T>() => (response: Response): Promise<T> => {
        if(response.status >= 200 && response.status <= 299){
            return response.json().then(data => data as T);
        } else {
            throw new Error("Error "+response.status+": " + response.text());
        }
    };

    static async getContacts(): Promise<Contact[]>{
        const response = await fetch(Services.BASE_URL + "/contacts");
        return await response.json();
    }

    static async getAlerts(): Promise<Alert[]>{
        const response = await fetch(Services.BASE_URL + "/alerts");
        return await response.json();
    }

    static async verifyAccount(username: string, password: string): Promise<string>{
        let options = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password
            })
        };
        const response = await fetch(Services.BASE_URL + "/login", options);
        return await response.text();
    }

    static async addAccount(username: string, password: string): Promise<RegisterResponse>{
        let options = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password
            })
        };

        const response = await fetch(Services.BASE_URL + "/account", options);
        return await response.json();
    }

}