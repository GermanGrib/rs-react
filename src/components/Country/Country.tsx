import React from 'react';
import { useCallback, useMemo, useState } from 'react';

import { useGetCountriesQuery } from '../../store/slices/countryAPI';
import styles from './Country.module.scss';

interface GenericInputProps
  extends React.PropsWithoutRef<JSX.IntrinsicElements['input']> {}

const Country = React.forwardRef<HTMLInputElement, GenericInputProps>(
  ({ ...props }, ref) => {
    const { data = [] } = useGetCountriesQuery({});
    const [value, setValue] = useState('');
    const [visible, setVisible] = useState(false);
    const filteredCountries = useMemo(
      () =>
        data.filter((country) =>
          country.name.toLowerCase().includes(value.toLowerCase())
        ),
      [data, value]
    );

    const currentValue = value;

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({
      target: { value },
    }) => {
      if (value !== currentValue) {
        setValue(value);
        setVisible(true);
      }
    };

    const handleMouseDownCountryList = useCallback<
      React.MouseEventHandler<HTMLLIElement>
    >(({ currentTarget }) => {
      setValue(currentTarget.innerText);
      setVisible(false);
    }, []);

    return (
      <div className={styles.wrapper}>
        <input
          {...props}
          ref={ref}
          className="form-input"
          type="text"
          name="country"
          id="countryId"
          value={value}
          onChange={handleChange}
          placeholder="Write your country"
          autoComplete="nope"
        />
        {visible && (
          <ul className={styles.listItems}>
            {filteredCountries.map((country) => (
              <li
                className={styles.listItem}
                key={country.name}
                onMouseDown={handleMouseDownCountryList}
              >
                {country.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

export default Country;
