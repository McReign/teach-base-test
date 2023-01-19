import { InterviewId } from '@/domain/interview/types/InterviewId';
import { Interview } from '@/domain/interview/types/Interview';
import { IntervieweeName } from '@/domain/interview/types/IntervieweeName';

export type InterviewApiServicePort = {
  create: (intervieweeName: IntervieweeName) => Promise<Interview>;
  complete: (interview: Interview) => Promise<Interview>;
  get: (id: InterviewId) => Promise<Interview>;
};
