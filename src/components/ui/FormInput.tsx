import React from 'react';

interface FormInputProps {
  label: string;
  type: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number | string;
  prefix?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  value,
  onChange,
  min,
  max,
  step,
  prefix
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className={`${prefix ? 'flex items-center' : ''}`}>
        {prefix && (
          <span className="bg-gray-200 px-3 py-2 rounded-l-md">{prefix}</span>
        )}
        <input
          type={type}
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`${prefix ? 'flex-1 rounded-r-md' : 'w-full rounded-md'} border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
      </div>
    </div>
  );
};

export default FormInput;
