import React from 'react';
import logo from '../../assets/Locations/6ae87cd89a946d79dbbe1eee19622557.svg';
import '../../index.css'; // подключаем анимации

interface MainSectionProps {
  className?: string;
}

const MainSection: React.FC<MainSectionProps> = ({ className }) => {
  return (
    <section
      style={{ backgroundColor: '#1D213C' }}
      className={`text-white py-4 px-3 fade-in-fast ${className ?? ''}`}
    >
      <div className="container">
        <div className="row text-center text-md-start align-items-center">
          {/* Левый блок */}
          <div className="col-12 col-md-4 mb-3 mb-md-0">
            <p className="fw-bold mb-1">О пространстве</p>
            <p className="fw-bold mb-1">Правила пространства</p>
            <p className="fw-bold mb-0">Часто задаваемые вопросы</p>
          </div>

          {/* Центр — логотип и подпись */}
          <div className="col-12 col-md-4 mb-3 mb-md-0 text-center">
            <img
              src={logo}
              alt="логотип"
              className="mb-2"
              style={{ maxWidth: '200px', height: 'auto' }}
            />
            <figcaption className="text-white fs-6">
              РГПУ им. А. И. Герцена. 2024 ©
            </figcaption>
          </div>

          {/* Правый блок — соцсети */}
          <div className="col-12 col-md-4 text-md-end">
            <p className="fw-bold mb-1">ВКонтакте</p>
            <p className="fw-bold mb-1">Телеграм</p>
            <p className="fw-bold mb-0">Дзен</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
