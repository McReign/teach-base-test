import { Interview } from '@/domain/interview/types/Interview';
import { OrdersApiServicePort } from '@/application/__ports__/api/OrdersApiServicePort';
import { InterviewId } from '@/domain/interview/types/InterviewId';
import { IntervieweeName } from '@/domain/interview/types/IntervieweeName';

const MOCK: Interview = {
  id: '3e041b02-b193-4756-aadb-952bb418b00e',
  templateId: '3e041b02-b193-4756-aadb-952bb418b00e',
  intervieweeName: 'Test',
  comment: null,
  completed: false,
  questions: [
    {
      id: 'cc25f248-209c-4558-9d1e-4c8547b9c0d4',
      title: 'test1',
      comment: 'fsdfsdf',
      evaluationCriteria: ['294a84e0-b284-4028-8310-c403c19dfc39'],
      score: 0,
    },
    {
      id: '127ffd29-aac6-47a4-89ff-2fb62a45aa14',
      title: 'test2',
      comment: '',
      evaluationCriteria: ['981d7f69-43f4-4853-ada5-1d8aa808f7ec', '294a84e0-b284-4028-8310-c403c19dfc39'],
      score: 0,
    },
    {
      id: '25032ec3-1525-467c-984c-fd18075e9fcf',
      title: 'test3',
      comment: 'dsfsdfsdf',
      evaluationCriteria: [],
      score: 0,
    },
  ],
  evaluationCriteria: [
    {
      id: '981d7f69-43f4-4853-ada5-1d8aa808f7ec',
      title: 'c1',
      score: 0,
    },
    {
      id: '294a84e0-b284-4028-8310-c403c19dfc39',
      title: 'c2',
      score: 0,
    },
  ],
};

export function useInterviewApiService(): OrdersApiServicePort {
  function create(intervieweeName: IntervieweeName): Promise<Interview> {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK), 500));
  }

  function get(interviewId: InterviewId): Promise<Interview> {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK), 500));
  }

  function complete(interview: Interview): Promise<Interview> {
    return new Promise((resolve) => setTimeout(() => resolve({ ...interview, completed: true }), 500));
  }

  return { create, get, complete };
}
