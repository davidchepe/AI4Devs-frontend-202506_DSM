import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

type Position = {
    id: number;
    title: string;
    manager: string;
    deadline: string;
    status: 'Abierto' | 'Contratado' | 'Cerrado' | 'Borrador';
    description?: string;
    isActive: boolean;
};

const EnhancedPositions: React.FC = () => {
    const navigate = useNavigate();
    const [positions, setPositions] = useState<Position[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchFilters, setSearchFilters] = useState({
        title: '',
        date: '',
        status: '',
        manager: ''
    });

    // Mock data with IDs for demonstration
    const mockPositions: Position[] = [
        { 
            id: 1, 
            title: 'Senior Backend Engineer', 
            manager: 'John Doe', 
            deadline: '2024-12-31', 
            status: 'Abierto',
            description: 'Senior backend position requiring 5+ years experience',
            isActive: true
        },
        { 
            id: 2, 
            title: 'Junior Android Engineer', 
            manager: 'Jane Smith', 
            deadline: '2024-11-15', 
            status: 'Contratado',
            description: 'Entry-level Android development position',
            isActive: false
        },
        { 
            id: 3, 
            title: 'Product Manager', 
            manager: 'Alex Jones', 
            deadline: '2024-07-31', 
            status: 'Borrador',
            description: 'Product management role for fintech products',
            isActive: true
        }
    ];

    useEffect(() => {
        loadPositions();
    }, []);

    const loadPositions = async () => {
        try {
            setLoading(true);
            // In a real implementation, this would fetch from the backend
            // const response = await fetch('http://localhost:3010/positions');
            // const data = await response.json();
            // setPositions(data);
            
            // For now, using mock data
            setTimeout(() => {
                setPositions(mockPositions);
                setLoading(false);
            }, 500);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load positions');
            setLoading(false);
        }
    };

    const handleViewProcess = (positionId: number) => {
        console.log('Navigating to position:', positionId);
        navigate(`/positions/${positionId}/candidates`);
    };

    const handleFilterChange = (field: string, value: string) => {
        setSearchFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const filteredPositions = positions.filter(position => {
        return (
            (!searchFilters.title || position.title.toLowerCase().includes(searchFilters.title.toLowerCase())) &&
            (!searchFilters.status || position.status === searchFilters.status) &&
            (!searchFilters.manager || position.manager.toLowerCase().includes(searchFilters.manager.toLowerCase()))
        );
    });

    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p className="mt-2">Loading positions...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">
                    <Alert.Heading>Error</Alert.Heading>
                    {error}
                    <hr />
                    <Button variant="outline-danger" onClick={loadPositions}>
                        Try Again
                    </Button>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Posiciones</h2>
            
            {/* Filters */}
            <Row className="mb-4">
                <Col md={3}>
                    <Form.Control 
                        type="text" 
                        placeholder="Buscar por título" 
                        value={searchFilters.title}
                        onChange={(e) => handleFilterChange('title', e.target.value)}
                    />
                </Col>
                <Col md={3}>
                    <Form.Control 
                        type="date" 
                        placeholder="Buscar por fecha"
                        value={searchFilters.date}
                        onChange={(e) => handleFilterChange('date', e.target.value)}
                    />
                </Col>
                <Col md={3}>
                    <Form.Control 
                        as="select"
                        value={searchFilters.status}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                    >
                        <option value="">Estado</option>
                        <option value="Abierto">Abierto</option>
                        <option value="Contratado">Contratado</option>
                        <option value="Cerrado">Cerrado</option>
                        <option value="Borrador">Borrador</option>
                    </Form.Control>
                </Col>
                <Col md={3}>
                    <Form.Control 
                        as="select"
                        value={searchFilters.manager}
                        onChange={(e) => handleFilterChange('manager', e.target.value)}
                    >
                        <option value="">Manager</option>
                        <option value="John Doe">John Doe</option>
                        <option value="Jane Smith">Jane Smith</option>
                        <option value="Alex Jones">Alex Jones</option>
                    </Form.Control>
                </Col>
            </Row>

            {/* Position Cards */}
            <Row>
                {filteredPositions.map((position) => (
                    <Col md={4} key={position.id} className="mb-4">
                        <Card className="shadow-sm h-100">
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>{position.title}</Card.Title>
                                <Card.Text className="flex-grow-1">
                                    <strong>Manager:</strong> {position.manager}<br />
                                    <strong>Deadline:</strong> {position.deadline}<br />
                                    {position.description && (
                                        <>
                                            <strong>Description:</strong> {position.description}
                                        </>
                                    )}
                                </Card.Text>
                                <div className="mb-3">
                                    <span className={`badge ${
                                        position.status === 'Abierto' ? 'bg-warning' : 
                                        position.status === 'Contratado' ? 'bg-success' : 
                                        position.status === 'Borrador' ? 'bg-secondary' : 'bg-danger'
                                    } text-white`}>
                                        {position.status}
                                    </span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <Button 
                                        variant="primary" 
                                        onClick={() => handleViewProcess(position.id)}
                                        disabled={false}
                                    >
                                        Ver proceso
                                    </Button>
                                    <Button variant="secondary">Editar</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {filteredPositions.length === 0 && (
                <Row>
                    <Col className="text-center">
                        <Alert variant="info">
                            No se encontraron posiciones que coincidan con los filtros.
                        </Alert>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default EnhancedPositions;
