import { useState, useMemo } from "react";
import axios from "axios";
import { formatMoney } from "accounting-js";
import { type Country } from "../types/Country.type";

const useCurrencyExchange = (
  sourceCurrency?: Country,
  destinationCurrency?: Country,
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
        }/pair/${sourceCurrency?.code}/${destinationCurrency?.code}`
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
    if (amount && exchangeRate && destinationCurrency?.symbol) {
      return formatMoney(amount * exchangeRate, {
        symbol: destinationCurrency?.symbol,
        precision: 2,
      });
    } else {
      return null;
    }
  }, [amount, exchangeRate, destinationCurrency?.symbol]);

  return {
    exchangeRate,
    fetchCurrencyExchangeRate,
    formattedConvertedAmount,
    loading,
  };
};

export default useCurrencyExchange;
