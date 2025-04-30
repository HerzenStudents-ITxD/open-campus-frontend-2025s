import {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent
} from "react";
import {
  Spinner,
  Alert,
  Button,
  Form,
  Image
} from "react-bootstrap";

interface EditorInfo {
  name: string;
  email: string;
  bio: string;
  avatarUrl: string | null;
}

export default function EditorInfoForm() {
  const [info, setInfo] = useState<EditorInfo>({
    name: "Иван Иванов",
    email: "ivan.ivanov@example.com",
    bio: "Редактор с опытом более 5 лет.",
    avatarUrl: null,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  // эмулируем загрузку
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  // Общий обработчик текстовых полей
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Обработчик выбора аватара
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      // создаём временный URL для предпросмотра
      const url = URL.createObjectURL(file);
      setInfo((prev) => ({ ...prev, avatarUrl: url }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    // эмуляция сохранения
    setTimeout(() => {
      setSuccess("Данные успешно сохранены.");
      setSaving(false);
    }, 800);
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {/* Avatar */}
      <Form.Group controlId="avatar" className="mb-4 text-center">
        <Form.Label>Аватар</Form.Label>
        <div className="mb-2">
          <Image
            src={
              info.avatarUrl ||
              "https://via.placeholder.com/100?text=Avatar"
            }
            roundedCircle
            width={100}
            height={100}
            alt="аватар"
          />
        </div>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="editorName">
        <Form.Label>Имя</Form.Label>
        <Form.Control
          name="name"
          value={info.name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="editorEmail">
        <Form.Label>Электронная почта</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={info.email}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="editorBio">
        <Form.Label>О себе</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="bio"
          value={info.bio}
          onChange={handleChange}
        />
      </Form.Group>

      <Button type="submit" disabled={saving}>
        {saving ? "Сохраняем..." : "Сохранить"}
      </Button>
    </Form>
  );
}
