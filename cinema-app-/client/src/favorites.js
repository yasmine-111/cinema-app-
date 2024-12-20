import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import './favorites.css'; 

const Favorites = ({ userId }) => {
    const [favorites, setFavorites] = useState([]);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchFavorites = async () => {
        try {
            console.log("Fetching favorites for user:", userId);
            
            const favoritesResponse = await axios.get(`/api/favorites/${userId}`);
            console.log("Favorites fetched:", favoritesResponse.data);
            setFavorites(favoritesResponse.data.favorites || []);
            
            const moviesResponse = await axios.get("/api/movies");
            console.log("Movies fetched:", moviesResponse.data);
            setMovies(moviesResponse.data);
        } catch (error) {
            console.error("Error fetching favorites or movies:", error.response?.data || error.message);
            alert("Impossible de récupérer vos favoris. Veuillez réessayer plus tard.");
        } finally {
            setLoading(false);
        }
      };
    
    

        if (userId) fetchFavorites();
    }, [userId]);

    if (loading) {
        return <p className="loading-text">Chargement en cours...</p>;
    }

    if (favorites.length === 0) {
        return <p className="no-favorites-text">Vous n'avez pas encore de films dans vos favoris.</p>;
    }

    return (
        <div className="favorites-container">
            <h1 className="favorites-title">Mes Films Favoris</h1>
            <div className="movies-list">
                {favorites.map((filmId) => {
                    const movie = movies.find((m) => String(m._id) === String(filmId));
                    return (
                        <div key={filmId} className="movie-card">
                            {movie ? (
                                <>
                                    <div className="movie-poster">
                                        <img
                                            src={movie.poster || "https://via.placeholder.com/150"}
                                            alt={movie.title || "Image non disponible"}
                                            className="poster-img"
                                        />
                                    </div>
                                    <h3 className="movie-title">{movie.title}</h3>
                                    <div className="button-container">
                                        <button className="buy-btn">Acheter</button>
                                        <Link to={`/film/${movie._id}`} className="more-info-btn">
                                            Plus d'infos
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <p className="error-text">Détails du film non disponibles</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Favorites;
