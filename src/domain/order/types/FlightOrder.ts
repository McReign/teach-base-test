import { EvaluationCriteriaTitle } from '@/domain/evaluationCriteria/types/EvaluationCriteriaTitle';
import { EvaluationCriteriaId } from '@/domain/evaluationCriteria/types/EvaluationCriteriaId';

export type Order = {
  id: EvaluationCriteriaId;
  title: EvaluationCriteriaTitle;
};
