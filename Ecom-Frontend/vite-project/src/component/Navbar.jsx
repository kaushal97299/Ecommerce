import { useState, useEffect , useContext,  } from "react";
import { Link, useNavigate } from "react-router-dom";
import {cartContext} from "./Cart/CartContext";
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaHeart } from "react-icons/fa"; // Added FaHeart for Favorites
import Dropdown from "react-bootstrap/Dropdown";
import "./Navbar.css";

const Navbar1 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState(()=> JSON.parse(localStorage.getItem("cart"))  ||[]);
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites")) || []);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
  }, [isMenuOpen]);

  const { cart } = useContext(cartContext);
  useEffect(() => {

    setCartItems(cart)
  }, [cart]);

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
    <nav className="navb">
      <div className="contat">
        <Link className="navbar-brand" to="/">Flipzon </Link>

        {/* Mobile Menu Toggle */}
        <button className="navbar-toggler" type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navbar Links */}
        <div className={`navbar-collapse ${isMenuOpen ? "show" : ""}`}>
          <ul className="nav-ul">
            <li className="itemm"><Link className="nav-link" to="/">Home</Link></li>
            <li className="itemm"><Link className="nav-link" to="/about">About</Link></li>
            <li className="itemm"><Link className="nav-link" to="/ProductCardList">All Products</Link></li>
          </ul>

          {/* Search Bar (Centered) */}
          <form className="searchbar" onSubmit={handleSearch}>
            <input 
              className="searchinput" 
              type="search" 
              placeholder="Search Products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="buttonserch" type="submit">Search</button>
          </form>

          {/* Favorites Section (Updated with Icon) */}
                {/* Cart & User Section (Right-Aligned) */}
                <ul className="nav-ul">
          
            <li className="itemm">
              <Link className="nav-link" to="/favorites">
                <FaHeart size={18} style={{ color: "red", marginRight: "5px" }} /> {/* Added Heart Icon */}
                {favorites.length > 0 && (
                  <span className="badge">
                    {favorites.length}
                  </span>
                )}
              </Link>
            </li>
          

            {/* Cart Icon */}
            <li className="itemm">
              <Link className="nav-link" to="/cart">
                <FaShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <span className="badge">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </li>

            {/* User Dropdown */}
            <li className="nav-item">
              {user ? (
                <Dropdown>
                  <Dropdown.Toggle className="dropdown-toggle">Hey, {user.name}</Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu">
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
