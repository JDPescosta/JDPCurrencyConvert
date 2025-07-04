import { useState, useCallback } from "react";
import axios from "axios";

type CountryApiResponse = {
  name: {
    common: string;
  };
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
};

const useCountries = () => {
  const [countries, setCountries] = useState<CountryApiResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCountries = useCallback(
    async (name: string) => {
      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_COUNTRY_BASE_URL
          }/name/${name}?fields=name,currencies`
        );
        setCountries(data);
      } catch (error) {
        // would be better to provide feedback to the user about the error i.e. "No country found with that name"
        if (axios.isAxiosError(error)) {
          console.error(error.response?.data);
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    },
    [setCountries, setLoading]
  );

  return { countries, loading, fetchCountries };
};

export default useCountries;
