import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { FormFieldState, FormFieldsStateMap, FormServicePort } from '@/application/__ports__/form/FormServicePort';
import { ValidationServicePort } from '@/application/__ports__/validation/ValidationServicePort';

export type FormFieldConfig<V> = {
  defaultValue: V;
  validation?: ValidationServicePort<V>;
};

export type FormFieldsConfigsMap<F extends Record<string, any>> = {
  [name in keyof F]: FormFieldConfig<F[name]>;
};

export type FormConfig<F extends Record<string, any>> = {
  fields: FormFieldsConfigsMap<F>;
  onSubmit?: () => void;
};

function createInitialFieldState<V>(fieldConfig: FormFieldConfig<V>): FormFieldState<V> {
  return { valid: true, touched: false, error: null, value: fieldConfig.defaultValue };
}

function createInitialFieldsState<F extends Record<string, any>>(config: FormConfig<F>): FormFieldsStateMap<F> {
  return Object.keys(config.fields).reduce(
    (acc, name) => ({ ...acc, [name]: createInitialFieldState(config.fields[name]) }),
    {} as FormFieldsStateMap<F>
  );
}

export function useFormService<F extends Record<string, any>>(config: FormConfig<F>): FormServicePort<F> {
  const [_, forceUpdate] = useState({});
  const fieldsState = useRef<FormFieldsStateMap<F>>(createInitialFieldsState(config));

  const setFieldsState = useCallback(
    (newFieldsState: FormFieldsStateMap<F>) => {
      fieldsState.current = newFieldsState;
      forceUpdate({});
    },
    [fieldsState, forceUpdate]
  );

  const getFieldsState = useCallback(() => fieldsState.current, [fieldsState]);

  const getFieldState = useCallback(<N extends keyof F>(name: N) => getFieldsState()[name], [getFieldsState]);

  const getFieldsNames = useCallback(() => Object.keys(getFieldsState()) as (keyof F)[], [getFieldsState]);

  const setFieldState = useCallback(
    <N extends keyof F>(name: N, newFieldState: FormFieldState<F[N]>) => {
      setFieldsState({ ...getFieldsState(), [name]: newFieldState });
    },
    [setFieldsState, getFieldsState]
  );

  const updateFieldState = useCallback(
    <N extends keyof F>(name: N, newFieldState: Partial<FormFieldState<F[N]>>) => {
      setFieldState(name, { ...getFieldState(name), ...newFieldState });
    },
    [setFieldState, getFieldState]
  );

  const getIsFormValid = useCallback(
    () => getFieldsNames().every((name) => getFieldState(name).valid),
    [getFieldsNames, getFieldState]
  );

  const clearForm = useCallback(() => setFieldsState(createInitialFieldsState(config)), [config, setFieldsState]);

  const validateField = useCallback(
    <N extends keyof F>(name: N) => {
      const { valid, error } = config.fields[name].validation?.validate?.(getFieldState(name).value) || {
        valid: true,
        error: null,
      };

      updateFieldState(name, { valid, error });

      return valid;
    },
    [config.fields, getFieldState, updateFieldState]
  );

  const validateFields = useCallback(() => {
    const results = getFieldsNames().map(validateField);
    return results.every(Boolean);
  }, [getFieldsNames, validateField]);

  const changeField = useCallback(
    <N extends keyof F>(name: N) =>
      (value: F[N]) => {
        updateFieldState(name, { value });
        validateField(name);
      },
    [updateFieldState, validateField]
  );

  const blurField = useCallback(
    <N extends keyof F>(name: N) =>
      () =>
        updateFieldState(name, { touched: true }),
    [updateFieldState]
  );

  const clearField = useCallback(
    <N extends keyof F>(name: N) =>
      () =>
        setFieldState(name, createInitialFieldState(config.fields[name])),
    [setFieldState, config.fields]
  );

  const submitForm = useCallback(() => {
    getFieldsNames().forEach((name) => updateFieldState(name, { touched: true }));

    if (validateFields()) {
      config.onSubmit?.();
    }
  }, [getFieldsNames, updateFieldState, config.onSubmit, validateFields]);

  useLayoutEffect(() => {
    validateFields();
  }, []);

  return {
    getFieldsState,
    getFieldState,
    submitForm,
    clearForm,
    clearField,
    getIsFormValid,
    blurField,
    changeField,
  };
}
