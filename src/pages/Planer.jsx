import React, { useState, useEffect } from 'react';

const Planer = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  
  
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  
  const addTask = (e) => {
    e.preventDefault();
    if (task) {
      setTasks([...tasks, { task }]);
      setTask('');
      
    }
  };

  
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
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
            <li className='planerLi' key={index}>
              <p>{taskItem.task} - {taskItem.time}</p>
              <button className='buttonLi' onClick={() => deleteTask(index)}>Видалити</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Planer;

