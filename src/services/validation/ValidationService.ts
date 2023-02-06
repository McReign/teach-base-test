import { ValidationResult, ValidationServicePort } from '@/application/__ports__/validation/ValidationServicePort';

export type ValidationConfig<T> = [(value: T) => boolean, string][];

export function useValidationService<T>(config: ValidationConfig<T>): ValidationServicePort<T> {
  function validate(value: T): ValidationResult {
    for (let i = 0; i < config.length; i++) {
      const [validationFunction, validationMessage] = config[i];

      if (!validationFunction(value)) {
        return {
          valid: false,
          error: validationMessage,
        };
      }
    }

    return {
      valid: true,
      error: null,
    };
  }

  return { validate };
}
