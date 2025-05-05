import React, { useState } from 'react';
import '../styles/ChangePasswordModal.css';

interface Props {
  onClose: () => void;
}

export default function ChangePasswordModal({ onClose }: Props) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const [isClosing, setIsClosing] = useState(false); // ✅ добавлено

  const handleSave = () => {
    const storedPassword = localStorage.getItem("position");

    // Проверка на пустые поля
    if (!oldPassword || !newPassword || !repeatPassword) {
        setError("Заполните все поля");
        return;
    }

    if (oldPassword !== storedPassword) {
      setError("Старый пароль неверный");
      return;
    }

    // Новый пароль не должен быть таким же, как старый
    if (newPassword === oldPassword) {
        setError("Новый пароль не должен совпадать со старым");
        return;
    }

    if (newPassword.length < 6) {
      setError("Новый пароль слишком короткий");
      return;
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!strongPasswordRegex.test(newPassword)) {
        setError("Пароль должен содержать минимум 8 символов, включая заглавную, строчную буквы и цифру");
        return;
    }

    if (newPassword.trim() !== repeatPassword.trim()) {
        setError("Пароли не совпадают");
        return;
    }
      
    localStorage.setItem("position", newPassword);
    setError('');
    alert("Пароль успешно изменён");
    startClosing(); // ✅ с анимацией
  };

  const startClosing = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // соответствует CSS-анимации
  };

  return (
    <div className={`modal-overlay d-flex justify-content-center align-items-center ${isClosing ? 'fade-out' : ''}`}>
      <div className={`modal-window bg-dark text-white p-4 rounded-4 shadow ${isClosing ? 'slide-up' : ''}`}>
        <button className="btn-close btn-close-white ms-auto" onClick={startClosing}></button>
        <h2 className="fs-3 text-center mb-4">Изменить пароль</h2>
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Введите старый пароль"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Введите новый пароль"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Повторите новый пароль"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        {error && <p className="text-danger">{error}</p>}
        <button className="save" onClick={handleSave}>Сохранить</button>
      </div>
    </div>
  );
}
