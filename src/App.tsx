import { useState } from 'react'
import './App.css'

import CountrySelect from './components/CountrySelect'
import CurrencyInput from './components/CurrencyInput'

function App() {
  const [sourceCountry, setSourceCountry] = useState<string>();
  const [destinationCountry, setDestinationCountry] = useState<string>();
  const [currentAmount, setCurrentAmount] = useState<number>(0);

  return (
    <>
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
