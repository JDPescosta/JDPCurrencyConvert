import { useState, useEffect } from 'react'
import './App.css'

import CountrySelect from './components/CountrySelect'
import CurrencyInput from './components/CurrencyInput'
import useCurrencyExchange from './hooks/useCurrencyExchange'

function App() {
  const [sourceCountry, setSourceCountry] = useState<string>();
  const [destinationCountry, setDestinationCountry] = useState<string>();
  const [currentAmount, setCurrentAmount] = useState<number>(0);
  const { exchangeRate, fetchCurrencyExchangeRate, formattedConvertedAmount } = useCurrencyExchange(sourceCountry, destinationCountry, currentAmount);

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
      {currentAmount} {sourceCountry}
      </h2> 
      <h2>
        =
      </h2>
      <h2>
        {formattedConvertedAmount} {destinationCountry}
      </h2>
      <h2>
        Exchange rate: {exchangeRate}
      </h2>
    </div>
      <div>
        <CountrySelect placeholder="Select source country..." countryName={sourceCountry} setCountryName={setSourceCountry}  />
        <CountrySelect placeholder="Select destination country..." countryName={destinationCountry} setCountryName={setDestinationCountry}  />
      </div>
      <div>
        <CurrencyInput amount={currentAmount} setAmount={setCurrentAmount} />
      </div>
    </>
  )
}

export default App
