import axios from "axios";

const fetchData = async () => {
    try {
        const api=import.meta.env.VITE_APP_URL;
        const response = await axios.get(`${api}/review/reviews`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return []; // Return an empty array in case of error
    }
};

export default fetchData;
