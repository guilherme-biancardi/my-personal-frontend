import { toTypedSchema } from '@vee-validate/yup';
import { object, string, ref } from 'yup';

export const resetPasswordSchema = (): object =>
  toTypedSchema(
    object({
      email: string().required('O campo é obrigatório').email('O campo não é um e-mail válido'),
      password: string()
        .required('O campo é obrigatório')
        .min(6, 'O campo deve conter 6 ou mais caracteres'),
      passwordConfirmation: string()
        .required('O campo é obrigatório')
        .min(6, 'O campo deve conter 6 ou mais caracteres')
        .oneOf([ref('password')], 'As senhas não coincidem')
    })
  );
