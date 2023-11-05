import {
  Todo,
  TodoProperty,
  ValidationError,
  ValidationResult,
} from '../../types';

export const validateTodo = (todo: Todo): ValidationResult => {
  const errors: ValidationError[] = [];

  if (todo.label == null || todo.label.length === 0) {
    errors.push({
      property: TodoProperty.Label,
      message: 'Label is required',
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
