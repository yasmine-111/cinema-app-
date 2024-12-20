import React, { useState } from 'react';
import './SearchFilter.css';
import { Link } from "react-router-dom";
const SearchFilter = ({ movies }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [availability, setAvailability] = useState('all');
  const [category, setCategory] = useState('all');
  const [ratingRange, setRatingRange] = useState([0, 10]);
  const [sortBy, setSortBy] = useState('none');

  // Filter movies based on search term, availability, category, and rating
  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAvailability = availability === 'all' || movie.availability === (availability === 'yes');
    const matchesCategory = category === 'all' || movie.categories.includes(category);
    const matchesRating = movie.siterating >= ratingRange[0] && movie.siterating <= ratingRange[1];
    
    return matchesSearch && matchesAvailability && matchesCategory && matchesRating;
  });

  // Sort the filtered movies based on rating or title
  const sortedMovies = filteredMovies.sort((a, b) => {
    if (sortBy === 'rating-asc') {
      return a.siterating - b.siterating;
    } else if (sortBy === 'rating-desc') {
      return b.siterating - a.siterating;
    } else if (sortBy === 'alpha-asc') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'alpha-desc') {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  return (
    <div className="search-filter-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filters">
        <div className="filter">
          <label>Availability</label>
          <select value={availability} onChange={(e) => setAvailability(e.target.value)}>
            <option value="all">All</option>
            <option value="yes">Available</option>
            <option value="no">Not Available</option>
          </select>
        </div>

        <div className="filter">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All</option>
            <option value="romance">Romance</option>
            <option value="action">Action</option>
            <option value="science-fiction">Science Fiction</option>
            <option value="fantasy">Fantasy</option>
            <option value="comedy">Comedy</option>
            <option value="horror">Horror</option>
            <option value="mystery">Mystery</option>
            <option value="history">History</option>
            <option value="slice-of-life">Slice of Life</option>
            <option value="sports">Sports</option>
          </select>
        </div>

        <div className="filter">
          <label>Rating</label>
          <div className="rating-inputs">
            <input
              type="number"
              step="0.01"
              min="0"
              max="10"
              value={ratingRange[0]}
              onChange={(e) => setRatingRange([parseFloat(e.target.value), ratingRange[1]])}
            />
            <span>to</span>
            <input
              type="number"
              step="0.01"
              min="0"
              max="10"
              value={ratingRange[1]}
              onChange={(e) => setRatingRange([ratingRange[0], parseFloat(e.target.value)])}
            />
          </div>
          <div>{`Rating: ${ratingRange[0]} - ${ratingRange[1]}`}</div>
        </div>

        <div className="filter">
          <label>Sort By</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="none">None</option>
            <option value="rating-asc">Rating (Low to High)</option>
            <option value="rating-desc">Rating (High to Low)</option>
            <option value="alpha-asc">Alphabetical (A to Z)</option>
            <option value="alpha-desc">Alphabetical (Z to A)</option>
          </select>
        </div>
      </div>

      <div className="movie-list">
        {sortedMovies.map(movie => (
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
  );
};

export default SearchFilter;
