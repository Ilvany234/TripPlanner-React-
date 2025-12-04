import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import PlanCard from "../components/PlanCard";
import { planes } from "../data/planes";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();
  return (
    <Container className="py-5">
      <div className="hero mb-4">
        <h1>Es hora de tu aventura</h1>
        <p>Elige un plan y personaliza tus servicios</p>
        {user && (
          <Link to="/admin-destinos" className="btn btn-primary mt-3" style={{ textDecoration: 'none', marginTop: '1rem', display: 'inline-block' }}>Administrar Destinos</Link>
        )}
      </div>

      <Row>
        {Object.entries(planes).map(([key, plan]) => (
          <Col md={4} key={key}>
            <PlanCard keyName={key} plan={plan} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
