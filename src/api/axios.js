import axios from "axios";

const API = axios.create({
    baseURL: "https://projecthub-backend-ius4.onrender.com/api"
});

export default API;