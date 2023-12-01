import { useAppSelector } from '../../hooks/reduxHooks';
import styles from './Preview.module.scss';

const Preview = () => {
  const formData = useAppSelector((state) => state.dataForm.form);
  return (
    <div className={styles.wrapper}>
      {formData.map((form, index) => (
        <div
          className={`${styles.wrapperCard} ${
            index === formData.length - 1 ? styles.animation : ''
          }`}
          key={`${form.password}${index}`}
        >
          <span>Name: {form.name}</span>
          <span>Email: {form.email}</span>
          <span>Age: {form.age}</span>
          <span>Gender: {form.gender}</span>
          <span>Password: {form.password}</span>
          <span>Country: {form.country}</span>
          <img
            className={styles.image}
            src={form.picture ? form.picture : ''}
            alt="form.name"
          />
        </div>
      ))}
    </div>
  );
};

export default Preview;
