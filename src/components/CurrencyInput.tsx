import { useCallback, useMemo } from "react";
import { InputNumber } from "antd";
import { debounce } from "lodash";

interface CurrencyInputProps {
  amount: number;
  setAmount: (amount: number) => void;
}

const CurrencyInput = ({ amount, setAmount }: CurrencyInputProps) => {
  const handleChange = useCallback(
    (value: number | null) => {
      if (value !== null) {
        setAmount(value);
      }
    },
    [setAmount]
  );

  const debouncedSetAmount = useMemo(() => {
    return debounce(handleChange, 300);
  }, [handleChange]);

  return (
    <InputNumber
      value={amount}
      onChange={debouncedSetAmount}
      style={{ width: "10rem" }}
    />
  );
};

export default CurrencyInput;
