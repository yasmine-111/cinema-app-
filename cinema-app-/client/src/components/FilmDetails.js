import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import "./FilmDetails.css";

const FilmDetails = ({ movies }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [addingFavorite, setAddingFavorite] = useState(false);

    const movie = movies.find((m) => String(m._id) === String(id));

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("User authenticated:", user.uid);
                setUserId(user.uid);
            } else {
                console.log("User logged out.");
                setUserId(null);
            }
        });

        return () => unsubscribe();
    }, []);

    if (!movie) {
        console.error("Movie not found for id:", id);
        return <p className="not-found">Movie not found!</p>;
    }

    const handleReservation = () => {
        navigate(`/reservation/${movie._id}`);
    };

    const handleAddToFavorites = async () => {
        console.log("Adding to favorites:", { userId, filmId: movie._id });

        if (!userId) {
            alert("You need to be logged in to add favorites.");
            return;
        }

        setAddingFavorite(true);
        try {
            const response = await axios.post('/api/favorites/add', {
                userId,
                filmId: movie._id,
            });
            alert(response.data.message || 'Added to favorites!');
        } catch (error) {
            console.error('Error adding to favorites:', error.response?.data || error.message);
            alert(`Error: ${error.response?.data?.message || 'Could not add to favorites.'}`);
        } finally {
            setAddingFavorite(false);
        }
    };

    return (
        <div className="film-page">
            <div className="film-content">
                <img
                    src={movie.poster || "https://via.placeholder.com/300"}
                    alt={movie.title || "No Image Available"}
                    className="vertical-poster"
                />
                <div className="details">
                    <h1 className="title">{movie.title || "Title not available"}</h1>
                    <p className="description">
                        {movie.description || "Description not available."}
                    </p>
                    <div className="categories">
                        {movie.categories?.join(", ") || "No categories available."}
                    </div>
                    <div className="ratings">
                        <div className="rating">
                            ⭐ {movie.siterating || "Not rated yet."}
                        </div>
                    </div>
                    <div className="actions">
                        <button className="reservation-button" onClick={handleReservation}>
                            Reservation
                        </button>
                        <button
                            className="favorite-button"
                            onClick={handleAddToFavorites}
                            disabled={addingFavorite}
                        >
                            {addingFavorite ? "Adding..." : "Add to Favorites"}
                        </button>
                    </div>
                    <div className="staff">
                        <p><strong>Producer:</strong> {movie.producer || "Not available"}</p>
                        <p><strong>Actors:</strong> {movie.actors?.join(", ") || "Not listed"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilmDetails;
