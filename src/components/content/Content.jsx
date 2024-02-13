import React, { useState, useEffect } from 'react';
import './Content.css';
import deleteSvg from '../images/delete.svg';
import add from '../images/add-button.svg';

function Content() {
  const [inputValue, setInputValue] = useState('');
    const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  function handleKeyDown(e) {
    
    if (e.key === 'Enter' && document.activeElement !== document.querySelector('.add-input')) {
      e.preventDefault(); 
      if (inputValue.trim() !== '') {
        setTasks((prevTasks) => [...prevTasks, inputValue]);
        setInputValue('');
      }
    }
  }

  function handleIconClick() {
    if (inputValue.trim() !== '') {
      setTasks((prevTasks) => [...prevTasks, inputValue]);
      setInputValue('');
    }
    }
 function deleteItem(index) {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      newTasks.splice(index, 1);
          return newTasks;
    });
    }
    
  return (
    <div className="container">
      <div className="left">
        <h4>All <span><img className='addCategory' src={add} alt="" /></span></h4>
        <ul>
          <li>Groceries</li>
          <li>College</li>
          <li>Payments</li>
        </ul>
      </div>
      <div className="right">
        <h2>All Tasks</h2>
        <input
          className='add-input'
          type="text"
          placeholder='Add a new task inside "All" category'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <img className='addButton' onClick={handleIconClick} src={add} alt="Add Task" />
        <ul>
          {tasks.map((task, index) => (
            <div className="tasks" key={index}>
              <input className='tasks-input' type="checkbox" />
              <li>{task}</li>
              <select>
                <option value="Groceries">Groceries</option>
                <option value="College">College</option>
                <option value="Payments">Payments</option>      
              </select>
              <div onClick={() => deleteItem(index)} className="img">
                <img src={deleteSvg} alt="" />
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Content;


