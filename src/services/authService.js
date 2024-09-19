import axios from "axios"

export const login = async (credentials) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
    return response.data; // {token, user}
};

export const register = async (data) => {
    const response = await axios.post('http://localhost:5000/api/auth/register', data);
    return response.data; // {token, user}
};