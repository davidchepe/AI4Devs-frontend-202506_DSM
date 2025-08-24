import React, { useState, useEffect } from 'react';
import { Container, Row, Alert, Spinner, Button } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import KanbanColumn from './KanbanColumn';
import { 
  Candidate, 
  InterviewStep, 
  CandidatesByStep, 
  PositionInterviewFlow 
} from '../types/kanban.types';
import { 
  getPositionInterviewFlow, 
  getPositionCandidates, 
  updateCandidateStage 
} from '../services/positionService';

interface CandidateKanbanProps {
  positionId: number;
  onBack: () => void;
}

const CandidateKanban: React.FC<CandidateKanbanProps> = ({ positionId, onBack }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [positionData, setPositionData] = useState<PositionInterviewFlow | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [candidatesByStep, setCandidatesByStep] = useState<CandidatesByStep>({});
  const [draggedCandidate, setDraggedCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    loadData();
  }, [positionId]);

  useEffect(() => {
    if (positionData && candidates.length > 0) {
      groupCandidatesByStep();
    }
  }, [positionData, candidates]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [flowData, candidatesData] = await Promise.all([
        getPositionInterviewFlow(positionId),
        getPositionCandidates(positionId)
      ]);
      
      setPositionData(flowData);
      setCandidates(candidatesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const groupCandidatesByStep = () => {
    if (!positionData) return;

    const grouped: CandidatesByStep = {};
    
    // Initialize all steps with empty arrays
    positionData.interviewFlow.interviewSteps.forEach(step => {
      grouped[step.name] = [];
    });

    // Group candidates by their current step
    candidates.forEach(candidate => {
      if (grouped[candidate.currentInterviewStep]) {
        grouped[candidate.currentInterviewStep].push(candidate);
      }
    });

    setCandidatesByStep(grouped);
  };

  const handleDragStart = (e: React.DragEvent<HTMLElement>, candidate: Candidate) => {
    setDraggedCandidate(candidate);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e: React.DragEvent<HTMLElement>, targetStep: InterviewStep) => {
    e.preventDefault();
    
    if (!draggedCandidate || !positionData) return;

    // Don't do anything if dropping on the same step
    if (draggedCandidate.currentInterviewStep === targetStep.name) {
      setDraggedCandidate(null);
      return;
    }

    try {
      setSuccessMessage(null);
      
      // Update candidate stage via API
      await updateCandidateStage(draggedCandidate.id, {
        applicationId: draggedCandidate.applicationId,
        currentInterviewStep: targetStep.id
      });

      // Update local state
      const updatedCandidates = candidates.map(candidate => 
        candidate.id === draggedCandidate.id 
          ? { ...candidate, currentInterviewStep: targetStep.name }
          : candidate
      );
      
      setCandidates(updatedCandidates);
      setSuccessMessage(`${draggedCandidate.fullName} moved to ${targetStep.name} successfully!`);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update candidate stage');
    } finally {
      setDraggedCandidate(null);
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading candidate data...</p>
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
          <Button variant="outline-danger" onClick={loadData}>
            Try Again
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!positionData) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">No position data found</Alert>
      </Container>
    );
  }

  // Sort steps by orderIndex
  const sortedSteps = [...positionData.interviewFlow.interviewSteps].sort(
    (a, b) => a.orderIndex - b.orderIndex
  );

  return (
    <Container fluid className="mt-4">
      {/* Header */}
      <Row className="mb-4">
        <div className="d-flex align-items-center">
          <Button 
            variant="link" 
            className="p-0 me-3"
            onClick={onBack}
            style={{ textDecoration: 'none' }}
          >
            <ArrowLeft size={24} className="text-primary" />
          </Button>
          <h2 className="mb-0">{positionData.positionName}</h2>
        </div>
      </Row>

      {/* Success Message */}
      {successMessage && (
        <Row className="mb-3">
          <Alert variant="success" className="py-2">
            {successMessage}
          </Alert>
        </Row>
      )}

      {/* Kanban Board */}
      <Row>
        {sortedSteps.map((step) => (
          <KanbanColumn
            key={step.id}
            step={step}
            candidates={candidatesByStep[step.name] || []}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        ))}
      </Row>
    </Container>
  );
};

export default CandidateKanban;
