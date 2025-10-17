import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PlanCard from "../components/PlanCard";
import { planes } from "../data/planes";

const Home = () => {
  return (
    <Container className="py-5">
      <div className="hero mb-4">
        <h1>Es hora de tu aventura</h1>
        <p>Elige un plan y personaliza tus servicios</p>
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
