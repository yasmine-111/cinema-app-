import React, { useState } from 'react';
import axios from 'axios';
import './reservation.css';

const Reservation = ({ userId, movie }) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [seats, setSeats] = useState(1);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Vérifiez si `movie` est défini
    if (!movie) {
        return <p className="error">Movie not found. Please go back and select a movie.</p>;
    }

    const handleReservation = async () => {
        if (!date || !time || seats < 1) {
            setMessage('Please fill all fields correctly.');
            return;
        }

        const selectedDate = new Date(date);
        const today = new Date();
        if (selectedDate < today) {
            setMessage('Reservation date must be in the future.');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post('/api/reservations/add', {
                userId,
                filmId: movie._id,
                date,
                time,
                seats,
            });
            setMessage(response.data.message || 'Reservation successful!');
        } catch (error) {
            console.error('Error making reservation:', error.response?.data || error.message);
            setMessage(error.response?.data?.message || 'Error making reservation. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reservation-page">
            <h1>Make a Reservation for {movie.title}</h1>

            <div className="reservation-form">
                <label>
                    Date:
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Time:
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Seats:
                    <input
                        type="number"
                        min="1"
                        value={seats}
                        onChange={(e) => setSeats(parseInt(e.target.value, 10))}
                        required
                    />
                </label>

                <button onClick={handleReservation} disabled={loading}>
                    {loading ? 'Reserving...' : 'Reserve'}
                </button>
            </div>

            {message && <p className="reservation-message">{message}</p>}
        </div>
    );
};

export default Reservation;
