import axios from "axios";

const API_URL = "http://localhost:5000/api/planning";

export const getPlanning = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // Return the planning data
    } catch (err) {
        console.error("Error fetching planning:", err);
    }
};
