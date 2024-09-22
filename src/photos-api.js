import axios from "axios";


const API_KEY = "1Y9g4XfeviHr6tCy3KyAXB3JecfEz1szp_gLr2OZ6bI"
axios.defaults.baseURL = "https://api.unsplash.com"
axios.defaults.headers.common["Authorization"] = `Client-ID ${API_KEY}`

export const fetchPhotosByKeyword = async (page, keyword) => {
    const response = await axios.get(`/search/photos?page=${page}&query=${keyword}`)
    return response.data.results;
} 