// Halaman untuk menampilkan detail task berdasarkan id
import React from "react";
import { useParams } from "react-router-dom";

const DetailTask = ({ tasks }) => {
  const { id } = useParams();
  const task = tasks && tasks[parseInt(id, 10)];

  if (!task) {
    return <div>Task tidak ditemukan.</div>;
  }

  return (
    <div>
      <h2>Detail Task</h2>
      <p>
        <b>Nama:</b> {task.nama}
      </p>
      <p>
        <b>Deadline:</b> {task.deadline}
      </p>
      <p>
        <b>Status:</b> {task.status}
      </p>
      <p>
        <b>Pembayaran:</b> {task.pembayaran}
      </p>
    </div>
  );
};

export default DetailTask;
