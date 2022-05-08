import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [addFieldData, setAddFieldData] = useState({ name: "", date: "" });
  const [Tasks, setTasks] = useState([]);
  const [isEditTaskData, setEditTaskData] = useState(false);

  useEffect(() => {
    getTaskData();
  }, []);

  function getTaskData() {
    const tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
    setTasks(tasks);
  }

  async function addTask(e) {
    const tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
    addFieldData.id = uuidv4();
    setTasks([...tasks, addFieldData]);
    localStorage.setItem("Tasks", JSON.stringify([...tasks, addFieldData]));
  }

  function inputData(e) {
    e.preventDefault();
    setAddFieldData({ ...addFieldData, [e.target.name]: e.target.value });
  }
  function editTaskData(task) {
    setEditTaskData(true);
    setAddFieldData(task);
  }

  function DeleteTask(key) {
    const tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
    tasks.map((task, i) => {
      if (task.id === key.id) {
        tasks.splice(i, 1);
      }
    });
    localStorage.setItem("Tasks", JSON.stringify(tasks));
    getTaskData();
  }

  function updateTask() {
    const tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
    tasks.map((task) => {
      if (task.id === addFieldData.id) {
        task = Object.assign(task, addFieldData);
      }
    });
    localStorage.setItem("Tasks", JSON.stringify(tasks));
    getTaskData();
  }

  function clearTaskData() {
    localStorage.clear();
    getTaskData();
  }
  return (
    <div className="table">
      <h1>{isEditTaskData ? "Update Task" : "Add Task"}</h1>
      <div className="display-flex flex-direction-column">
        <label>Name</label>
        <input
          name="name"
          type="text"
          value={addFieldData.name}
          onChange={(e) => inputData(e)}
        />
        <label>Date</label>
        <input
          name="date"
          type="date"
          value={addFieldData.date}
          onChange={(e) => inputData(e)}
        />
      </div>
      <button
        className="m-t-10"
        type="submit"
        onClick={(e) => {
          isEditTaskData ? updateTask() : addTask(e);
        }}
      >
        {isEditTaskData ? "Update Task" : "Add Task"}
      </button>

      <div class="display-flex align-center">
        <h1>Tasks</h1>
        <button class="m-l-10" onClick={(e) => clearTaskData()}>
          Clear All Tasks
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Tasks.map((task) => (
            <tr>
              <td>{task.date}</td>
              <td>{task.name}</td>
              <td>
                <button
                  onClick={(e) => {
                    isEditTaskData
                      ? setEditTaskData(false)
                      : editTaskData(task);
                  }}
                >
                  {task.id === addFieldData.id && isEditTaskData
                    ? "Stop Edit"
                    : "Edit"}
                </button>
              </td>
              <td>
                <button onClick={(e) => DeleteTask(task)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
