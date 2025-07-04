import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddTask from "../pages/AddTask";
import ManageTask from "../pages/ManageTask";
import Checkout from "../pages/Checkout";
import DetailTask from "../pages/DetailTask";
import NotFound from "../pages/NotFound";
import { Sidebar } from "../components";

const AppRoutes = ({ tasks, addTask, deleteTask, editTask }) => {
  // Fungsi untuk handle pembayaran: set pembayaran jadi 0 dan status jadi Lunas
  const handlePay = (taskToPay) => {
    const idx = tasks.findIndex(
      (t) => t.nama === taskToPay.nama && t.deadline === taskToPay.deadline
    );
    if (idx !== -1) {
      editTask(idx, { ...tasks[idx], pembayaran: 0, status: "Lunas" });
    }
  };
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ marginLeft: 220, flex: 1, width: "100%" }}>
          <Routes>
            <Route path="/" element={<AddTask addTask={addTask} />} />
            <Route
              path="/manage"
              element={
                <ManageTask
                  tasks={tasks}
                  deleteTask={deleteTask}
                  editTask={editTask}
                />
              }
            />
            <Route
              path="/checkout"
              element={<Checkout tasks={tasks} onPay={handlePay} />}
            />
            <Route path="/detail/:id" element={<DetailTask tasks={tasks} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AppRoutes;
