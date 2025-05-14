import NewsForm, { NewsData } from "../components/Home/NewsForm";
import NewsList from "../components/Home/NewsList";
import { useState } from "react";

export default function AdminHome() {
  const [newsItems, setNewsItems] = useState<NewsData[]>([]);

  const addNews = (item: NewsData) => setNewsItems((prev) => [...prev, item]);
  const updateNews = (item: NewsData) =>
    setNewsItems((prev) =>
      prev.map((n) => (n.id === item.id ? item : n))
    );
  const deleteNews = (id: number, reason: string) => {
    console.log("Удалена новость", id, "Причина:", reason);
    setNewsItems((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="admin-wrapper p-4">
      <h1>Редактирование новостей</h1>
      <hr />
      <NewsForm onSubmit={addNews} />
      <NewsList
        newsItems={newsItems}
        onUpdate={updateNews}
        onDelete={deleteNews}
      />
    </div>
  );
}

