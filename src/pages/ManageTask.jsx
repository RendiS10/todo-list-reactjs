import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

export default function ManageTask({ tasks, deleteTask, editTask }) {
  const [editIdx, setEditIdx] = useState(null);
  const [editData, setEditData] = useState({
    nama: "",
    deadline: "",
    pembayaran: 0,
    status: "Belum Lunas",
  });

  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditData(tasks[idx]);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => {
      let newData = { ...prev, [name]: value };
      // Otomatis update status berdasarkan pembayaran
      newData.status =
        Number(newData.pembayaran) === 0 ? "Lunas" : "Belum Lunas";
      return newData;
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Pastikan status juga diupdate saat submit
    const updatedData = {
      ...editData,
      status: Number(editData.pembayaran) === 0 ? "Lunas" : "Belum Lunas",
    };
    editTask(editIdx, updatedData);
    setEditIdx(null);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Daftar Tugas</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>No</th>
            <th>Nama Tugas</th>
            <th>Tanggal Deadline</th>
            <th>Pembayaran</th>
            <th>Status</th>
            <th>Opsi</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, idx) =>
            editIdx === idx ? (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>
                  <input
                    name="nama"
                    value={editData.nama}
                    onChange={handleEditChange}
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    name="deadline"
                    type="date"
                    value={editData.deadline}
                    onChange={handleEditChange}
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    name="pembayaran"
                    type="number"
                    value={editData.pembayaran}
                    className="form-control"
                    disabled
                  />
                </td>
                <td>
                  <input
                    name="status"
                    value={editData.status}
                    className="form-control"
                    disabled
                  />
                </td>
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    className="me-2"
                    onClick={handleEditSubmit}
                  >
                    Simpan
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setEditIdx(null)}
                  >
                    Batal
                  </Button>
                </td>
              </tr>
            ) : (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{task.nama}</td>
                <td>{task.deadline}</td>
                <td>{task.pembayaran}</td>
                <td>
                  <Badge bg={task.status === "Lunas" ? "success" : "secondary"}>
                    {task.status}
                  </Badge>
                </td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(idx)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteTask(idx)}
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </div>
  );
}
