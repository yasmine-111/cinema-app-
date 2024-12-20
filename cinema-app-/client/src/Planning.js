import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for routing
import './Planning.css';

const Planning = () => {
  const [planning, setPlanning] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch planning and movie data
        const planningResponse = await axios.get("http://localhost:5000/api/planning");
        const moviesResponse = await axios.get("http://localhost:5000/api/movies");
        setPlanning(planningResponse.data);
        setMovies(moviesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Generate the next 7 days
  const getNext7Days = () => {
    const currentDate = new Date();
    let days = [];
    for (let i = 0; i < 7; i++) {
      let nextDay = new Date(currentDate);
      nextDay.setDate(currentDate.getDate() + i);
      days.push(nextDay);
    }
    return days;
  };

  // Get the next 7 days
  const next7Days = getNext7Days();

  // Set the initial selected date to the first day
  useEffect(() => {
    if (!selectedDate && next7Days.length > 0) {
      setSelectedDate(next7Days[0].toISOString().split('T')[0]);
    }
  }, [next7Days, selectedDate]);

  // Filter planning data for the selected day
  const filteredPlanning = planning.filter((entry) => entry.date === selectedDate);

  if (loading) {
    return <p className="loading-text">Loading...</p>;
  }

  return (
    <div className="planning-container">
      <h1 className="planning-title">Film Schedule</h1>

      {/* Top navigation for days */}
      <div className="date-navigation">
        {next7Days.map((day) => {
          const dayString = day.toISOString().split('T')[0];
          return (
            <button
              key={dayString}
              className={`date-button ${selectedDate === dayString ? 'active' : ''}`}
              onClick={() => setSelectedDate(dayString)}
            >
              {day.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}
            </button>
          );
        })}
      </div>

      {/* Movies for the selected date */}
      <div className="movies-list">
        {filteredPlanning.map((entry) => {
          // Find the movie details by matching filmId
          const movie = movies.find((m) => m._id === entry.filmId);
          return (
            <div key={entry._id} className="movie-card">
              {movie ? (
                <>
                  {/* Movie Poster */}
                  <div className="movie-poster">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="poster-img"
                    />
                  </div>

                  {/* Movie Title */}
                  <h3 className="movie-title">{movie.title}</h3>

                  {/* Movie Schedule Details */}
                  <p className="movie-time">{entry.time}</p>

                  {/* Buttons */}
                  <div className="button-container">
                    <button className="buy-btn">Buy Tickets</button>
                    {/* More Info Button: Link to movie details page */}
                    <Link to={`/movie/${movie._id}`} className="more-info-btn">
                      More Info
                    </Link>
                  </div>
                </>
              ) : (
                <p className="error-text">Movie details not available</p>
              )}
            </div>
          );
        })}
        {filteredPlanning.length === 0 && (
          <p className="no-movies-text">No movies scheduled for this day.</p>
        )}
      </div>
    </div>
  );
};

export default Planning;
