export type FormFieldState<T> = {
  value: T;
  touched: boolean;
  valid: boolean;
  error: string | null;
};

export type FormFieldsStateMap<F extends Record<string, any>> = {
  [name in keyof F]: FormFieldState<F[name]>;
};

export type FormServicePort<F extends Record<string, any>> = {
  getFieldsState: () => FormFieldsStateMap<F>;
  getFieldState: <N extends keyof F>(name: N) => FormFieldState<F[N]>;
  getIsFormValid: () => boolean;
  changeField: <N extends keyof F>(name: N) => (value: F[N]) => void;
  blurField: <N extends keyof F>(name: N) => () => void;
  clearField: <N extends keyof F>(name: N) => () => void;
  submitForm: () => void;
  clearForm: () => void;
};
