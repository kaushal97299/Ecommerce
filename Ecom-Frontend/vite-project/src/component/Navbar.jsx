import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

const Navbar1 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
  }, [isMenuOpen]);

  useEffect(() => {
    const updateCartCount = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(updatedCart);
    };

    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
    window.location.reload();
  };

  return (
    
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand" to="/">MyShopify</Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Collapsible Menu */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="navbarNav">
          {/* Links */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favorites">Products</Link>
            </li>
          </ul>

          {/* Search Bar */}
          <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
            <input className="form-control me-2" type="search" placeholder="Search" name="search" />
            <button className="btn btn-outline-light" type="submit">Search</button>
          </form>

          {/* Cart and User Section */}
          <ul className="navbar-nav ms-3">
            {/* Cart Icon */}
            <li className="nav-item position-relative">
              <Link className="nav-link" to="/cart">
                <FaShoppingCart />
                {cartItems.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </li>

            {/* User Dropdown */}
            <li className="nav-item ms-3">
              {user ? (
                <Dropdown align="end">
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Hey, {user.name}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Link className="nav-link" to="/login">
                  <FaUser /> Account
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar1;