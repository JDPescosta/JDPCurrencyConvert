import { useState } from "react";
import "./App.css";

import CountrySelect from "./components/CountrySelect";
import CurrencyInput from "./components/CurrencyInput";
import ConversionDisplay from "./components/ConversionDisplay";

import { type Country } from "./types/Country.type";
import { Typography, Flex } from "antd";

const { Title, Text } = Typography;

function App() {
  const [sourceCountry, setSourceCountry] = useState<Country>();
  const [destinationCountry, setDestinationCountry] = useState<Country>();
  const [currentAmount, setCurrentAmount] = useState<number>(0);

  return (
    <Flex vertical align="center" gap={"small"}>
      <Title>Currency Converter</Title>

      <ConversionDisplay
        sourceCountry={sourceCountry}
        destinationCountry={destinationCountry}
        currentAmount={currentAmount}
      />

      <CountrySelect
        placeholder="Select source country..."
        currentCountry={sourceCountry}
        setCurrentCountry={setSourceCountry}
      />
      <CountrySelect
        placeholder="Select destination country..."
        currentCountry={destinationCountry}
        setCurrentCountry={setDestinationCountry}
      />

      <Flex align="center" gap={"small"}>
        <Text>Amount to convert: </Text>
        <CurrencyInput amount={currentAmount} setAmount={setCurrentAmount} />
      </Flex>
    </Flex>
  );
}

export default App;
