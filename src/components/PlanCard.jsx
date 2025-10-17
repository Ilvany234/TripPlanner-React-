import React from "react";
import { Card, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const PlanCard = ({ keyName, plan }) => {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>{plan.nombre}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Precio base: ${plan.precio}
        </Card.Subtitle>
        <ListGroup variant="flush" className="mb-3">
          {plan.servicios.map((s, i) => (
            <ListGroup.Item key={i}>
              {s.nombre} — ${s.precio}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Button as={Link} to="/formulario" variant="primary">
          Reservar {plan.nombre}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PlanCard;
