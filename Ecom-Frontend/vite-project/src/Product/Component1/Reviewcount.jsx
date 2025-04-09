// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const ReviewList = () => {
//   const { productId } = useParams();
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // Fetch reviews for the product
//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/api/reviews/rew`);
//         setReviews(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch reviews. Please try again later.');
//         setLoading(false);
//         console.error('Error fetching reviews:', err);
//       }
//     };

//     fetchReviews();
//   }, [productId]);

//   if (loading) {
//     return <div>Loading reviews...</div>;
//   }

//   if (error) {
//     return <div className="error-message">{error}</div>;
//   }

//   return (
//     <div className="reviews-container">
//       <h3>Customer Reviews</h3>
      
//       {reviews.length === 0 ? (
//         <p>No reviews yet for this product.</p>
//       ) : (
//         <div className="reviews-list">
//           {reviews.map(review => (
//             <div key={review._id} className="review-item">
//               <div className="review-header">
//                 <h4>{review.userName || 'Anonymous'}</h4>
//                 <div className="review-rating">
//                   {Array.from({ length: 5 }).map((_, i) => (
//                     <span key={i} className={i < review.rating ? 'star-filled' : 'star-empty'}>
//                       ★
//                     </span>
//                   ))}
//                 </div>
//                 <span className="review-date">
//                   {new Date(review.createdAt).toLocaleDateString()}
//                 </span>
//               </div>
//               <p className="review-text">{review.text}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReviewList;