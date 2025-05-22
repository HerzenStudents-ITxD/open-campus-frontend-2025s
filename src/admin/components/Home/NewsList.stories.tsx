import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import NewsList from "./NewsList";
import { NewsData } from "./NewsForm";

const sampleNews: NewsData[] = [
  {
    id: "1",
    title: "Заголовок новости 1",
    content: "Содержание новости 1",
    author: "Автор 1",
    publishedAt: "2025-05-22",
    isPublished: true,
    imagePath: "/images/news1.jpg",
  },
  {
    id: "2",
    title: "Заголовок новости 2",
    content: "Содержание новости 2",
    author: "Автор 2",
    publishedAt: "2025-05-20",
    isPublished: false,
  },
];

const meta: Meta<typeof NewsList> = {
  title: "Components/NewsList",
  component: NewsList,
};

export default meta;

const Template: StoryFn<typeof NewsList> = () => {
  const [newsItems, setNewsItems] = useState(sampleNews);

  const handleUpdate = (updated: NewsData) => {
    setNewsItems((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
  };

  const handleDelete = (id: string, reason: string) => {
    alert(`Deleted id: ${id}\nReason: ${reason}`);
    setNewsItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <NewsList newsItems={newsItems} onUpdate={handleUpdate} onDelete={handleDelete} />
  );
};

export const Default = Template.bind({});
