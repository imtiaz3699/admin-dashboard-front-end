import React from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";

interface InputWithLabelProps {
  label: string;
  name: string;
  type?: "text" | "number" | "email" | "password" | "date" | "time" | string;
  id?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  min?: string;
  max?: string;
  step?: number;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  hint?: string;
  errorMessage?:string;
  required?:boolean;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  name,
  type = "text",
  id,
  placeholder,
  value,
  onChange,
  className = "",
  min,
  max,
  step,
  disabled = false,
  success = false,
  error = false,
  hint,
  errorMessage,
  required = false,
}) => {
  return (
    <div className="w-full">
      <Label htmlFor={id || name}>
        {label} {required && <span className="text-error-500">*</span>} 
      </Label>
      <Input
        id={id || name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        success={success}
        error={error}
        hint={hint}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default InputWithLabel;
