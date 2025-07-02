import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Checkout({ tasks, onPay }) {
  const [show, setShow] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Filter hanya tugas yang statusnya 'Belum Lunas' dan ada tagihan
  const unpaidTasks = tasks.filter(
    (task) => task.status === "Belum Lunas" && Number(task.pembayaran) > 0
  );

  const handleBayarClick = (task) => {
    setSelectedTask(task);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedTask(null);
  };

  const handleConfirm = () => {
    if (onPay && selectedTask) onPay(selectedTask);
    handleClose();
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Checkout Tagihan</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>No</th>
            <th>Nama Tugas</th>
            <th>Sisa Tagihan</th>
            <th>Opsi</th>
          </tr>
        </thead>
        <tbody>
          {unpaidTasks.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center">
                Tidak ada tagihan
              </td>
            </tr>
          ) : (
            unpaidTasks.map((task, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{task.nama}</td>
                <td>Rp {Number(task.pembayaran).toLocaleString()}</td>
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleBayarClick(task)}
                  >
                    Bayar
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          {selectedTask && (
            <Card>
              <Card.Body>
                <Card.Title>Konfirmasi Pembayaran</Card.Title>
                <Card.Text>
                  Apakah Anda yakin ingin membayar tugas{" "}
                  <b>{selectedTask.nama}</b> sebesar{" "}
                  <b>Rp {Number(selectedTask.pembayaran).toLocaleString()}</b>?
                </Card.Text>
                <div className="d-flex justify-content-end gap-2">
                  <Button variant="secondary" onClick={handleClose}>
                    Batal
                  </Button>
                  <Button variant="success" onClick={handleConfirm}>
                    Konfirmasi Bayar
                  </Button>
                </div>
              </Card.Body>
            </Card>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
