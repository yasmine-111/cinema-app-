const mongoose = require("mongoose");
const Movie = require("./models/Movie"); // Adjust the path if needed
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const movies = [
    {
        title: "Inception",
        siterating: 9.0,
        worldrating: 8.8,
        nr: 1,
        availability: true,
        poster: "https://m.media-amazon.com/images/I/5106xtJh3ML._AC_SY679_.jpg",
        description: "A thief who steals corporate secrets using dream-sharing technology.",
        categories: ["Sci-Fi", "Thriller"],
        actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
        producer: "Christopher Nolan",
    },
    {
        title: "The Dark Knight",
        siterating: 9.2,
        worldrating: 9.0,
        nr: 2,
        availability: false,
        poster: "https://m.media-amazon.com/images/I/51jNORv6nQL._AC_SY679_.jpg",
        description: "Batman faces the Joker, a criminal mastermind wreaking havoc in Gotham.",
        categories: ["Action", "Crime", "Drama"],
        actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
        producer: "Christopher Nolan",
    },
    {
        title: "Interstellar",
        siterating: 8.6,
        worldrating: 8.6,
        nr: 3,
        availability: true,
        poster: "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SY679_.jpg",
        description: "A team of explorers travel through a wormhole to save humanity.",
        categories: ["Sci-Fi", "Adventure", "Drama"],
        actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
        producer: "Christopher Nolan",
    },
    {
        title: "The Prestige",
        siterating: 8.9,
        worldrating: 8.5,
        nr: 4,
        availability: false,
        poster: "https://m.media-amazon.com/images/I/51u4Ed-Pg5L._AC_SY679_.jpg",
        description: "Two rival magicians compete to create the ultimate illusion.",
        categories: ["Drama", "Mystery", "Sci-Fi"],
        actors: ["Hugh Jackman", "Christian Bale", "Scarlett Johansson"],
        producer: "Christopher Nolan",
    },
    {
        title: "Memento",
        siterating: 8.4,
        worldrating: 8.4,
        nr: 5,
        availability: true,
        poster: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg",
        description: "A man with short-term memory loss seeks vengeance for his wife's murder.",
        categories: ["Mystery", "Thriller"],
        actors: ["Guy Pearce", "Carrie-Anne Moss", "Joe Pantoliano"],
        producer: "Suzanne Todd",
    },
    {
        title: "Dunkirk",
        siterating: 8.2,
        worldrating: 8.3,
        nr: 6,
        availability: false,
        poster: "https://m.media-amazon.com/images/I/61OUGpUj1qL._AC_SY679_.jpg",
        description: "Allied soldiers are evacuated from Dunkirk during World War II.",
        categories: ["Action", "Drama", "History"],
        actors: ["Fionn Whitehead", "Barry Keoghan", "Mark Rylance"],
        producer: "Emma Thomas",
    },
    {
        title: "Tenet",
        siterating: 7.8,
        worldrating: 8.0,
        nr: 7,
        availability: false,
        poster: "https://m.media-amazon.com/images/I/71yBSh-r-XL._AC_SY679_.jpg",
        description: "A secret agent manipulates time to prevent World War III.",
        categories: ["Action", "Sci-Fi", "Thriller"],
        actors: ["John David Washington", "Robert Pattinson", "Elizabeth Debicki"],
        producer: "Christopher Nolan",
    },
    {
        title: "Batman Begins",
        siterating: 8.3,
        worldrating: 8.2,
        nr: 8,
        availability: false,
        poster: "https://m.media-amazon.com/images/I/41zZApkEp+L._AC_.jpg",
        description: "Bruce Wayne becomes Batman to fight crime in Gotham City.",
        categories: ["Action", "Adventure"],
        actors: ["Christian Bale", "Michael Caine", "Katie Holmes"],
        producer: "Charles Roven",
    },
];

Movie.insertMany(movies)
    .then(() => {
        console.log("Movies inserted successfully!");
        mongoose.connection.close();
    })
    .catch((err) => {
        console.error("Error inserting movies:", err);
        mongoose.connection.close();
    });
