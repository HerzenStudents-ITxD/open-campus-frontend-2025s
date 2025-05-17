import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface EventTicket {
  title: string;
  location: string;
  date: string;
  type: 'event';
}

interface BookingTicket {
  title: string;
  location: string;
  date: string;
  type: 'booking';
  duration: string;
}

type Ticket = EventTicket | BookingTicket;

interface TicketContextType {
  events: EventTicket[];
  bookings: BookingTicket[];
  addEvent: (event: Omit<EventTicket, 'type'>) => void;
  addBooking: (booking: Omit<BookingTicket, 'type' | 'title'>) => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const useTicketContext = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTicketContext must be used within a TicketProvider');
  }
  return context;
};

export const TicketProvider = ({ children }: { children: ReactNode }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const { events, bookings } = useMemo(() => ({
    events: tickets.filter((t): t is EventTicket => t.type === 'event'),
    bookings: tickets.filter((t): t is BookingTicket => t.type === 'booking')
  }), [tickets]);

  const addEvent = (event: Omit<EventTicket, 'type'>) => {
    setTickets(prev => [...prev, { ...event, type: 'event' }]);
  };

  const addBooking = (booking: Omit<BookingTicket, 'type' | 'title'>) => {
    setTickets(prev => [...prev, {
      title: `Бронь ${booking.location}`,
      ...booking,
      type: 'booking'
    }]);
  };

  return (
    <TicketContext.Provider value={{ events, bookings, addEvent, addBooking }}>
      {children}
    </TicketContext.Provider>
  );
};