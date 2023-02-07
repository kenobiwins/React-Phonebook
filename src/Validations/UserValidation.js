import { object, string } from 'yup';

export const userRegestrationSchema = object({
  email: string().email().required(),
  password: string().min(8).max(16).required('hello'),
  name: string().required(),
});

export const userLogInSchema = object({
  email: string().email().required(),
  password: string().min(8).max(16).required(),
});

export const userContactSchema = object({
  name: string().required(),
  number: string().min(4).max(12).required(),
});
