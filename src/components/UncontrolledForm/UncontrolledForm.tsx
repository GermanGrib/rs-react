import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ValidationError } from 'yup';

import { useAppDispatch } from '../../hooks/reduxHooks';
import { setDataForm } from '../../store/slices/formSlice';
import Country from '../Country/Country';
import { getPasswordStrength } from '../utils/passwordStrong';
import { convertImage } from '../utils/superConvertor';
import { schema } from '../utils/validationSchemas';

const UncontrolledForm = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const password = event.target.value;
    const strength = getPasswordStrength(password);
    setPasswordStrength(strength);
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    const dataForm = formRef.current;
    if (!dataForm) {
      return;
    }
    const formData = new FormData(dataForm);

    try {
      const data = {
        name: formData.get('name'),
        age: Number(formData.get('age')),
        country: formData.get('country'),
        email: formData.get('email'),
        password: formData.get('password'),
        checkpassword: formData.get('checkpassword'),
        gender: formData.get('gender'),
        picture: [formData.get('picture') as File],
        checkbox: !!formData.get('checkbox'),
      };

      const validateData = await schema.validate(data, {
        abortEarly: false,
      });
      const pictureFile = formData.get('picture') as File;
      const image64 = pictureFile ? await convertImage(pictureFile) : null;
      const resultData = { ...validateData, picture: image64 };
      dispatch(setDataForm(resultData));
      navigate('/');
    } catch (error) {
      const validationErrors: Record<string, string> = {};
      if (error instanceof ValidationError) {
        error.inner.forEach((e) => {
          if (e.path) validationErrors[e.path] = e.message;
        });
      }
      setErrors(validationErrors);
    }
  };

  return (
    <div className="form-wrapper">
      <form
        className="form-container"
        onSubmit={handleSubmit}
        ref={formRef}
        noValidate
      >
        <div className="input-field">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input id="name" className="form-input" name="name" />
          {errors.name && <p className="form-error">{errors.name}</p>}
        </div>

        <div className="input-field">
          <label htmlFor="age" className="form-label">
            Age:
          </label>
          <input id="age" type="number" className="form-input" name="age" />
          {errors.age && <p className="form-error">{errors.age}</p>}
        </div>

        <div className="input-field">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input id="email" className="form-input" name="email" />
          {errors.email && <p className="form-error">{errors.email}</p>}
        </div>

        <div className="input-group">
          <div className="input-field">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              onChange={handlePasswordChange}
              id="password"
              className="form-input"
              name="password"
            />
            {errors.password && (
              <p className="form-error password-error">{errors.password}</p>
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
              name="checkpassword"
            />
            {errors.checkpassword && (
              <p className="form-error">{errors.checkpassword}</p>
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
              defaultChecked
              name="gender"
            />
            <label className="form-gender" htmlFor="male">
              Male
            </label>

            <input type="radio" id="female" value="female" name="gender" />
            <label className="form-gender" htmlFor="female">
              Female
            </label>
          </div>
        </div>

        <div className="input-field picture-field">
          <label htmlFor="picture" className="form-label">
            Upload Picture:
          </label>
          <input
            id="picture"
            className="form-input"
            name="picture"
            type="file"
          />
          {errors.picture && (
            <p className="form-error picture-error">{errors.picture}</p>
          )}
        </div>

        <div className="input-field country-field">
          <Country />
          {errors.country && (
            <span className="form-error">{errors.country}</span>
          )}
        </div>
        <div className="check-box-wrapper checkbox-field">
          <input
            id="forms-checkbox"
            className="form-input checker"
            name="checkbox"
            type="checkbox"
          />
          <label htmlFor="forms-checkbox" className="form-label checker-label">
            Do you agree?
          </label>
        </div>
        {errors.checkbox && (
          <span className="form-error">{errors.checkbox}</span>
        )}
        <input className={`form-submit`} type="submit" value="SUBMIT" />
      </form>
    </div>
  );
};

export default UncontrolledForm;
