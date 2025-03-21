import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Table, Button, Spinner } from 'react-bootstrap';

function Orderdet() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchOrderData();
    }, []);

    const fetchOrderData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:4000/api/orders/Orders");
            console.log("API Response:", response.data);
            setOrders(response.data || []);
        } catch (error) {
            console.error('Error fetching order data:', error.response?.data || error.message);
            toast.error('Failed to fetch order data');
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/orders/${id}`);
            fetchOrderData();
            toast.success('Order deleted successfully');
        } catch (error) {
            console.error('Error deleting order:', error.response?.data || error.message);
            toast.error('Failed to delete order');
        }
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

            <Container className="mt-4">
                <h1 className="text-center mb-4">Order Details</h1>

                {loading ? (
                    <div className="text-center">
                        <Spinner animation="border" variant="primary" />
                        <p>Loading orders...</p>
                    </div>
                ) : (
                    <Table striped bordered hover responsive>
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Mobile</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(orders) && orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order.name}</td>
                                        <td>{order.address}</td>
                                        <td>{order.phone}</td>
                                        <td>
                                            <Button 
                                                variant="danger" 
                                                size="sm" 
                                                onClick={() => handleDelete(order._id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        No orders found
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

export default Orderdet;
