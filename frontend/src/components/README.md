# Candidate Kanban Integration Guide

## Overview
The Candidate Kanban system provides a drag-and-drop interface for managing candidates through different interview stages.

## Files Created
```
frontend/src/
├── types/kanban.types.ts          # TypeScript interfaces
├── services/positionService.ts    # API service functions
└── components/
    ├── CandidateCard.tsx          # Individual candidate card
    ├── KanbanColumn.tsx           # Interview stage column
    ├── CandidateKanban.tsx        # Main kanban component
    └── CandidateKanbanDemo.tsx    # Demo wrapper
```

## API Integration
The system integrates with these backend endpoints:
- `GET /positions/:id/interviewflow` - Fetches position details and interview stages
- `GET /positions/:id/candidates` - Fetches candidates for a position
- `PUT /candidates/:id` - Updates candidate's interview stage

## Usage Examples

### Basic Usage
```tsx
import CandidateKanban from './components/CandidateKanban';

// In your component
<CandidateKanban 
  positionId={1} 
  onBack={() => navigate('/positions')} 
/>
```

### With React Router
```tsx
import { useParams, useNavigate } from 'react-router-dom';
import CandidateKanban from './components/CandidateKanban';

const CandidateKanbanPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  return (
    <CandidateKanban 
      positionId={parseInt(id)} 
      onBack={() => navigate('/positions')} 
    />
  );
};
```

### Demo Component
Use `CandidateKanbanDemo.tsx` for testing without routing setup.

## Features
- ✅ Drag and drop candidates between interview stages
- ✅ Real-time score-based sorting within columns
- ✅ Success notifications for stage updates
- ✅ Loading states and error handling
- ✅ Responsive design with Bootstrap
- ✅ TypeScript support throughout

## Integration Requirements
- React 18+
- Bootstrap 5+ (already included)
- TypeScript (already configured)
- Backend API running on `http://localhost:3010`

## Notes
- Uses native fetch API (no external HTTP library needed)
- Uses HTML5 drag and drop (no external drag library needed)
- All components are fully typed with TypeScript
- Follows existing project patterns and styling
