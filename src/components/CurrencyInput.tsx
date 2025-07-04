import React, {useCallback} from 'react'
import { InputNumber } from 'antd'  


interface CurrencyInputProps { 
    amount: number,
    setAmount: (amount: number) => void 
}

const CurrencyInput = ({ amount, setAmount }: CurrencyInputProps) => {

    const handleChange = useCallback((value: number | null) => {
        if (value !== null) {
            setAmount(value);
        }
    }, [setAmount]);

    return (
        <InputNumber
            value={amount}
            onChange={handleChange}
            style={{ width: '10rem' }}
        />
    )
}

export default CurrencyInput;