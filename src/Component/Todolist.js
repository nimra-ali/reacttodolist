import React, { useState, useEffect } from 'react';
import '../Component/style/todoui.css'

const Todolist = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);

  useEffect(() => {
    // Load tasks from local storage on component mount
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    // Save tasks to local storage whenever tasks change
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!taskName || !taskDescription) {
      alert('Please enter both task name and description.');
      return;
    }

    if (editingTaskIndex !== null) {
      // If editing, update the existing task
      const updatedTasks = [...tasks];
      updatedTasks[editingTaskIndex] = { name: taskName, description: taskDescription };
      setTasks(updatedTasks);
      setEditingTaskIndex(null);
    } else {
      // If not editing, add a new task
      setTasks([...tasks, { name: taskName, description: taskDescription }]);
    }

    // Clear form fields
    setTaskName('');
    setTaskDescription('');
  };

  const editTask = (index) => {
    const taskToEdit = tasks[index];
    setTaskName(taskToEdit.name);
    setTaskDescription(taskToEdit.description);
    setEditingTaskIndex(index);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    setEditingTaskIndex(null);
  };

  return (
    <div>
      <h1>To-Do-App</h1>
      <img />
    <div className="todo-container">
      <form className="task-form">
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <button type="button" onClick={addTask}>
          {editingTaskIndex !== null ? 'Update Task' : 'Add Task'}
        </button>
      </form>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <span>{`${task.name} - ${task.description}`}</span>
            <div style={{display:'flex'}}>

            <button className="edit-btn" onClick={() => editTask(index)}>
              Edit
            </button>
            <button className="delete-btn" onClick={() => deleteTask(index)}>
              Delete
            </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default Todolist;
