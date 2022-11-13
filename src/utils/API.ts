import axios from "axios";

export const API = axios.create({
    baseURL: "https://techtest.folkatech.com/api/",
});