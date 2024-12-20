import React from "react";
import "./Slider.css";
import { Link } from "react-router-dom";

const slider = document.getElementById("hero-slider");
const slides = document.querySelectorAll(".slide");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let currentIndex = 0;
const totalSlides = slides.length;

// Auto-slide interval (every 5 seconds)
let autoSlideInterval = setInterval(moveToNextSlide, 5000);

// Function to move to the next slide
function moveToNextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides; // Loop back to first slide
  updateSliderPosition();
}

// Function to move to the previous slide
function moveToPrevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Loop back to last slide
  updateSliderPosition();
}

// Update slider position
function updateSliderPosition() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Manual navigation event listeners
next.addEventListener("click", () => {
  clearInterval(autoSlideInterval); // Stop auto-slide on manual interaction
  moveToNextSlide();
  autoSlideInterval = setInterval(moveToNextSlide, 5000); // Restart auto-slide
});

prev.addEventListener("click", () => {
  clearInterval(autoSlideInterval); // Stop auto-slide on manual interaction
  moveToPrevSlide();
  autoSlideInterval = setInterval(moveToNextSlide, 5000); // Restart auto-slide
});



const Slider = ({ movies }) => {
    const highestRated = [...movies]
        .sort((a, b) => b.siterating - a.siterating)
        .slice(0, 4);
    
  return (
    <div className="hero-slider-container">
      <div className="hero-slider" id="hero-slider">
        {highestRated.map((movie)=>(<Link to={`/movie/${movie._id}`} key={movie._id}>
            <div className="slide">
                <div className="slide-content">
                <h1>{movie.title}</h1>
                <p>{movie.description}</p>
                </div>
            <img src={movie.hp} alt="Comedy Gold" />
            </div>              
        </Link>))}
      </div>
      {/* Navigation Buttons */}
      <button className="slider-nav left" id="prev">&#10094;</button>
      <button className="slider-nav right" id="next">&#10095;</button>
    </div>
  );
};

export default Slider;
