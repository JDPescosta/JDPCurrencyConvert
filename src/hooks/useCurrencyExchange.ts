import { useState, useMemo } from "react";
import axios from "axios";
import { formatMoney } from "accounting-js";

const useCurrencyExchange = (
  sourceCurrency?: string,
  destinationCurrency?: string,
  amount?: number
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [exchangeRate, setExchangeRate] = useState<number>(0);

  const fetchCurrencyExchangeRate = async () => {
    try {
      const {
        data: { conversion_rate },
      } = await axios.get(
        `${import.meta.env.VITE_EXCHANGE_BASE_URL}/${
          import.meta.env.VITE_EXCHANGE_API_KEY
        }/pair/${sourceCurrency}/${destinationCurrency}`
      );
      setExchangeRate(conversion_rate);
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

  const formattedConvertedAmount = useMemo(() => {
    if (amount && exchangeRate && destinationCurrency) {
      return formatMoney(amount * exchangeRate, {
        symbol: destinationCurrency,
        precision: 2,
      });
    } else {
      return null;
    }
  }, [amount, exchangeRate, destinationCurrency]);

  return { exchangeRate, fetchCurrencyExchangeRate, formattedConvertedAmount };
};

export default useCurrencyExchange;
