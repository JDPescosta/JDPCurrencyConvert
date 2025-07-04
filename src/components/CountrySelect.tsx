import { useMemo, useCallback } from "react";
import { Select } from "antd";
import { debounce } from "lodash";
import useCountries from "../hooks/useCountries";
import { type Country } from "../types/Country.type";

interface CountrySelectProps {
  placeholder: string;
  currentCountry?: Country;
  setCurrentCountry: (country: Country) => void;
}

const CountrySelect = ({
  placeholder,
  currentCountry,
  setCurrentCountry,
}: CountrySelectProps) => {
  const { countries, fetchCountries } = useCountries();

  const options = useMemo(() => {
    const formattedCountries = countries.map((country) => ({
      label: country.name.common,
      value: country.name.common,
    }));

    return formattedCountries;
  }, [countries]);

  const handleSearch = useCallback(
    (newValue: string) => {
      if (newValue.length > 0) fetchCountries(newValue);
    },
    [fetchCountries]
  );

  const debouncedFetchCountries = useMemo(() => {
    return debounce(handleSearch, 300);
  }, [handleSearch]);

  const handleChange = useCallback(
    (newValue: string) => {
      const country = countries.find(({ name }) => name.common === newValue);

      if (country) {
        // Assume that the first currency is the main currency of the country (for now...)
        setCurrentCountry({
          name: country.name.common,
          code: Object.keys(country.currencies)[0],
          symbol: Object.values(country.currencies)[0].symbol,
        });
      }
    },
    [countries, setCurrentCountry]
  );

  return (
    <Select
      style={{ width: "30rem" }}
      showSearch
      value={currentCountry?.name}
      placeholder={placeholder}
      defaultActiveFirstOption={false}
      suffixIcon={null}
      filterOption={false}
      onSearch={debouncedFetchCountries}
      onChange={handleChange}
      notFoundContent={null}
      options={options}
    />
  );
};

export default CountrySelect;
