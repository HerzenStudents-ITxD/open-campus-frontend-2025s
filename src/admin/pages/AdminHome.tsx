import { useEffect, useState } from "react";
import NewsForm, { NewsData } from "../components/Home/NewsForm";
import NewsList from "../components/Home/NewsList";
import {
  createNews,
  fetchNews,
  updateNews as apiUpdateNews,
  deleteNews as apiDeleteNews
} from "../../api";

export default function AdminHome() {
  const [newsItems, setNewsItems] = useState<NewsData[]>([]);

  useEffect(() => {
    fetchNews()
      .then(setNewsItems)
      .catch(() => console.error("Ошибка при загрузке новостей"));
  }, []);

  const addNews = async (item: NewsData) => {
    const created = await createNews(item);
    setNewsItems((prev) => [...prev, created]);
  };

  const updateNews = async (item: NewsData) => {
    try {
      if (!item.id) throw new Error("ID новости не указан");
      const updated = await apiUpdateNews(item.id, item);
      setNewsItems((prev) =>
        prev.map((n) => (n.id === updated.id ? updated : n))
      );
    } catch (err) {
      console.error("Ошибка при редактировании новости", err);
    }
  };

  const deleteNews = async (id: string, reason: string) => {
    try {
      await apiDeleteNews(id, reason);
      setNewsItems((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("Ошибка при удалении новости", err);
    }
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


