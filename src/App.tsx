import { useState } from 'react'
import './App.css'

import CountrySelect from './components/CountrySelect'

function App() {
  const [sourceCountry, setSourceCountry] = useState<string>();
  const [destinationCountry, setDestinationCountry] = useState<string>();

  return (
    <>
      <div>
        <CountrySelect placeholder="Select source country..." countryName={sourceCountry} setCountryName={setSourceCountry}  />
        <CountrySelect placeholder="Select destination country..." countryName={destinationCountry} setCountryName={setDestinationCountry}  />
      </div>
    </>
  )
}

export default App
