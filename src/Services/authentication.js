import axios from "axios";
const BASE_URL = "http://192.168.0.153:3000"

const Auth = {
    signUp: async (doctor) => {
        
        let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json" 
        }
        const { confirmpassword, ...doctorbody} = doctor
        let bodyContent = JSON.stringify({ ...doctorbody});
        let reqOptions = {
        url: `${BASE_URL}/doctorauth/signup`,
        method: "POST",
        headers: headersList,
        data: bodyContent
        }

        let response = await axios.request(reqOptions);
        return response.data
    },
    
    signIn: async (user) => {
        let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json" 
        }
        
        let bodyContent = JSON.stringify(user);
        let reqOptions = {
            url: `${BASE_URL}/doctorauth/login`,
            method: "POST",
            headers: headersList,
            data: bodyContent,
        }
        
        let response = await axios.request(reqOptions)
        return response.data
    }
}

export default Auth