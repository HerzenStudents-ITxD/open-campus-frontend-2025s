import React, { useState } from "react";
import { Button, Form, Row, Col, Card } from "react-bootstrap";

export default function PhotoGalleryEditor() {
  const [photos, setPhotos] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const photoURLs = fileArray.map((file) => URL.createObjectURL(file));

    setPhotos((prevPhotos) => [...prevPhotos, ...photoURLs]);
  };

  const deletePhoto = (index: number) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-5">
      <h2 className="mb-4">Редактор фотогалереи</h2>

      {/* Поле для загрузки файлов */}
      <Form className="mb-4">
        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Выберите одно или несколько фото</Form.Label>
          <Form.Control type="file" multiple onChange={handleFileChange} />
        </Form.Group>
      </Form>

      {/* Отображение загруженных фото */}
      <Row className="g-4">
        {photos.map((photo, index) => (
          <Col key={index} md={3}>
            <Card>
              <Card.Img variant="top" src={photo} alt={`Фото ${index + 1}`} />
              <Card.Body className="text-center">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deletePhoto(index)}
                >
                  Удалить
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
