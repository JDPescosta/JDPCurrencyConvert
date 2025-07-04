import { useState, useEffect, useMemo } from 'react'
import './App.css'

import CountrySelect from './components/CountrySelect'
import CurrencyInput from './components/CurrencyInput'
import useCurrencyExchange from './hooks/useCurrencyExchange'
import { formatMoney } from 'accounting-js';

import { type Country } from './types/Country.type';

function App() {
  const [sourceCountry, setSourceCountry] = useState<Country>();
  const [destinationCountry, setDestinationCountry] = useState<Country>();
  const [currentAmount, setCurrentAmount] = useState<number>(0);
  const { exchangeRate, fetchCurrencyExchangeRate, formattedConvertedAmount } = useCurrencyExchange(sourceCountry, destinationCountry, currentAmount);

  const formattedSourceAmount = useMemo(() => {
    if (sourceCountry?.symbol) {
      return formatMoney(currentAmount, {
        symbol: sourceCountry?.symbol,
        precision: 2,
      });
    }
  }, [sourceCountry?.symbol, currentAmount]);
  
  useEffect(() => {
    if(sourceCountry && destinationCountry && currentAmount) {
      fetchCurrencyExchangeRate();
    }
  }, [sourceCountry, destinationCountry, currentAmount]);

  return (
    <>
    <div>
      <h1>Currency Converter</h1>
    </div>
    <div>
      <h2>
      {formattedSourceAmount} {sourceCountry?.code}
      </h2> 
      <h2>
        =
      </h2>
      <h2>
        {formattedConvertedAmount} {destinationCountry?.code}
      </h2>
      <h2>
        Exchange rate: {exchangeRate}
      </h2>
    </div>
      <div>
        <CountrySelect placeholder="Select source country..." currentCountry={sourceCountry} setCurrentCountry={setSourceCountry}  />
        <CountrySelect placeholder="Select destination country..." currentCountry={destinationCountry} setCurrentCountry={setDestinationCountry}  />
      </div>
      <div>
        <CurrencyInput amount={currentAmount} setAmount={setCurrentAmount} />
      </div>
    </>
  )
}

export default App
