import { useState } from "react";

const ToDo = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Add a new task or save an edited task
  function add() {
    if (task.trim() === "") {
      alert("Write something");
      return;
    }

    if (editIndex !== null) {
      setTasks(
        tasks.map((item, index) =>
          index === editIndex ? task : item
        )
      );

      setEditIndex(null);
    } else {
      setTasks([...tasks, task]);
    }

    setTask("");
  }

  // Delete a task
  function remove(indexToDelete) {
    setTasks(
      tasks.filter((item, index) => index !== indexToDelete)
    );

    if (editIndex === indexToDelete) {
      setEditIndex(null);
      setTask("");
    } else if (editIndex !== null && editIndex > indexToDelete) {
      setEditIndex(editIndex - 1);
    }
  }

  // Load a task into the input for editing
  function edit(index) {
    setTask(tasks[index]);
    setEditIndex(index);
  }

  return (
    <div>
      <h1>My Tasks</h1>

      <input
        type="text"
        value={task}
        placeholder="Write a task"
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={add}>
        {editIndex !== null ? "Save" : "Add"}
      </button>

      <ul>
        {tasks.map((item, index) => (
          <li key={index}>
            {item}{" "}

            <button onClick={() => edit(index)}>
              Edit
            </button>

            <button onClick={() => remove(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDo;
