import React, { useState, useEffect } from 'react';

const Planer = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  // Загружаем задачи из localStorage при монтировании компонента
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Функция для добавления новой задачи
  const addTask = (e) => {
    e.preventDefault();
    if (task) {
      const newTask = { task, time: new Date().toLocaleTimeString() };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      // Сохраняем обновленный список в localStorage
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTask('');
    }
  };

  // Функция для удаления задачи
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    // Сохраняем обновленный список в localStorage после удаления
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  return (
    <div>
      <h2>Планировщик завдань</h2>
      <form onSubmit={addTask}>
        <label>
          Задача:
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Введiть задачу"
          />
        </label>
        <button type="submit">Додати задачу</button>
      </form>

      <h3>Список завдань</h3>
      {tasks.length === 0 ? (
        <p>Задач нет</p>
      ) : (
        <ul>
          {tasks.map((taskItem, index) => (
            <li className="planerLi" key={index}>
              <p>{taskItem.task} - {taskItem.time}</p>
              <button className="buttonLi" onClick={() => deleteTask(index)}>Видалити</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Planer;
