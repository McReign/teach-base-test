import { IntervieweeName } from '@/domain/interview/types/IntervieweeName';

export type CreatingInterviewStoreServicePort = {
  getIntervieweeName: () => IntervieweeName | null;
  setIntervieweeName: (name: IntervieweeName) => void;
  clearState: () => void;
};
