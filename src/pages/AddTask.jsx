import { useState } from "react";

export default function AddTask({ addTask }) {
  const [nama, setNama] = useState("");
  const [deadline, setDeadline] = useState("");
  const [pembayaran, setPembayaran] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nama || !deadline) return;
    const pembayaranValue = pembayaran ? Number(pembayaran) : 0;
    addTask({
      nama,
      deadline,
      pembayaran: pembayaranValue,
      status: pembayaranValue === 0 ? "Lunas" : "Belum Lunas",
    });
    setNama("");
    setDeadline("");
    setPembayaran("");
  };

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="namaTugas" className="form-label">
          Nama Tugas
        </label>
        <input
          type="text"
          className="form-control"
          id="namaTugas"
          placeholder="Masukkan nama tugas"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="deadlineTugas" className="form-label">
          DeadLine Tugas
        </label>
        <input
          type="date"
          className="form-control"
          id="deadlineTugas"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="pembayaran" className="form-label">
          Pembayaran
        </label>
        <input
          type="number"
          className="form-control"
          id="pembayaran"
          placeholder="Masukkan jumlah pembayaran"
          value={pembayaran}
          onChange={(e) => setPembayaran(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Tambah Tugas
      </button>
    </form>
  );
}
