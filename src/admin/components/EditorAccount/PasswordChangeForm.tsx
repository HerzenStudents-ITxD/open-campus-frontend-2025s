import { useState, ChangeEvent, FormEvent } from "react";
import { Alert, Button, Form } from "react-bootstrap";

export default function PasswordChangeForm() {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Новый пароль и подтверждение не совпадают");
      return;
    }
    if (newPassword.length < 6) {
      setError("Новый пароль должен быть не менее 6 символов");
      return;
    }

    setSaving(true);
    // эмуляция запроса
    setTimeout(() => {
      setSuccess("Пароль успешно изменён.");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setSaving(false);
    }, 800);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form.Group className="mb-3" controlId="oldPassword">
        <Form.Label>Старый пароль</Form.Label>
        <Form.Control
          type="password"
          value={oldPassword}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setOldPassword(e.target.value)
          }
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="newPassword">
        <Form.Label>Новый пароль</Form.Label>
        <Form.Control
          type="password"
          value={newPassword}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewPassword(e.target.value)
          }
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="confirmPassword">
        <Form.Label>Подтвердите новый пароль</Form.Label>
        <Form.Control
          type="password"
          value={confirmPassword}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
        />
      </Form.Group>

      <Button type="submit" disabled={saving}>
        {saving ? "Сохраняем..." : "Изменить пароль"}
      </Button>
    </Form>
  );
}
