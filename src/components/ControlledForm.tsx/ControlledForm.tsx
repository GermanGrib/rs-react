import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/reduxHooks';
import { setDataForm } from '../../store/slices/formSlice';
import { IForm } from '../../types/interface';
import Country from '../Country/Country';
import { getPasswordStrength } from '../utils/passwordStrong';
import { convertImage } from '../utils/superConvertor';
import { schema } from '../utils/validationSchemas';

const ControlledForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IForm>({ mode: 'onChange', resolver: yupResolver(schema) });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const watchPassword = watch().password;

  const handlePasswordChange = (pass: string) => {
    const strength = getPasswordStrength(pass);
    setPasswordStrength(strength);
  };

  useEffect(() => {
    handlePasswordChange(watchPassword);
  }, [watchPassword]);

  const onSubmit = async (data: IForm) => {
    if (data.picture !== undefined) {
      const picture = data.picture as FileList;
      let resultConvert = await convertImage(picture[0]);
      const result = { ...data, picture: resultConvert };
      dispatch(setDataForm(result));
      navigate('/');
    }
  };

  return (
    <div className="form-wrapper">
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-field">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input id="name" className="form-input" {...register('name')} />
          {errors.name && <p className="form-error">{errors.name.message}</p>}
        </div>

        <div className="input-field">
          <label htmlFor="age" className="form-label">
            Age:
          </label>
          <input
            id="age"
            type="number"
            className="form-input"
            {...register('age')}
          />
          {errors.age && <p className="form-error">{errors.age.message}</p>}
        </div>

        <div className="input-field">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input id="email" className="form-input" {...register('email')} />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>

        <div className="input-group">
          <div className="input-field">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              id="password"
              className="form-input"
              {...register('password')}
            />
            {errors.password && (
              <p className="form-error password-error">
                {errors.password.message}
              </p>
            )}
            <div className="strength">Strength: {passwordStrength}</div>
            {passwordStrength >= 4 && (
              <div className="strong-message">Password is strong!</div>
            )}
          </div>
          <div className="input-field">
            <label htmlFor="checkpassword" className="form-label">
              Check password:
            </label>
            <input
              id="checkpassword"
              className="form-input"
              {...register('checkpassword')}
            />
            {errors.checkpassword && (
              <p className="form-error">{errors.checkpassword.message}</p>
            )}
          </div>
        </div>

        <div className="input-field input-field__gender">
          <label className="form-label">Gender:</label>
          <div>
            <input
              type="radio"
              id="male"
              value="male"
              checked
              {...register('gender')}
            />
            <label className="form-gender" htmlFor="male">
              Male
            </label>

            <input
              type="radio"
              id="female"
              value="female"
              {...register('gender')}
            />
            <label className="form-gender" htmlFor="female">
              Female
            </label>
          </div>
        </div>

        <div className="input-field">
          <label htmlFor="picture" className="form-label">
            Upload Picture:
          </label>
          <input
            id="picture"
            className="form-input"
            {...register('picture', { required: 'Picture is required' })}
            type="file"
          />
          {errors.picture && (
            <p className="form-error">{errors.picture.message}</p>
          )}
        </div>

        <div className="input-field">
          <Country {...register('country')} />
          {errors.country && (
            <span className="form-error">{errors.country.message}</span>
          )}
        </div>
        <div className="check-box-wrapper">
          <input
            id="forms-checkbox"
            className="form-input checker"
            {...register('checkbox')}
            type="checkbox"
          />
          <label htmlFor="forms-checkbox" className="form-label checker-label">
            Do you agree?
          </label>
        </div>
        <input
          className={`form-submit ${!isValid ? 'disabled-btn' : ''}`}
          type="submit"
          value="SUBMIT"
          disabled={!isValid}
        />
      </form>
    </div>
  );
};

export default ControlledForm;
