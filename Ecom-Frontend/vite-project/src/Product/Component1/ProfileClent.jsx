import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    dob: "",
    address: "",
    profileImage: null,
  });
  
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Handle input change
  const handleChange = (e) => {
    if (e.target.name === "profileImage") {
      setUser({ ...user, profileImage: e.target.files[0] });
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  // Handle profile update
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("phone", user.phone);
      formData.append("dob", user.dob);
      formData.append("address", user.address);
      if (user.profileImage) {
        formData.append("profileImage", user.profileImage);
      }

      const response = await fetch("http://localhost:4000/api/auth/profileupdate", {
        method: "POST",
        body: formData, // Use FormData, no need for JSON headers
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(result.user)); // Update local storage
        setUser(result.user);
        setIsEditing(false);
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile.");
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-sm p-4">
            <Card.Body>
              <Card.Title className="text-center mb-4">Profile Page</Card.Title>
              {isEditing ? (
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Profile Image</Form.Label>
                    <Form.Control type="file" name="profileImage" onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={user.name} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" name="phone" value={user.phone} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" name="dob" value={user.dob} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" value={user.address} onChange={handleChange} />
                  </Form.Group>
                  <Button variant="primary" onClick={handleUpdate} className="me-2">
                    Update
                  </Button>
                  <Button variant="secondary" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </Form>
              ) : (
                <>
                  {user.profileImage && (
                    <Card.Text className="pro-img">
                       <img  src={`http://localhost:4000/${user.profileImage}`} alt="Profile" />
                      
                    </Card.Text>
                  )}
                  <Card.Text><strong>Name:</strong> {user.name}</Card.Text>
                  <Card.Text><strong>Email:</strong> {user.email}</Card.Text>
                  <Card.Text><strong>Phone:</strong> {user.phone}</Card.Text>
                  <Card.Text><strong>D.O.B.:</strong> {user.dob}</Card.Text>
                  <Card.Text><strong>Address:</strong> {user.address}</Card.Text>
                  <Card.Text><strong>Role:</strong> {user.role}</Card.Text>
                  <Button variant="primary" onClick={() => setIsEditing(true)}>Edit</Button>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
