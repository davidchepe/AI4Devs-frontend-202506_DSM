import React from 'react';
import { Col, Card } from 'react-bootstrap';
import CandidateCard from './CandidateCard';
import { Candidate, InterviewStep } from '../types/kanban.types';

interface KanbanColumnProps {
  step: InterviewStep;
  candidates: Candidate[];
  onDragStart: (e: React.DragEvent<HTMLElement>, candidate: Candidate) => void;
  onDragOver: (e: React.DragEvent<HTMLElement>) => void;
  onDrop: (e: React.DragEvent<HTMLElement>, targetStep: InterviewStep) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ 
  step, 
  candidates, 
  onDragStart, 
  onDragOver, 
  onDrop 
}) => {
  // Sort candidates by score (highest first)
  const sortedCandidates = [...candidates].sort((a, b) => b.averageScore - a.averageScore);

  return (
    <Col md={3} className="mb-4">
      <Card className="h-100">
        <Card.Header className="bg-primary text-white">
          <h6 className="mb-0">{step.name}</h6>
          <small>({sortedCandidates.length} candidate{sortedCandidates.length !== 1 ? 's' : ''})</small>
        </Card.Header>
        <Card.Body 
          className="p-3"
          style={{ minHeight: '400px', backgroundColor: '#f8f9fa' }}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, step)}
        >
          {sortedCandidates.length === 0 ? (
            <div className="text-center text-muted mt-4">
              <p>No candidates in this stage</p>
            </div>
          ) : (
            sortedCandidates.map((candidate) => (
              <CandidateCard
                key={`${candidate.id}-${candidate.applicationId}`}
                candidate={candidate}
                onDragStart={onDragStart}
              />
            ))
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default KanbanColumn;
