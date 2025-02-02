import React, { useState } from 'react';

const Planer = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [time, setTime] = useState('');
  
  // Функция для добавления задачи
  const addTask = (e) => {
    e.preventDefault();
    if (task ) {
      setTasks([...tasks, { task,  }]);
      setTask('');

    }
  };

  // Функция для удаления задачи
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div>
      <h2>Планировщик задач</h2>
      <form onSubmit={addTask}>
        <label>
          Задача:
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Введите задачу"
          />
        </label>
        
        <button type="submit">Добавить задачу</button>
      </form>

      <h3>Список задач</h3>
      {tasks.length === 0 ? (
        <p>Задач нет</p>
      ) : (
        <ul>
          {tasks.map((taskItem, index) => (
            <li key={index}>
              <p>{taskItem.task} - {taskItem.time}</p>
              <button onClick={() => deleteTask(index)}>Удалить</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Planer;
