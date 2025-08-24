import React, { useState } from 'react';
import { Container, Card, Button, Form, Alert } from 'react-bootstrap';
import CandidateKanban from './CandidateKanban';

const CandidateKanbanDemo: React.FC = () => {
  const [showKanban, setShowKanban] = useState(false);
  const [positionId, setPositionId] = useState<number>(1);
  const [inputValue, setInputValue] = useState<string>('1');

  const handleShowKanban = () => {
    const id = parseInt(inputValue);
    if (isNaN(id) || id <= 0) {
      alert('Please enter a valid position ID');
      return;
    }
    setPositionId(id);
    setShowKanban(true);
  };

  const handleBack = () => {
    setShowKanban(false);
  };

  if (showKanban) {
    return <CandidateKanban positionId={positionId} onBack={handleBack} />;
  }

  return (
    <Container className="mt-5">
      <Card className="mx-auto" style={{ maxWidth: '500px' }}>
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">Candidate Kanban Demo</h4>
        </Card.Header>
        <Card.Body>
          <Alert variant="info">
            <h6>Demo Instructions:</h6>
            <ul className="mb-0">
              <li>Enter a position ID to view candidates</li>
              <li>Drag and drop candidates between interview stages</li>
              <li>Candidates are sorted by score within each column</li>
              <li>Success messages appear when moving candidates</li>
            </ul>
          </Alert>
          
          <Form.Group className="mb-3">
            <Form.Label>Position ID:</Form.Label>
            <Form.Control
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter position ID (e.g., 1, 2, 3...)"
              min="1"
            />
          </Form.Group>
          
          <div className="d-grid">
            <Button variant="primary" onClick={handleShowKanban}>
              Open Candidate Kanban
            </Button>
          </div>
          
          <hr />
          
          <small className="text-muted">
            <strong>API Endpoints used:</strong><br />
            • GET /positions/&#123;positionId&#125;/interviewflow<br />
            • GET /positions/&#123;positionId&#125;/candidates<br />
            • PUT /candidates/&#123;candidateId&#125; (for stage updates)
          </small>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CandidateKanbanDemo;
