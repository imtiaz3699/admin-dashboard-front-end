import Label from "./Label";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  name: string;
  errors: string;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  value,
  onChange,
  label = "",
  required = false,
  name,
  errors,
  disabled = false,
}) => {
  let className = 'h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs focus:border-brand-300 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 '
  if (errors) {
    className += " border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800";
  }
  return (
    <div className="w-full">
      <Label htmlFor={name}>
        {label} {required && <span className="text-error-500">*</span>}
      </Label>

      <select
        name={name}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className={`${className}`}
        disabled={disabled}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors && (
        <p className="text-red-500 text-sm">{errors}</p>
      )}
    </div>
  );
};

export default Select;