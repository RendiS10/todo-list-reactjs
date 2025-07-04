import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div
      className="sidebar bg-dark text-white vh-100 d-flex flex-column p-3"
      style={{ width: "220px" }}
    >
      <h2 className="mb-4">Todo App</h2>
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/" className="text-white">
          Add Task
        </Nav.Link>
        <Nav.Link as={Link} to="/manage" className="text-white">
          Manage Task
        </Nav.Link>
        <Nav.Link as={Link} to="/checkout" className="text-white">
          Checkout
        </Nav.Link>
      </Nav>
    </div>
  );
}
