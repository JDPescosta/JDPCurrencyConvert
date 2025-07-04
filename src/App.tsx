import { useState } from "react";
import "./App.css";

import CountrySelect from "./components/CountrySelect";
import CurrencyInput from "./components/CurrencyInput";
import ConversionDisplay from "./components/ConversionDisplay";

import { type Country } from "./types/Country.type";
import { Typography } from "antd";

const { Title } = Typography;

function App() {
  const [sourceCountry, setSourceCountry] = useState<Country>();
  const [destinationCountry, setDestinationCountry] = useState<Country>();
  const [currentAmount, setCurrentAmount] = useState<number>(0);

  return (
    <>
      <div>
        <Title>Currency Converter</Title>
      </div>

      <ConversionDisplay
        sourceCountry={sourceCountry}
        destinationCountry={destinationCountry}
        currentAmount={currentAmount}
      />

      <div>
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
      </div>
      <div>
        <CurrencyInput amount={currentAmount} setAmount={setCurrentAmount} />
      </div>
    </>
  );
}

export default App;
