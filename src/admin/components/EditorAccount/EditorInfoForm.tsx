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
import { fetchUser, updateUser } from "../../../api";

const userId = "40E5D842-CAF4-4A20-9F19-EA0FAB876797";

interface EditorInfo {
  name: string;
  email: string;
  bio: string;
  avatarUrl: string | null;
  avatarFile?: File;
}

export default function EditorInfoForm() {
  const [info, setInfo] = useState<EditorInfo>({
    name: "",
    email: "",
    bio: "",
    avatarUrl: null,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchUser(userId)
      .then((data) =>
        setInfo({
          name: data.name,
          email: data.email,
          bio: data.bio,
          avatarUrl: data.avatarUrl ? `http://localhost:5241${data.avatarUrl}` : null, // полный путь
        })
      )
      .catch(() => setError("Ошибка загрузки данных"))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setInfo((prev) => ({
        ...prev,
        avatarUrl: url,
        avatarFile: file,
      }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    updateUser(userId, {
      name: info.name,
      email: info.email,
      bio: info.bio,
      avatarFile: info.avatarFile,
    })
      .then(() => setSuccess("Данные успешно сохранены."))
      .catch(() => setError("Ошибка при сохранении"))
      .finally(() => setSaving(false));
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form.Group controlId="avatar" className="mb-4 text-center">
        <Form.Label>Аватар</Form.Label>
        <div className="mb-2">
          <Image
            src={info.avatarUrl || "https://via.placeholder.com/100?text=Avatar"}
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

      <Form.Group className="mb-3">
        <Form.Label>Имя</Form.Label>
        <Form.Control name="name" value={info.name} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Электронная почта</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={info.email}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
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
