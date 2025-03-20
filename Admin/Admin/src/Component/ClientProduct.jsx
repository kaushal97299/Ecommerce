import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Table, Button, Spinner } from 'react-bootstrap';

function ClientProduct() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProductData();
    }, []);

    const fetchProductData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:4000/api/products/prod");
            console.log("API Response:", response.data);
            setProducts(response.data || []);
        } catch (error) {
            console.error('Error fetching product data:', error.response?.data || error.message);
            toast.error('Failed to fetch product data');
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/products/${id}`);
            fetchProductData();
            toast.success('Product deleted successfully');
        } catch (error) {
            console.error('Error deleting product:', error.response?.data || error.message);
            toast.error('Failed to delete product');
        }
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

            <Container className="mt-4">
                <h1 className="text-center mb-4">Product Details</h1>

                {loading ? (
                    <div className="text-center">
                        <Spinner animation="border" variant="primary" />
                        <p>Loading products...</p>
                    </div>
                ) : (
                    <Table striped bordered hover responsive>
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Model</th>
                                <th>Discount</th>
                                <th>Final Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(products) && products.length > 0 ? (
                                products.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product.name}</td>
                                        <td>${product.price}</td>
                                        <td>{product.model}</td>
                                        <td>{product.discount}%</td>
                                        <td>${product.finalPrice}</td>
                                        <td>
                                            <Button 
                                                variant="danger" 
                                                size="sm" 
                                                onClick={() => handleDelete(product._id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        No products found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                )}
            </Container>
        </>
    );
}

export default ClientProduct;
