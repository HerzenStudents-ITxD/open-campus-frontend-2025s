export interface Booking {
  id: string;
  location: string;
  date: string;
  user: string;
}

interface BookingOverviewProps {
  bookings: Booking[];
}

function BookingOverview({ bookings }: BookingOverviewProps) {
  return (
    <div className="booking-overview">
      <h3 className="mt-5 mb-3">Обзор бронирований</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Локация</th>
            <th>Дата</th>
            <th>Пользователь</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.location}</td>
              <td>{booking.date}</td>
              <td>{booking.user}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookingOverview;

  