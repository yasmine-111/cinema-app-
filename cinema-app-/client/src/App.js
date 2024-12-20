import React, { useState, useEffect } from 'react';
import { auth } from './firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import Login from './Login/Login';
import Header from './header/Header';
import Footer from './footer/footer';
import Manage from './manage/Manage';
import MovieList from './components/MovieList';
import FilmDetails from './components/FilmDetails';
import Planning from './Planning';
import SearchFilter from './pages/SearchFilter';
import Reservation from './reservation';
import axios from 'axios';
import Favorites from './favorites';

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [movies, setMovies] = useState([]);
  const [planning, setPlanning] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("You have been logged out successfully.");
      setUserInfo(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log("Fetching movies...");
        const response = await fetch("http://localhost:5000/api/movies");
        const data = await response.json();
        console.log("Movies fetched:", data);
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User authenticated:", user.uid);
        setUserInfo({ uid: user.uid });
      } else {
        console.log("User logged out.");
        setUserInfo(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchPlanning = async () => {
      try {
        console.log("Fetching planning...");
        const response = await axios.get("http://localhost:5000/api/planning");
        console.log("Planning data fetched:", response.data);
        setPlanning(response.data);
      } catch (error) {
        console.error("Error fetching planning data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlanning();
  }, []);

  const ReservationWrapper = () => {
    const { id } = useParams();
    const movie = movies.find((m) => m._id === id);
    if (!movie) return <p>Movie not found.</p>;
    return <Reservation userId={userInfo?.uid} movie={movie} />;
  };

  return (
    <Router>
      <Header userInfo={userInfo} handleLogout={handleLogout} />
      <div className="app">
        <Routes>
          <Route path="/" element={<MovieList movies={movies} />} />
          <Route path="/movie/:id" element={<FilmDetails movies={movies} userId={userInfo?.uid} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/manage" element={<Manage userInfo={userInfo} handleLogout={handleLogout} />} />
          <Route path="/planning" element={<Planning planning={planning} loading={loading} />} />
          <Route path="/favorites" element={<Favorites userId={userInfo?.uid} />} />
          <Route path="/reservation/:id" element={<ReservationWrapper />} />
          <Route path="/search" element={<SearchFilter movies={movies} />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
