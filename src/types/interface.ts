import * as yup from 'yup';
import { schema } from '../components/utils/validationSchemas';

export interface IForm extends yup.InferType<typeof schema> {
}

