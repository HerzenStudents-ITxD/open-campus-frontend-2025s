import { useState } from "react";

export interface Location {
  id: number;
  name: string;
  capacity: number;
  description: string;
  imageUrl: string;
}

export interface LocationFormProps {
  onSave: (location: Omit<Location, "id">) => void;
}

function LocationForm({ onSave }: LocationFormProps) {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Обработчик загрузки файла
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string); // Загружаем превью изображения
      };
      reader.readAsDataURL(file); // Преобразуем файл в строку Base64
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !imageFile) return; // Проверка на обязательные поля

    onSave({
      name,
      capacity,
      description,
      imageUrl: imageUrl || "", // В случае ошибки или пустого файла
    });

    // Очистка формы после сохранения
    setName("");
    setCapacity(0);
    setDescription("");
    setImageUrl(null);
    setImageFile(null);
  };

  return (
    <div className="mb-4">
      <h4 className="mb-3">Добавить новую локацию</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Название локации</label>
          <input
            type="text"
            className="form-control"
            placeholder="Введите название локации"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Вместимость</label>
          <input
            type="number"
            className="form-control"
            placeholder="Введите количество мест"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
            required
            min={0}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Описание</label>
          <textarea
            className="form-control"
            placeholder="Описание локации"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Выберите изображение</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        {/* Предпросмотр картинки */}
        {imageUrl && (
          <div className="mb-3">
            <img
              src={imageUrl}
              alt="Превью"
              style={{ maxWidth: "200px", borderRadius: "8px" }}
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary">
          Сохранить
        </button>
      </form>
    </div>
  );
}

export default LocationForm;

  