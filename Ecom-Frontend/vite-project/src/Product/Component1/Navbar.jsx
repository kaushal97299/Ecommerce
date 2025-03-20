import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { Dropdown, Navbar, Nav, Container, Form, Button } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
function Navb() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")) || null);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <Navbar bg="primary" expand="lg" variant="dark" className="px-3">
      <Container fluid>
        {/* Brand */}
        <Navbar.Brand as={Link} to="/">Client</Navbar.Brand>

        {/* Toggle Button for Mobile */}
        <Navbar.Toggle aria-controls="navbarNav" />

        <Navbar.Collapse id="navbarNav">
          {/* Left Side Navigation */}
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/ProductForm">Add Product</Nav.Link>
            <Nav.Link as={NavLink} to="/ProductManagement">Data Show</Nav.Link>
          </Nav>

          {/* Search Bar */}
          <Form className="d-flex me-3">
            <Form.Control type="search" placeholder="Search" className="me-2" />
            <Button variant="light">Search</Button>
          </Form>

          {/* User Dropdown (Right Side) */}
          <div className="ms-auto">
            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  Hey, {user.name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/ProfileClient">Profile</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button as={Link} to="/login" variant="outline-light">
                <FaUser /> Account
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navb;
