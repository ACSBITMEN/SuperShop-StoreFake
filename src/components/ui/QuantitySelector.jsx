// src/components/ui/QuantitySelector.jsx
import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({ value, onChange, min = 1, max = 99 }) {
  const decrease = () => {
    if (value > min) onChange(value - 1);
  };

  const increase = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className="flex items-center border rounded-md w-fit">
      <button
        type="button"
        onClick={decrease}
        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-l-md"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="px-4 py-1">{value}</span>
      <button
        type="button"
        onClick={increase}
        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-r-md"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
