import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PersonCircle } from "react-bootstrap-icons";

const SiteNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/">TripPlanner</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={NavLink} to="/">Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/formulario">Reservar</Nav.Link>
            <Nav.Link as={NavLink} to="/comentarios">Comentarios</Nav.Link>
            {user && (
              <>
                <Nav.Link as={NavLink} to="/admin-destinos" className="btn btn-outline-warning text-white me-2">Administrar Destinos</Nav.Link>
                <Nav.Link as={NavLink} to="/perfil" className="btn btn-primary text-white px-3 py-2 rounded-3 me-2 d-flex align-items-center gap-2">
                  <PersonCircle size={20} />
                  <span>{user.username || user.name || 'Perfil'}</span>
                </Nav.Link>
              </>
            )}
            {user ? (
              <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer' }}>Cerrar Sesión</Nav.Link>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" className="me-2">Iniciar Sesión</Nav.Link>
                <Nav.Link as={NavLink} to="/register" className="btn-primary text-white px-3 py-2 rounded-3">Registrarse</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default SiteNavbar;
