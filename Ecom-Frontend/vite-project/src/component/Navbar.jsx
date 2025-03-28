import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

const Navbar1 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites")) || []);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
  }, [isMenuOpen]);

  useEffect(() => {
    const updateStorage = () => {
      setCartItems(JSON.parse(localStorage.getItem("cart")) || []);
      setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
    };

    window.addEventListener("storage", updateStorage);
    return () => window.removeEventListener("storage", updateStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
    window.location.reload();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${searchQuery}`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">MyShopify</Link>

        {/* Mobile Menu Toggle */}
        <button className="navbar-toggler" type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navbar Links */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}>
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/ProductCardList">All Products</Link></li>

            {/* Watching (Previously Favorites) */}
            <li className="nav-item position-relative">
              <Link className="nav-link" to="/favorites">
                Watching
                {favorites.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {favorites.length}
                  </span>
                )}
              </Link>
            </li>
          </ul>

          {/* Search Bar (Centered) */}
          <form className="d-flex mx-auto" onSubmit={handleSearch} style={{ maxWidth: "300px" }}>
            <input 
              className="form-control me-2" 
              type="search" 
              placeholder="Search Products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-light" type="submit">Search</button>
          </form>

          {/* Cart & User Section (Right-Aligned) */}
          <ul className="navbar-nav ms-auto">
            {/* Cart Icon */}
            <li className="nav-item position-relative me-3">
              <Link className="nav-link" to="/cart">
                <FaShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </li>

            {/* User Dropdown */}
            <li className="nav-item">
              {user ? (
                <Dropdown>
                  <Dropdown.Toggle variant="secondary">Hey, {user.name}</Dropdown.Toggle>
                  <Dropdown.Menu align="end">
                    <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Link className="nav-link" to="/login">
                  <FaUser size={20} className="me-1" /> Account
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
