import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import RecruiterDashboard from './components/RecruiterDashboard';
import AddCandidate from './components/AddCandidateForm'; 
import EnhancedPositions from './components/EnhancedPositions';
import CandidateKanban from './components/CandidateKanban';

// Wrapper component for the Kanban page with routing
const CandidateKanbanPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const positionId = id ? parseInt(id) : 1;
  
  return (
    <CandidateKanban 
      positionId={positionId} 
      onBack={() => navigate('/positions')} 
    />
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RecruiterDashboard />} />
        <Route path="/add-candidate" element={<AddCandidate />} />
        <Route path="/positions" element={<EnhancedPositions />} />
        <Route path="/positions/:id/candidates" element={<CandidateKanbanPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;