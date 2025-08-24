import React from 'react';
import { Card } from 'react-bootstrap';
import { Candidate } from '../types/kanban.types';

interface CandidateCardProps {
  candidate: Candidate;
  onDragStart: (e: React.DragEvent<HTMLElement>, candidate: Candidate) => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, onDragStart }) => {
  const getScoreColor = (score: number): string => {
    if (score >= 8) return 'success';
    if (score >= 6) return 'warning';
    if (score >= 4) return 'info';
    return 'secondary';
  };

  return (
    <Card 
      className="mb-2 shadow-sm cursor-pointer"
      draggable
      onDragStart={(e) => onDragStart(e, candidate)}
      style={{ cursor: 'grab' }}
      onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
      onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
    >
      <Card.Body className="p-3">
        <Card.Title className="h6 mb-2">{candidate.fullName}</Card.Title>
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">Score:</small>
          <span className={`badge bg-${getScoreColor(candidate.averageScore)}`}>
            {candidate.averageScore.toFixed(1)}
          </span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CandidateCard;
