import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import './Footer.css';

function Footer() {
  return (
    <footer className="footer5">
      <div className="container7">
        <div className="row">
          {/* Footer Column 1: Social Media Icons */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="folw">Follow Us</h5>
            <div className="social-iconss">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                <FaFacebook size={30} />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                <FaTwitter size={30} />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                <FaInstagram size={30} />
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-light">
                <FaLinkedin size={30} />
              </Link>
            </div>
          </div>

          {/* Footer Column 2: Website Links */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="folw">Quick Links</h5>
            <ul className="list-unstyledd">
              <li><Link to="/about" className="text-light">About Us</Link></li>
              <li><Link to="/products" className="text-light">Products</Link></li>
              <li><Link to="Grivence" className="text-light">Contact Us</Link></li>
              <li><Link to="/PrivacyPolicy" className="text-light">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Footer Column 3: Company Information */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="folw">Company</h5>
            <p className="text-light">
              Our company is dedicated to providing the best eCommerce experience. We offer Link wide range of products from electronics to fashion.
            </p>
          </div>

          {/* Footer Column 4: Contact Information */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="folw">Contact Information</h5>
            <ul className="list-unstyled">
              <li className="text-light">Phone: +91 892 993 5892</li>
              <li className="text-light">Email: myshopify@example.com</li>
              <li className="text-light">Address: 123 Ecommerce St, City, Country</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="row">
          <div className="col-12 text-center">
            <p className="text-light mb-0">
              &copy; 2025 MyShopify. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
