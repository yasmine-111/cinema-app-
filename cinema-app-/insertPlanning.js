const axios = require("axios");

const insertPlanningData = async () => {
  try {
    const response = await axios.post("http://localhost:5000/api/planning", {
      filmId: "64bda7a0f39b8a001c7a1d4b", // Replace with a valid ObjectId from your database
      date: "2024-12-01",
      time: "18:00",
    });
    console.log("Planning entry created:", response.data);
  } catch (error) {
    console.error("Error inserting planning data:", error.response?.data || error.message);
  }
};

insertPlanningData();
