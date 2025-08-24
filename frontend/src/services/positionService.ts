import { PositionInterviewFlow, Candidate, UpdateCandidateStageRequest, UpdateCandidateStageResponse } from '../types/kanban.types';

const API_BASE_URL = 'http://localhost:3010';
const USE_MOCK_DATA = true; // Set to false when backend is available

export interface Position {
  id: number;
  title: string;
  manager: string;
  deadline: string;
  status: 'Abierto' | 'Contratado' | 'Cerrado' | 'Borrador';
  description?: string;
  isActive: boolean;
}

// Mock data for demonstration
const mockInterviewFlows: { [positionId: number]: PositionInterviewFlow } = {
  1: {
    positionName: 'Senior Backend Engineer',
    interviewFlow: {
      id: 1,
      description: 'Technical interview process for senior backend position',
      interviewSteps: [
        { id: 1, interviewFlowId: 1, interviewTypeId: 1, name: 'Initial Screening', orderIndex: 1 },
        { id: 2, interviewFlowId: 1, interviewTypeId: 2, name: 'Technical Test', orderIndex: 2 },
        { id: 3, interviewFlowId: 1, interviewTypeId: 3, name: 'Technical Interview', orderIndex: 3 },
        { id: 4, interviewFlowId: 1, interviewTypeId: 4, name: 'Final Interview', orderIndex: 4 }
      ]
    }
  },
  2: {
    positionName: 'Junior Android Engineer',
    interviewFlow: {
      id: 2,
      description: 'Interview process for junior Android position',
      interviewSteps: [
        { id: 5, interviewFlowId: 2, interviewTypeId: 1, name: 'HR Screening', orderIndex: 1 },
        { id: 6, interviewFlowId: 2, interviewTypeId: 2, name: 'Technical Assessment', orderIndex: 2 },
        { id: 7, interviewFlowId: 2, interviewTypeId: 3, name: 'Team Interview', orderIndex: 3 }
      ]
    }
  },
  3: {
    positionName: 'Product Manager',
    interviewFlow: {
      id: 3,
      description: 'Interview process for product manager position',
      interviewSteps: [
        { id: 8, interviewFlowId: 3, interviewTypeId: 1, name: 'Phone Screening', orderIndex: 1 },
        { id: 9, interviewFlowId: 3, interviewTypeId: 5, name: 'Case Study', orderIndex: 2 },
        { id: 10, interviewFlowId: 3, interviewTypeId: 6, name: 'Stakeholder Interview', orderIndex: 3 },
        { id: 11, interviewFlowId: 3, interviewTypeId: 4, name: 'Final Interview', orderIndex: 4 }
      ]
    }
  }
};

const mockCandidates: { [positionId: number]: Candidate[] } = {
  1: [
    { id: 1, applicationId: 101, fullName: 'Alice Johnson', currentInterviewStep: 'Technical Test', averageScore: 8.5 },
    { id: 2, applicationId: 102, fullName: 'Bob Smith', currentInterviewStep: 'Initial Screening', averageScore: 7.2 },
    { id: 3, applicationId: 103, fullName: 'Carol Davis', currentInterviewStep: 'Technical Interview', averageScore: 9.1 },
    { id: 4, applicationId: 104, fullName: 'David Wilson', currentInterviewStep: 'Final Interview', averageScore: 8.8 }
  ],
  2: [
    { id: 5, applicationId: 201, fullName: 'Eva Martinez', currentInterviewStep: 'HR Screening', averageScore: 6.9 },
    { id: 6, applicationId: 202, fullName: 'Frank Thompson', currentInterviewStep: 'Technical Assessment', averageScore: 7.5 },
    { id: 7, applicationId: 203, fullName: 'Grace Lee', currentInterviewStep: 'Team Interview', averageScore: 8.3 }
  ],
  3: [
    { id: 8, applicationId: 301, fullName: 'Henry Brown', currentInterviewStep: 'Phone Screening', averageScore: 7.8 },
    { id: 9, applicationId: 302, fullName: 'Ivy Chen', currentInterviewStep: 'Case Study', averageScore: 9.2 },
    { id: 10, applicationId: 303, fullName: 'Jack Miller', currentInterviewStep: 'Stakeholder Interview', averageScore: 8.1 }
  ]
};

export const getAllPositions = async (): Promise<Position[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/positions`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching positions:', error);
    throw new Error('Failed to fetch positions');
  }
};

export const getPositionDetails = async (positionId: number): Promise<Position> => {
  try {
    const response = await fetch(`${API_BASE_URL}/positions/${positionId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching position details:', error);
    throw new Error('Failed to fetch position details');
  }
};

export const getPositionInterviewFlow = async (positionId: number): Promise<PositionInterviewFlow> => {
  if (USE_MOCK_DATA) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockData = mockInterviewFlows[positionId];
    if (!mockData) {
      throw new Error(`No interview flow found for position ${positionId}`);
    }
    return mockData;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/positions/${positionId}/interviewflow`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.interviewFlow;
  } catch (error) {
    console.error('Error fetching position interview flow:', error);
    throw new Error('Failed to fetch position interview flow');
  }
};

export const getPositionCandidates = async (positionId: number): Promise<Candidate[]> => {
  if (USE_MOCK_DATA) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const mockData = mockCandidates[positionId];
    if (!mockData) {
      return []; // Return empty array if no candidates for this position
    }
    return mockData;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/positions/${positionId}/candidates`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching position candidates:', error);
    throw new Error('Failed to fetch position candidates');
  }
};

export const updateCandidateStage = async (
  candidateId: number, 
  stageData: UpdateCandidateStageRequest
): Promise<UpdateCandidateStageResponse> => {
  if (USE_MOCK_DATA) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Mock successful response
    return {
      message: 'Candidate stage updated successfully',
      data: {
        id: candidateId,
        positionId: 1, // Mock position ID
        candidateId: candidateId,
        applicationDate: new Date().toISOString(),
        currentInterviewStep: stageData.currentInterviewStep,
        notes: null,
        interviews: []
      }
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/candidates/${candidateId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stageData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating candidate stage:', error);
    throw new Error('Failed to update candidate stage');
  }
};
