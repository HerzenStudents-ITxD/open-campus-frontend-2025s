// src/api.js
const api = {
    getEvents: () => {
      return [
        { id: 1, title: 'Мероприятие 1', date: '2025-05-01' },
        { id: 2, title: 'Мероприятие 2', date: '2025-05-10' },
        { id: 3, title: 'Мероприятие 3', date: '2025-05-20' },
      ];
    },
    getLocations: () => {
      return [
        { id: 1, name: 'Локация 1', capacity: 50 },
        { id: 2, name: 'Локация 2', capacity: 100 },
        { id: 3, name: 'Локация 3', capacity: 30 },
      ];
    },
    getAbout: () => {
      return {
        description: 'Открытый кампус — это пространство для мероприятий, творчества и общения.',
        reviews: [
          { user: 'Иван', text: 'Отличное место для мероприятий!' },
          { user: 'Мария', text: 'Очень уютно, приятно работать.' },
        ],
        gallery: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
      };
    },
    getNews: () => {
      return [
        { id: 1, title: 'Новости 1', content: 'Контент новости 1' },
        { id: 2, title: 'Новости 2', content: 'Контент новости 2' },
      ];
    },
    getEditorAccount: () => {
      return {
        username: 'admin',
        email: 'admin@example.com',
        role: 'редактор',
      };
    }
  };
  
  export default api;
  