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
    if (!addFieldData.name || !addFieldData.date) {
      console.log(addFieldData.name, addFieldData.date);
      if (!addFieldData.name) {
        let name = document.getElementById("name");
        name.style.border = "1px solid red";
      }
      if (!addFieldData.date) {
        let date = document.getElementById("date");
        date.style.border = "1px solid red";
      }
    } else {
      const tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
      addFieldData.id = uuidv4();
      addFieldData.taskDone = false;
      setTasks([...tasks, addFieldData]);
      localStorage.setItem("Tasks", JSON.stringify([...tasks, addFieldData]));
      setAddFieldData({ name: "", date: "" });
    }
  }

  function inputData(e) {
    e.preventDefault();
    if (e.target.name === "name") {
      let name = document.getElementById("name");
      if (name) name.style.border = "none";
    }
    if (e.target.name === "date") {
      let date = document.getElementById("date");
      if (date) date.style.border = "none";
    }
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
    setEditTaskData(false);
    setAddFieldData({ name: "", date: "" });
    getTaskData();
  }

  function checkTaskDone(e, markDonetask) {
    const tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
    tasks.map((task) => {
      if (task.id === markDonetask.id) {
        e.target.checked ? (task.taskDone = true) : (task.taskDone = false);
      }
    });
    localStorage.setItem("Tasks", JSON.stringify(tasks));
    getTaskData();
  }
  return (
    <div className="table">
      <h1>{isEditTaskData ? "Update Task" : "Add Task"}</h1>
      <div className="display-flex flex-direction-column">
        <label>Name</label>
        <input
          name="name"
          id="name"
          type="text"
          value={addFieldData.name}
          onChange={(e) => inputData(e)}
        />
        <label>Date</label>
        <input
          name="date"
          type="date"
          id="date"
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

      <div className="display-flex align-center">
        <h1>Tasks yet to be completed</h1>
        <button className="m-l-10" onClick={(e) => clearTaskData()}>
          Clear All Tasks
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Mark Done</th>
            <th>Name</th>
            <th>Date</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Tasks.map(
            (task) =>
              !task.taskDone && (
                <tr key={task.id}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={(e) => checkTaskDone(e, task)}
                      checked={task.taskDone ? true : false}
                    />
                  </td>
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
              )
          )}
        </tbody>
      </table>

      <h1>Tasks done</h1>
      <table>
        <thead>
          <tr>
            <th>Mark Done</th>
            <th>Name</th>
            <th>Date</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Tasks.map(
            (task) =>
              task.taskDone && (
                <tr key={task.id}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={(e) => checkTaskDone(e, task)}
                      checked={task.taskDone ? true : false}
                    />
                  </td>
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
              )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
