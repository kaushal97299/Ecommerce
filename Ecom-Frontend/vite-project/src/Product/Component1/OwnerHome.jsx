import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Card, ListGroup, ProgressBar, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const OwnerHomePage = () => {
  return (
    <Container fluid className="p-4 mt-5">
      {/* Hero Section */}
      <Row className="mb-5 text-center">
        <Col>
          <h1>Welcome, Shop Owner!</h1>
          <p className="lead">Manage your shop, track sales, and oversee operations with ease.</p>
          <Button as={Link} to="/dashboard" variant="primary" size="lg">Go to Dashboard</Button>
        </Col>
      </Row>

      {/* Quick Access Section */}
      <Row className="mb-4">
        {['Manage Products', 'View Orders', 'Customer Insights', 'Sales Reports'].map((section, index) => (
          <Col key={index} md={3} sm={6} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{section}</Card.Title>
                <Card.Text>Access tools to {section.toLowerCase()} instantly.</Card.Text>
                <Button as={Link} to={`/${section.toLowerCase().replace(/ /g, '-')}`} variant="outline-primary">Go</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Sales Overview Section */}
      <Row className="mb-4">
        <Col>
          <h3>Sales Overview</h3>
          <Card className="shadow-sm">
            <Card.Body>
              <h5>Total Sales: $50,000</h5>
              <ProgressBar now={75} label="75% of Goal" animated className="mb-3" />
              <h6>Monthly Target: $65,000</h6>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Notifications Section */}
      <Row className="mb-4">
        <Col>
          <h3>Recent Notifications</h3>
          <ListGroup>
            <ListGroup.Item>New order received: #10234</ListGroup.Item>
            <ListGroup.Item>Low stock alert: Product XYZ</ListGroup.Item>
            <ListGroup.Item>Customer inquiry pending response</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>

      {/* Support Section */}
      <Row className="mt-5 text-center">
        <Col>
          <Alert variant="info">Need assistance? Our support team is here to help 24/7.</Alert>
          <Button variant="outline-secondary">Contact Support</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default OwnerHomePage;
