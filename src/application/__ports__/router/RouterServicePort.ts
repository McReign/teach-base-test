import { TemplateId } from '@/domain/template/types/TemplateId';
import { InterviewId } from '@/domain/interview/types/InterviewId';

export type RouterServicePort = {
  goToHomePage: () => void;
  goToCreateTemplatePage: () => void;
  goToTemplatePage: (id: TemplateId) => void;
  goToInterviewPage: (id: InterviewId) => void;
  getHomePagePath: () => string;
  getInterviewPagePath: () => string;
  getCreateTemplatePagePath: () => string;
  getTemplatePagePath: () => string;
  getTemplatePageId: () => TemplateId | null;
  getInterviewPageId: () => InterviewId | null;
};
