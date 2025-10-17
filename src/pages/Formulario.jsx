import React, { useEffect, useState } from "react";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import ServiceList from "../components/ServiceList";
import { planes as planesData } from "../data/planes";

const Formulario = () => {
  const [planes, setPlanes] = useState({});
  const [loading, setLoading] = useState(true);
  const [planKey, setPlanKey] = useState("naturaleza");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [selectedServices, setSelectedServices] = useState(new Set());
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Simula fetch (puedes cambiar por una API real)
    setTimeout(() => {
      setPlanes(planesData);
      setLoading(false);
    }, 200);
  }, []);

  useEffect(() => setSelectedServices(new Set()), [planKey]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const plan = planes[planKey];
    const servicios = Array.from(selectedServices).map((i) => plan.servicios[i]);
    const total = plan.precio + servicios.reduce((sum, s) => sum + s.precio, 0);

    alert(`Reserva enviada. Total: $${total}`);
    setSubmitted(true);
  };

  if (loading)
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );

  const plan = planes[planKey];

  return (
    <Container className="py-5">
      <h2>Formulario de Reserva</h2>
      {submitted && <Alert variant="success">Reserva enviada correctamente.</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Plan</Form.Label>
          <Form.Select value={planKey} onChange={(e) => setPlanKey(e.target.value)}>
            {Object.entries(planes).map(([k, p]) => (
              <option key={k} value={k}>{p.nombre}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <div className="mb-3">
          <h5>Servicios disponibles</h5>
          <ServiceList
            services={plan.servicios}
            selected={selectedServices}
            onChange={setSelectedServices}
          />
        </div>
        <div className="mb-3">
          <strong>
            Total estimado: $
            {plan.precio +
              Array.from(selectedServices).reduce((a, i) => a + plan.servicios[i].precio, 0)}
          </strong>
        </div>
        <Button type="submit" variant="primary">Enviar Reserva</Button>
      </Form>
    </Container>
  );
};

export default Formulario;
