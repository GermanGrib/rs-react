import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is a required field')
    .matches(/^[A-Z][a-z]*$/, 'Name should start with an uppercase letter'),
  age: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .nullable()
    .required('Age is a required field')
    .positive('Age should be a positive'),

  email: yup
    .string()
    .required('Email is a required field')
    .email('Incorrect email'),
  password: yup
    .string()
    .required('Password is a required field')
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z\d])/,
      'Password must contain at least one digit, one uppercase letter, one lowercase letter, and one special character'
    ),
  checkpassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  checkbox: yup
    .boolean()
    .oneOf([true], 'You should accept the terms and conditions'),
  gender: yup.string().default('male'),
  picture: yup
    .mixed()
    .test('fileSize', 'File size is too large', (value) => {
      const fileList = value as FileList;
      return fileList && fileList[0] && fileList[0].size <= 1024 * 1024;
    })
    .test(
      'fileType',
      'Invalid file type. Only PNG and JPEG are allowed',
      (value) => {
        const fileList = value as FileList;
        return (
          fileList &&
          fileList[0] &&
          ['image/png', 'image/jpeg'].includes(fileList[0].type)
        );
      }
    ),
  country: yup.string().required('Country is required'),
});
