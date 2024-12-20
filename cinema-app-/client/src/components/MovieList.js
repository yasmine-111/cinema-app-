import React from "react";
import { Link } from "react-router-dom";
import "./MovieList.css";



const MovieList = ({ movies }) => {
    const highestRated = [...movies]
        .sort((a, b) => b.siterating - a.siterating)
        .slice(0, 5);

    const comingSoon = [...movies]
        .filter((movie) => !movie.availability)
        .sort((a, b) => b.siterating - a.siterating)
        .slice(0, 5);

    const recommended = [...movies]
        .filter((movie) => movie.availability === true) // Example: Adjust logic for recommendation
        .sort((a, b) => b.siterating - a.siterating)
        .slice(0, 5);

    return (
        <>
        <div className="movie-list-container">
            {/* Highest Rated Section */}
            <div className="movie-section">
                <h2 className="section-title">Highest Rated</h2>
                <div className="movie-list">
                    {highestRated.map((movie) => (
                        <Link to={`/movie/${movie._id}`} key={movie._id}>
                            <div className="film-card">
                                <div className="film-card-rating">
                                    <span className="star">★</span> {movie.siterating}
                                </div>
                                <img
                                    src={movie.poster}
                                    alt={movie.title}
                                    className="film-card-img"
                                />
                                <h3 className="film-card-title">{movie.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Coming Soon Section */}
            <div className="movie-section">
                <h2 className="section-title">Coming Soon</h2>
                <div className="movie-list">
                    {comingSoon.map((movie) => (
                        <Link to={`/movie/${movie._id}`} key={movie._id}>
                            <div className="film-card">
                                <div className="film-card-rating">
                                    <span className="star">★</span> {movie.siterating}
                                </div>
                                <img
                                    src={movie.poster}
                                    alt={movie.title}
                                    className="film-card-img"
                                />
                                <h3 className="film-card-title">{movie.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recommended Section */}
            <div className="movie-section">
                <h2 className="section-title">Recommended</h2>
                <div className="movie-list">
                    {recommended.map((movie) => (
                        <Link to={`/movie/${movie._id}`} key={movie._id}>
                            <div className="film-card">
                                <div className="film-card-rating">
                                    <span className="star">★</span> {movie.siterating}
                                </div>
                                <img
                                    src={movie.poster}
                                    alt={movie.title}
                                    className="film-card-img"
                                />
                                <h3 className="film-card-title">{movie.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
};

export default MovieList;
