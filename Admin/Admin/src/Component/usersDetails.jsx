import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Table, Button, Spinner } from 'react-bootstrap';

function AdminUser() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("https://ecommerce-atbk.onrender.com/api/auth/users");
            setUsers(response.data.users || []);
        } catch (error) {
            console.error('Error fetching user data:', error.response?.data || error.message);
            toast.error('Failed to fetch user data');
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://ecommerce-atbk.onrender.com/api/auth/${id}`);
            fetchUserData();
            toast.success('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error.response?.data || error.message);
            toast.error('Failed to delete user');
        }
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

            <Container className="mt-4">
                <h1 className="text-center mb-4">User Details</h1>

                {loading ? (
                    <div className="text-center">
                        <Spinner animation="border" variant="primary" />
                        <p>Loading users...</p>
                    </div>
                ) : (
                    <Table striped bordered hover responsive>
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(users) && users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.gender}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <Button 
                                                variant="danger" 
                                                size="sm" 
                                                onClick={() => handleDelete(user._id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        No users found
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

export default AdminUser;
