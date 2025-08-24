export interface Candidate {
  id: number;
  applicationId: number;
  fullName: string;
  currentInterviewStep: string;
  averageScore: number;
}

export interface InterviewStep {
  id: number;
  interviewFlowId: number;
  interviewTypeId: number;
  name: string;
  orderIndex: number;
}

export interface InterviewFlow {
  id: number;
  description: string;
  interviewSteps: InterviewStep[];
}

export interface PositionInterviewFlow {
  positionName: string;
  interviewFlow: InterviewFlow;
}

export interface CandidatesByStep {
  [stepName: string]: Candidate[];
}

export interface UpdateCandidateStageRequest {
  applicationId: number;
  currentInterviewStep: number;
}

export interface UpdateCandidateStageResponse {
  message: string;
  data: {
    id: number;
    positionId: number;
    candidateId: number;
    applicationDate: string;
    currentInterviewStep: number;
    notes: string | null;
    interviews: Array<{
      interviewDate: string;
      interviewStep: string;
      score: number | null;
    }>;
  };
}
