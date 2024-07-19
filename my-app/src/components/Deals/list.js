import axios from "axios";

async function fetchDeals() {
    try {
        const api=import.meta.env.VITE_APP_URL;
        const response = await axios.get(`${api}/deals/getalldeal`);
        return response.data; // Ensure you return the data property
    } catch (error) {
        throw new Error(error.message); // Throw error to handle it in the component
    }
}

export default fetchDeals;
