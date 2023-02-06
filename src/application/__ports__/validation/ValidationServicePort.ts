export type ValidationResult = {
  valid: boolean;
  error: string | null;
};

export type ValidationServicePort<T> = {
  validate: (value: T) => ValidationResult;
};
