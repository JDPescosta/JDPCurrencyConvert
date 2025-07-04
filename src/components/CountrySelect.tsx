import React, { useMemo } from 'react';
import { Select } from 'antd';
import { debounce } from 'lodash';
import useCountries from '../hooks/useCountries';


interface CountrySelectProps {
  placeholder: string;
  countryName: string | undefined;
  setCountryName: (name: string) => void;
}

const CountrySelect = ({ placeholder, countryName, setCountryName }: CountrySelectProps) => {

  const { countries, fetchCountries } = useCountries();

  const options = useMemo(() => {
    const formattedCountries = countries.map((country) => ({
      label: country.name.common,
      value: Object.keys(country.currencies)[0],
    }))

    return formattedCountries
  }, [countries])

  const handleSearch = debounce((newValue: string) => {
    if (newValue.length > 0) 
      fetchCountries(newValue);
  }, 300);

  const handleChange = (newValue: string) => {
    setCountryName(newValue);
  };

  
  return (
    <Select
      style={{ width: '30rem'}}
      showSearch
      value={countryName}
      placeholder={placeholder}
      defaultActiveFirstOption={false}
      suffixIcon={null}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
      options={options}
    />
  );
};

export default CountrySelect;