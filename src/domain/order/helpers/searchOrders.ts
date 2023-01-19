import { EvaluationCriteriaTitle } from '@/domain/evaluationCriteria/types/EvaluationCriteriaTitle';

export function validateEvaluationCriteriaTitle(title: EvaluationCriteriaTitle): boolean {
  return !!title;
}
