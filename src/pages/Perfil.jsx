import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
    const { user, updateUser, deleteUser } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || user.name || '',
                email: user.email || '',
                password: '',
                confirmPassword: ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        const dataToSend = {
            username: formData.username,
            email: formData.email
        };

        if (formData.password) {
            dataToSend.password = formData.password;
        }

        updateUser(dataToSend);
        setMessage('Perfil actualizado correctamente.');
        setTimeout(() => setMessage(''), 3000);
    };

    const handleDelete = () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
            deleteUser();
            navigate('/');
        }
    };

    if (!user) return null;

    return (
        <Container className="py-5">
            <Card className="bg-dark text-white border-secondary mx-auto" style={{ maxWidth: '600px' }}>
                <Card.Body className="p-4">
                    <h2 className="text-center mb-4" style={{ color: '#ff9900' }}>Editar Perfil</h2>

                    {message && <Alert variant="success">{message}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre de Usuario</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="bg-secondary text-white border-0"
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="bg-secondary text-white border-0"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Nueva Contraseña (dejar en blanco para mantener la actual)</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="bg-secondary text-white border-0"
                                placeholder="••••••••"
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Confirmar Nueva Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="bg-secondary text-white border-0"
                                placeholder="••••••••"
                            />
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit" className="mb-2">
                                Guardar Cambios
                            </Button>
                            <Button variant="outline-danger" onClick={handleDelete}>
                                Eliminar Cuenta
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Perfil;
