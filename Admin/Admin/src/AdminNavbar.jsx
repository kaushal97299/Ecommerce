import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Dropdown, Form, FormControl, Container } from "react-bootstrap";
import { FaUser, FaBars, FaTimes, FaBox, FaClipboardList, FaUsers, FaSearch } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
      <Container fluid>
        {/* Brand / Logo */}
        <Navbar.Brand as={Link} to="#">
          Admin
        </Navbar.Brand>

        {/* Navbar Toggle for Mobile */}
        <Button variant="outline-light" onClick={() => setIsMenuOpen(!isMenuOpen)} className="d-lg-none">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </Button>

        {/* Center - Navigation Menu */}
        <Navbar.Collapse className={`${isMenuOpen ? "show" : ""}`}>
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/AdminUser">
              <FaClipboardList className="me-1" /> Users
            </Nav.Link>
            <Nav.Link as={Link} to="/Orderdet">
              <FaClipboardList className="me-1" /> Orders
            </Nav.Link>
            <Nav.Link as={Link} to="/ClientProduct">
              <FaBox className="me-1" /> Products
            </Nav.Link>
            <Nav.Link as={Link} to="#">
              <FaUsers className="me-1" /> Teams
            </Nav.Link>
          </Nav>

          {/* Search Bar */}
          <Form className="d-flex me-3">
            <FormControl type="search" placeholder="Search..." className="me-2" />
            <Button variant="outline-light">
              <FaSearch />
            </Button>
          </Form>

          {/* Right Section - User Account Dropdown/Login */}
          <div className="d-flex">
            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  {user.name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/ProfileAdmin">Profile</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button as={Link} to="/AdminSignup" variant="outline-light">
                <FaUser />
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
