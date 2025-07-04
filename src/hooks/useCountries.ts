import { useState } from "react";
import axios from "axios";

type Country = {
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
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCountries = async (name: string) => {
    try {
      const { data } = await axios.get(
        `https://restcountries.com/v3.1/name/${name}?fields=name,currencies`
      );
      setCountries(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return { countries, loading, fetchCountries };
};

export default useCountries;
