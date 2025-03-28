import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home1.css"; // Ensure styles are updated for flex display

const Home1 = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/products/prod");
        const products = response.data || []; // Ensure it's always an array
        const categoryMap = new Map();

        products.forEach((product) => {
          if (!categoryMap.has(product.category)) {
            categoryMap.set(product.category, product.image);
          }
        });

        setCategories([...categoryMap.entries()]); // Convert map to array
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
           <>
              
              <div id="carouselExampleAutoplaying" className="carousel slide" >
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="/src/image/offer.jpg" className="d-block w-100 carousel-img" alt="Offer" />
    </div>
    <div className="carousel-item">
      <img src="/src/image/free.jpg" className="d-block w-100 carousel-img" alt="Free" />
    </div>
    <div className="carousel-item">
      <img src="/src/image/freer.jpg" className="d-block w-100 carousel-img" alt="Freer" />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

    <div className="category-container">
      <h3 className="category-title">Categories</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="category-grid">
          {categories.map(([category, image]) => (
            <div
              key={category}
              className="category-item"
              onClick={() => navigate(`/ProductCardList/${category}`)}
            >
              <img
                src={`http://localhost:4000/uploads/${image}`}
                alt={category}
                className="category-img"
              />
              <span className="category-name">{category}</span>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default Home1;
