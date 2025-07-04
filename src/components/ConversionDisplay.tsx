import { useEffect, useMemo } from "react";
import { Spin, Typography, Space } from "antd";
import useCurrencyExchange from "../hooks/useCurrencyExchange";
import { formatMoney } from "accounting-js";
import { type Country } from "../types/Country.type";

const { Paragraph } = Typography;

interface ConversionDisplayProps {
  sourceCountry?: Country;
  destinationCountry?: Country;
  currentAmount: number;
}

const ConversionDisplay = ({
  sourceCountry,
  destinationCountry,
  currentAmount,
}: ConversionDisplayProps) => {
  const {
    exchangeRate,
    fetchCurrencyExchangeRate,
    formattedConvertedAmount,
    loading,
  } = useCurrencyExchange(sourceCountry, destinationCountry, currentAmount);

  const exchangeRateText = useMemo(() => {
    if (exchangeRate !== 0) {
      return `Exchange rate: ${exchangeRate}`;
    }
    return `Exchange rate: ${loading ? "Loading..." : "TBD"}`;
  }, [exchangeRate, loading]);

  const formattedSourceAmount = useMemo(() => {
    if (sourceCountry?.symbol) {
      return formatMoney(currentAmount, {
        symbol: sourceCountry?.symbol,
        precision: 2,
      });
    }
  }, [sourceCountry?.symbol, currentAmount]);

  useEffect(() => {
    if (sourceCountry && destinationCountry && currentAmount) {
      fetchCurrencyExchangeRate();
    }
  }, [sourceCountry, destinationCountry, currentAmount]);
  return (
    <Space direction="vertical" style={{ height: "11rem" }}>
      <Paragraph>
        {sourceCountry
          ? `${formattedSourceAmount} ${sourceCountry?.code}`
          : "Select source country"}
      </Paragraph>
      <Paragraph>
        {sourceCountry && destinationCountry ? ` = ` : " & "}
      </Paragraph>

      <Paragraph>
        {destinationCountry && currentAmount !== 0
          ? `${formattedConvertedAmount} ${destinationCountry?.code}`
          : "Select destination country and amount"}
      </Paragraph>
      <Paragraph>{exchangeRateText}</Paragraph>
    </Space>
  );
};

export default ConversionDisplay;
