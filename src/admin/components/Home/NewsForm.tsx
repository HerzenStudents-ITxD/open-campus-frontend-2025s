import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export interface NewsData {
  id?: string;
  title: string;
  content: string;
  author: string;
  publishedAt: string;
  isPublished: boolean;
  imageFile?: File;
  imagePath?: string;
}

interface NewsFormProps {
  onSubmit: (news: NewsData) => void;
}

export default function NewsForm({ onSubmit }: NewsFormProps) {
  const [news, setNews] = useState<NewsData>({
    title: "",
    content: "",
    author: "",
    publishedAt: new Date().toISOString().slice(0, 10),
    isPublished: true,
    imageFile: undefined,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNews((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNews((prev) => ({
      ...prev,
      isPublished: e.target.value === "published",
    }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNews((prev) => ({ ...prev, imageFile: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(news);
    setNews({
      title: "",
      content: "",
      author: "",
      publishedAt: new Date().toISOString().slice(0, 10),
      isPublished: true,
      imageFile: undefined,
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
            name="publishedAt"
            value={news.publishedAt}
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

        <Form.Group className="mb-3" controlId="newsStatus">
          <Form.Label>Статус публикации</Form.Label>
          <Form.Select
            value={news.isPublished ? "published" : "draft"}
            onChange={handleStatusChange}
          >
            <option value="published">Будет опубликовано</option>
            <option value="draft">Черновик</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="newsImage">
          <Form.Label>Изображение</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImage} />
        </Form.Group>

        <Button type="submit">Добавить новость</Button>
      </Form>
    </div>
  );
}


