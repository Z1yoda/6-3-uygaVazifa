import React, { useState, useEffect } from "react";
import "./Content.css";
import deleteSvg from "../images/delete.svg";

function Content() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [category, setCategory] = useState("All");
  const [checkboxStates, setCheckboxStates] = useState({});

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // console.log(tasks[0].category);
  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  function handleKeyDown(e) {
    if (
      e.key === "Enter" &&
      document.activeElement !== document.querySelector(".add-input")
    ) {
      e.preventDefault();
      if (inputValue.trim() !== "") {
        setTasks((prevTasks) => [...prevTasks, { task: inputValue, category }]);
        setInputValue("");
      }
    }
  }

  function handleIconClick() {
    if (inputValue.trim() !== "") {
      setTasks((prevTasks) => [...prevTasks, { task: inputValue, category }]);
      setInputValue("");
    }
  }

  function deleteItem(index) {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      newTasks.splice(index, 1);
      return newTasks;
    });
  }

  function handleRadio(e) {
    setCategory(e.target.value);
  }

  function handleCheck(index) {
    setCheckboxStates((prevStates) => ({
      ...prevStates,
      [index]: !prevStates[index],
    }));
  }

  function getCheckboxState(index) {
    return checkboxStates[index] || false;
  }

  return (
    <div className="container">
      <div className="left">
        <form className="category">
          <input
            type="radio"
            id="all"
            name="categories"
            value="All"
            onChange={handleRadio}
            checked={category === "All"}
          />
          <label tabIndex="0" htmlFor="all">
            All
          </label>
          <br />
          <input
            type="radio"
            id="groceries"
            name="categories"
            value="Groceries"
            onChange={handleRadio}
            checked={category === "Groceries"}
          />
          <label tabIndex="0" htmlFor="groceries">
            Groceries
          </label>
          <br />
          <input
            type="radio"
            id="college"
            name="categories"
            value="College"
            onChange={handleRadio}
            checked={category === "College"}
          />
          <label tabIndex="0" htmlFor="college">
            College
          </label>
          <br />
          <input
            type="radio"
            id="payments"
            name="categories"
            value="Payments"
            onChange={handleRadio}
            checked={category === "Payments"}
          />
          <label tabIndex="0" htmlFor="payments">
            Payments
          </label>
        </form>
      </div>
      <div className="right">
        <h2>{category}</h2>
        <form onSubmit={handleIconClick}>
          <input
            className="add-input"
            type="text"
            placeholder={`Add a new task inside "${category}" category`}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </form>
        <ul>
          {tasks.map((taskObj, index) => (
            <div
              className="tasks"
              key={index}
              style={{
                display:
                  taskObj.category === category || category === "All"
                    ? "flex"
                    : "none",
              }}
            >
              <input
                className="tasks-input"
                type="checkbox"
                onChange={() => handleCheck(index)}
                checked={getCheckboxState(index)}
              />
              <label
                htmlFor="tasks-input"
                style={{
                  textDecoration: getCheckboxState(index)
                    ? "line-through"
                    : "none",
                }}
              >
                {taskObj.task}
              </label>
              <div className="type" value={taskObj.category}>
                <h4
                  value={
                    taskObj.category === "All"
                      ? "uncatigorized"
                      : taskObj.category
                  }
                >
                  {taskObj.category === "All"
                    ? "uncatigorized"
                    : taskObj.category}
                </h4>
              </div>
              <div className="img">
                <img onClick={() => deleteItem(index)} src={deleteSvg} alt="" />
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Content;
