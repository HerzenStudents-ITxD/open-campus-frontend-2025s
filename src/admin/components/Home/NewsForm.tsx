import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export interface NewsData {
  id?: number;
  title: string;
  content: string;
  date: string;      // дата публикации
  author: string;    // кто добавил
  image?: File | null;
}

interface NewsFormProps {
  onSubmit: (news: NewsData) => void;
}

export default function NewsForm({ onSubmit }: NewsFormProps) {
  const [news, setNews] = useState<NewsData>({
    title: "",
    content: "",
    date: new Date().toISOString().slice(0, 10),
    author: "",
    image: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNews((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      setNews((prev) => ({ ...prev, image: target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...news, id: Date.now() });
    setNews({
      title: "",
      content: "",
      date: new Date().toISOString().slice(0, 10),
      author: "",
      image: null,
    });
  };

  return (
    <div className="mb-6">
      <h3>Добавить новость</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="newsTitle">
          <Form.Label>Заголовок</Form.Label>
          <Form.Control
            name="title"
            value={news.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="newsContent">
          <Form.Label>Содержание</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="content"
            value={news.content}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="newsDate">
          <Form.Label>Дата публикации</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={news.date}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="newsAuthor">
          <Form.Label>Автор</Form.Label>
          <Form.Control
            name="author"
            value={news.author}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="newsImage">
          <Form.Label>Изображение новости</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImage} />
        </Form.Group>

        <Button type="submit">Добавить новость</Button>
      </Form>
    </div>
  );
}
