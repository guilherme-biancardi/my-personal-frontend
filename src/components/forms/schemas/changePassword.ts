import { toTypedSchema } from '@vee-validate/yup';
import { object, string, ref } from 'yup';

export const resetPasswordSchema = (): object =>
  toTypedSchema(
    object({
      currentPassword: string()
        .required('O campo é obrigatório')
        .min(6, 'O campo deve conter 6 ou mais caracteres'),
      password: string()
        .required('O campo é obrigatório')
        .min(6, 'O campo deve conter 6 ou mais caracteres')
        .notOneOf([ref('currentPassword')], 'A nova senha não pode ser igual a atual'),
      passwordConfirmation: string()
        .required('O campo é obrigatório')
        .min(6, 'O campo deve conter 6 ou mais caracteres')
        .oneOf([ref('password')], 'As senhas não coincidem')
    })
  );
