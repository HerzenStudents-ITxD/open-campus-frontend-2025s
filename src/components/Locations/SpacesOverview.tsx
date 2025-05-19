import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import spaceMap from '../../assets/Locations/space-map.png';
import staircaseImage from '../../assets/Locations/modern_office_staircase.png';
import orangeStar from '../../assets/Locations/orange_star_symbol.svg';
import calendarIcon from '../../assets/calendar-icon.png';

import guestLoungeImg from '../../assets/Locations/IMG_2875.png';
import smallCoworkingImg from '../../assets/Locations/22e0f3d882004a08635bdb9d952db270.png';
import largeCoworkingImg from '../../assets/Locations/Kovorking_spb_1.png';
import hallImg from '../../assets/Locations/8123ec3f19e41da39a191929fa693d27.png';
import { createBooking, Booking } from '../../api';

interface Space {
  id: number;
  title: string;
  capacity: string;
  description: string;
  image: string;
}

const SpaceOverview: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [bookingLocation, setBookingLocation] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    purpose: '',
    peopleCount: '',
    telegramNick: '',
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const spaces: Space[] = [
    {
      id: 1,
      title: 'Открытая гостиная',
      capacity: '10 – 20 чел.',
      description: 'Пространство для встреч, отдыха и неформального общения',
      image: guestLoungeImg,
    },
    {
      id: 2,
      title: 'Малый коворкинг',
      capacity: '1 – 6 чел.',
      description: 'Малая рабочая зона для индивидуальной работы или небольших групп',
      image: smallCoworkingImg,
    },
    {
      id: 3,
      title: 'Большой коворкинг',
      capacity: '1 – 16 чел.',
      description: 'Просторное помещение для учёбы, работы в командах и проектов',
      image: largeCoworkingImg,
    },
    {
      id: 4,
      title: 'Холл',
      capacity: '1 – 6 чел.',
      description: 'Универсальное пространство для мероприятий, выставок и отдыха',
      image: hallImg,
    },
  ];

  const rules = [
    'Часы работы: 9:00–21:00',
    'Для индивидуальной работы в зонах бронирование не требуется.',
    'Для проведения мероприятий нужно заранее забронировать время.',
    'Бронирование осуществляется через онлайн-систему на данном сайте.',
    'Необходимо для использования отдельных зон (открытая гостиная, малый/большой коворкинг, холл).',
  ];
  
  // Навигация слайдера
  const handleCardClick = (index: number) => {
    setCurrentIndex(index);
  };

  const closeSlider = () => {
    setCurrentIndex(null);
  };

  const prevImage = () => {
    if (currentIndex !== null) {
      setCurrentIndex((currentIndex - 1 + spaces.length) % spaces.length);
    }
  };

  const nextImage = () => {
    if (currentIndex !== null) {
      setCurrentIndex((currentIndex + 1) % spaces.length);
    }
  };

  // Форматируем время для выбора
  const timeSlots = [
    '09:00 - 11:00',
    '11:00 - 13:00',
    '13:00 - 15:00',
    '15:00 - 17:00',
    '17:00 - 19:00',
    '19:00 - 21:00',
  ];

  // Обработка изменения формы
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

   const handleBookingSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const selectedSpace = spaces.find(s => s.title === bookingLocation);
    if (!selectedSpace) throw new Error('Локация не найдена');

    const [startTime] = bookingTime.split(' - ');
    const dateStart = new Date(`${bookingDate}T${startTime}:00`);
    const dateEnd = new Date(dateStart.getTime() + 2 * 60 * 60 * 1000);

    const booking: Booking = {
      userId: formData.telegramNick,
      locationId: selectedSpace.id,
      dateStart: dateStart.toISOString(),
      dateEnd: dateEnd.toISOString(),
      purpose: formData.purpose,
    };

    await createBooking(booking);
    alert(`Спасибо за бронирование!\nЛокация: ${bookingLocation}\nДата: ${bookingDate}\nВремя: ${bookingTime}`);

    // Сброс
    setBookingLocation('');
    setBookingDate('');
    setBookingTime('');
    setFormData({
      name: '',
      phone: '',
      email: '',
      purpose: '',
      peopleCount: '',
      telegramNick: '',
    });
  } catch (error: any) {
    alert(`Ошибка бронирования: ${error.message}`);
  }
};

  return (
    <div style={{ backgroundColor: '#EBE6E2' }}>
      {/* Header с изображением */}
      <div
        data-aos="fade-up"
        style={{
          width: '100vw',
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          overflow: 'hidden',
          marginBottom: '20px',
        }}
      >
        <img
          src={staircaseImage}
          alt="Modern Office Staircase"
          className="img-fluid"
          style={{ width: '100vw', height: 'auto', display: 'block' }}
        />
        <div
          className="literal-superbold"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
          }}
        >
          локации
        </div>

        {/* Новая кнопка забронировать помещение */}
        <div
          style={{
            position: 'absolute',
            top: 'calc(50% + 100px)',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <button
            onClick={() => {
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }}
            style={{
              backgroundColor: '#F44E1A',
              border: 'none',
              color: 'white',
              fontWeight: '700',
              padding: '10px 20px',
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '16px',
              boxShadow: '0 4px 10px rgba(244, 78, 26, 0.6)',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#d8430f')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#F44E1A')}
          >
            Забронировать помещение
          </button>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            fontSize: '17px',
            fontWeight: 'bold',
            textDecoration: 'underline',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            userSelect: 'none',
            textShadow: '0 0 5px rgba(0,0,0,0.7)',
          }}
        >
          <a
            href="https://yandex.ru/maps/?text=Казанская%20улица%2C%20д.%201"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'white',
              textDecoration: 'underline',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            Казанская улица, д. 1 <span role="img" aria-label="pushpin">📍</span>
          </a>
        </div>
      </div>

      {/* Основной контент */}
      <div className="container" style={{ maxWidth: '1140px', padding: '0 15px' }}>
        <h2
          className="literal-bold"
          data-aos="fade-up"
          style={{ fontSize: '25px', textAlign: 'left' }}
        >
          Доступные пространства
        </h2>

        <div className="row g-4 justify-content-center" data-aos="fade-up">
          {spaces.map((space, index) => (
            <div key={index} className="col-md-3">
              <div
                className={`space-card space-card${index + 1} position-relative h-100`}
                onClick={() => handleCardClick(index)}
                style={{ cursor: 'pointer' }}
              >
                <div
                  className="card-overlay"
                  style={{
                    borderRadius: '15px',
                    height: '240px',
                    position: 'relative',
                    transition: 'transform 0.3s',
                    overflow: 'hidden',
                    backgroundColor: '#F44E1A',
                  }}
                >
                  <div
                    className="position-absolute"
                    style={{
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: 'white',
                      borderRadius: '15px',
                      padding: '20px',
                      zIndex: 2,
                      minHeight: '200px',
                    }}
                  >
                    <p
                      className="text-center mb-0 card-description"
                      style={{ fontSize: '16px', paddingTop: '50px' }}
                    >
                      {space.description}
                    </p>
                  </div>

                  <div
                    className="position-absolute w-100"
                    style={{
                      top: 0,
                      left: 0,
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 3,
                    }}
                  >
                    <span
                      className="text-white fw-bold"
                      style={{ fontFamily: 'Literal, sans-serif', fontSize: '15px' }}
                    >
                      {space.title}
                    </span>
                  </div>

                  <div
                    className="position-absolute space-badge"
                    style={{
                      top: '60px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: '#E5D4B6',
                      borderRadius: '20px',
                      padding: '6px 16px',
                      fontSize: '13px',
                      zIndex: 4,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    }}
                  >
                    {space.capacity}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Слайдер или схема */}
        <div className="text-center mt-5" data-aos="zoom-in" style={{ position: 'relative' }}>
          {currentIndex !== null ? (
            <div
              style={{
                position: 'relative',
                maxWidth: '700px',
                margin: '0 auto',
                overflow: 'hidden',
                borderRadius: '15px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                backgroundColor: 'white',
              }}
            >
              <img
                src={spaces[currentIndex].image}
                alt={spaces[currentIndex].title}
                style={{
                  width: '100%',
                  height: '100%',
                  transition: 'transform 0.5s ease',
                }}
              />

              <div
                style={{
                  padding: '15px',
                  backgroundColor: '#F44E1A',
                  color: 'white',
                  borderBottomLeftRadius: '15px',
                  borderBottomRightRadius: '15px',
                  fontWeight: '700',
                  fontSize: '18px',
                }}
              >
                {spaces[currentIndex].title} — {spaces[currentIndex].capacity}
              </div>

              <button
                onClick={prevImage}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '10px',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.4)',
                  border: 'none',
                  color: 'white',
                  fontSize: '24px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                }}
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '10px',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.4)',
                  border: 'none',
                  color: 'white',
                  fontSize: '24px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                }}
                aria-label="Next image"
              >
                ›
              </button>

              <button
                onClick={closeSlider}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'rgba(0,0,0,0.4)',
                  border: 'none',
                  color: 'white',
                  fontSize: '20px',
                  borderRadius: '30%',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  lineHeight: '1',
                }}
                aria-label="Close slider"
              >
                ×
              </button>
            </div>
          ) : (
            <img
              src={spaceMap}
              alt="Схема пространств"
              className="img-fluid rounded shadow-sm"
              style={{ maxHeight: '500px', objectFit: 'contain' }}
            />
          )}
        </div>

        <p className="mt-3 text-center text-muted small" data-aos="fade-up">
          Соблюдайте чистоту, порядок и правила поведения в общественных пространствах!
        </p>

        {/* Информация о бронировании */}
        <div className="py-4 border-top" data-aos="fade-up">
          <h3
            className="literal-bold"
            style={{
              color: '#1D213C',
              fontSize: '28px',
              textAlign: 'left',
              marginBottom: '1.5rem',
            }}
          >
            Информация о бронировании
          </h3>

          <div
            className="shadow-sm"
            style={{
              backgroundColor: '#EBE6E2',
              borderRadius: '25px',
              border: '2px solid #1D213C',
              padding: '2rem',
              textAlign: 'left',
              marginTop: '1.5rem',
            }}
          >
            <h5
              style={{
                fontWeight: '700',
                color: '#1D213C',
                fontSize: '1.25rem',
                marginBottom: '1.5rem',
                textAlign: 'center',
              }}
            >
              Пространства доступны для всех желающих!
            </h5>
            <ul
              className="list-unstyled"
              style={{
                fontWeight: '400',
                color: '#1D213C',
                fontSize: '1.1rem',
                lineHeight: '1.6',
                paddingLeft: '1rem',
                maxWidth: '700px',
              }}
            >
              {rules.map((rule, index) => (
                <li key={index} className="d-flex align-items-start mb-2">
                  <img
                    src={orangeStar}
                    alt="star"
                    style={{
                      width: '20px',
                      height: '20px',
                      marginRight: '10px',
                      flexShrink: 0,
                      marginTop: '3px',
                    }}
                  />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="py-4 border-top" data-aos="fade-up">
          <h3
            className="literal-bold"
            style={{
              color: '#1D213C',
              fontSize: '28px',
              textAlign: 'left',
              marginBottom: '1.5rem',
            }}
          >
            Форма бронирования
          </h3>
{/* Контейнер для формы и информации */}
      <div
        className="shadow-sm mt-5 d-flex flex-wrap"
        style={{
          backgroundColor: 'white',
          borderRadius: '25px',
          padding: '2rem',
          maxWidth: '900px',
          margin: '0 auto 4rem auto',
          border: '2px solid #F44E1A',
          gap: '2rem',
        }}
        data-aos="fade-up"
      >
        {/* Левая колонка — информация */}
        <div
          style={{
            flex: '1 1 250px',
            color: '#1D213C',
            fontWeight: 700,
            fontSize: '1.1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingRight: '1rem',
            borderRight: '2px solid #F44E1A',
            minWidth: '250px',
          }}
        >
          <p>
            После подачи заявки с вами свяжутся для подтверждения бронирования.
            Пожалуйста, убедитесь, что ваши контактные данные указаны корректно.
          </p>
          <ul style={{ marginTop: '1rem', paddingLeft: '1.2rem', fontWeight: 400,
            fontSize: '1.1rem'}}>
            <p><li>Мы свяжемся в течение 24 часов.</li></p>
            <p><li>Вы получите подтверждение и детали по брони.</li></p>
            <p><li>В случае вопросов — мы всегда на связи.</li></p>
          </ul>
        </div>

        {/* Правая колонка — сама форма бронирования */}
        <div style={{ flex: '2 1 400px', minWidth: '300px' }}>
          <form onSubmit={handleBookingSubmit}>
            {/* Выбор локации */}
            <div className="mb-3">
              <label htmlFor="location" className="form-label fw-bold">
                Локация
              </label>
              <select
                id="location"
                className="form-select"
                value={bookingLocation}
                onChange={e => {
                  setBookingLocation(e.target.value);
                  setBookingTime(''); // сброс времени при смене локации
                }}
                required
              >
                <option value="" disabled>
                  Выберите локацию
                </option>
                {spaces.map((space, index) => (
                  <option key={index} value={space.title}>
                    {space.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Выбор даты */}
            <div className="mb-3 position-relative">
              <label htmlFor="date" className="form-label fw-bold">
                Дата
              </label>
              <input
                type="date"
                id="date"
                className="form-control ps-5"
                value={bookingDate}
                onChange={e => {
                  setBookingDate(e.target.value);
                  setBookingTime('');
                }}
                min={new Date().toISOString().split('T')[0]}
                required
                style={{ paddingLeft: '40px' }}
              />
              <img
                src={calendarIcon}
                alt="calendar"
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '38px',
                  width: '20px',
                  height: '20px',
                  pointerEvents: 'none',
                  opacity: 0.6,
                }}
              />
            </div>

            {/* Выбор времени */}
            {bookingLocation && bookingDate && (
              <div className="mb-3">
                <label htmlFor="time" className="form-label fw-bold">
                  Время
                </label>
                <select
                  id="time"
                  className="form-select"
                  value={bookingTime}
                  onChange={e => setBookingTime(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Выберите время
                  </option>
                  {timeSlots.map((slot, idx) => (
                    <option key={idx} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Имя */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-bold">
                Имя
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Телефон */}
            <div className="mb-3">
              <label htmlFor="phone" className="form-label fw-bold">
                Телефон
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+7 (___) ___-__-__"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Цель бронирования */}
            <div className="mb-3">
              <label htmlFor="purpose" className="form-label fw-bold">
                Цель бронирования
              </label>
              <textarea
                id="purpose"
                name="purpose"
                className="form-control"
                value={formData.purpose}
                onChange={handleInputChange}
                rows={2}
                placeholder="Например, встреча, мероприятие, учеба"
                required
              />
            </div>

            {/* Количество человек */}
            <div className="mb-3">
              <label htmlFor="peopleCount" className="form-label fw-bold">
                Количество человек
              </label>
              <input
                type="number"
                id="peopleCount"
                name="peopleCount"
                className="form-control"
                value={formData.peopleCount}
                onChange={handleInputChange}
                min={1}
                max={100}
                required
              />
            </div>

            {/* Ник в Telegram */}
            <div className="mb-3">
              <label htmlFor="telegramNick" className="form-label fw-bold">
                Ник в Telegram
              </label>
              <input
                type="text"
                id="telegramNick"
                name="telegramNick"
                className="form-control"
                value={formData.telegramNick}
                onChange={handleInputChange}
                placeholder="@username"
                required
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn"
                style={{
                  backgroundColor: '#F44E1A',
                  color: 'white',
                  fontWeight: '700',
                  borderRadius: '25px',
                  padding: '10px 30px',
                  fontSize: '18px',
                  boxShadow: '0 4px 10px rgba(244, 78, 26, 0.6)',
                  border: 'none',
                }}
                onMouseOver={e => (e.currentTarget.style.backgroundColor = '#d8430f')}
                onMouseOut={e => (e.currentTarget.style.backgroundColor = '#F44E1A')}
              >
                Забронировать
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
        </div>
        </div>
  );
};

export default SpaceOverview;
