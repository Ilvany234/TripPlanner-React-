import React, { useState } from 'react';
import { Container, Table, Button, Form, Modal } from 'react-bootstrap';

const CrudDestinos = () => {
    const [destinos, setDestinos] = useState([
        { id: 1, nombre: 'París', descripcion: 'La ciudad del amor', precio: 1200 },
        { id: 2, nombre: 'Tokio', descripcion: 'Tecnología y tradición', precio: 1500 },
        { id: 3, nombre: 'Nueva York', descripcion: 'La gran manzana', precio: 1300 },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [currentDestino, setCurrentDestino] = useState({ id: null, nombre: '', descripcion: '', precio: '' });
    const [isEditing, setIsEditing] = useState(false);

    const handleClose = () => {
        setShowModal(false);
        setCurrentDestino({ id: null, nombre: '', descripcion: '', precio: '' });
        setIsEditing(false);
    };

    const handleShow = () => setShowModal(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentDestino({ ...currentDestino, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            setDestinos(destinos.map(d => d.id === currentDestino.id ? currentDestino : d));
        } else {
            setDestinos([...destinos, { ...currentDestino, id: Date.now() }]);
        }
        handleClose();
    };

    const handleEdit = (destino) => {
        setCurrentDestino(destino);
        setIsEditing(true);
        handleShow();
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de eliminar este destino?')) {
            setDestinos(destinos.filter(d => d.id !== id));
        }
    };

    return (
        <Container className="py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Administrar Destinos</h1>
                <Button variant="primary" onClick={handleShow}>
                    Agregar Destino
                </Button>
            </div>

            <div className="table-responsive">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {destinos.map((destino) => (
                            <tr key={destino.id}>
                                <td>{destino.nombre}</td>
                                <td>{destino.descripcion}</td>
                                <td>${destino.precio}</td>
                                <td>
                                    <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(destino)}>
                                        Editar
                                    </Button>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(destino.id)}>
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton className="bg-dark text-white">
                    <Modal.Title>{isEditing ? 'Editar Destino' : 'Nuevo Destino'}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark text-white">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={currentDestino.nombre}
                                onChange={handleChange}
                                required
                                className="bg-secondary text-white border-0"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="descripcion"
                                value={currentDestino.descripcion}
                                onChange={handleChange}
                                required
                                className="bg-secondary text-white border-0"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                name="precio"
                                value={currentDestino.precio}
                                onChange={handleChange}
                                required
                                className="bg-secondary text-white border-0"
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-end">
                            <Button variant="secondary" onClick={handleClose} className="me-2">
                                Cancelar
                            </Button>
                            <Button variant="primary" type="submit">
                                Guardar
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default CrudDestinos;
