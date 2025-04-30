function RecentChanges() {
  const changes = [
    { title: "Добавлено новое мероприятие: Лекция об экологии", date: "2025-04-20" },
    { title: "Изменена новость: Открытие нового пространства", date: "2025-04-18" },
  ];

  return (
    <div className="mb-4">
      <h3>Последние изменения</h3>
      <ul className="list-unstyled">
        {changes.map((change, index) => (
          <li key={index} className="mb-2">
            <strong>{change.title}</strong> <br />
            <small className="text-muted">{change.date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentChanges;

  