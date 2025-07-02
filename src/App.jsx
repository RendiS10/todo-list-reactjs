import { useState } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  const deleteTask = (idx) => {
    setTasks((prev) => prev.filter((_, i) => i !== idx));
  };

  const editTask = (idx, newTask) => {
    setTasks((prev) => prev.map((task, i) => (i === idx ? newTask : task)));
  };

  return (
    <AppRoutes
      tasks={tasks}
      addTask={addTask}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  );
}

export default App;
