import { toTypedSchema } from '@vee-validate/yup';
import { object, string } from 'yup';

export const resendActivationLinkSchema = (): object =>
  toTypedSchema(
    object({
      email: string().required('O campo é obrigatório').email('O campo não é um e-mail válido')
    })
  );
