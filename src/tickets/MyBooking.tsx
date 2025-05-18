import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MyBooking.css';
import { useTicketContext } from '../context/TicketContext';

interface Booking {
  title: string;
  location: string;
  date: string;
  duration: string;
}

const MyBookings: React.FC = () => {
  const { bookings } = useTicketContext() as { bookings: Booking[] };

  return (
    <div className="bookings-container">
      <h1 className="bookings-main-title">Мои брони</h1>

      {bookings.length === 0 ? (
        <div className="empty-bookings">
          Пока пусто!
        </div>
      ) : (
        <div className="full-width-booking">
          <div className="booking-header">
            <div className="booking-col-location">Помещение</div>
            <div className="booking-duration-label">Длительность</div>
            <div className="booking-col-date">Забронировано</div>
          </div>
          
          <div className="booking-content">
            <div className="booking-col-location">
              {bookings[0].location}
            </div>
            <div className="booking-duration-label">
              {bookings[0].duration}
            </div>
            <div className="booking-col-date">
              {bookings[0].date}
            </div>
          </div>
        </div>
      )}

      <div className="more-bookings-block">
        <span>Забронируйте помещение!</span>
        <Link to="/locations" className="bookings-button">Локации</Link>
      </div>
    </div>
  );
};

export default MyBookings;