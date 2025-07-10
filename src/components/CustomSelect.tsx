import Select, {
  type Props as SelectProps,
  type GroupBase,
  type StylesConfig,
  type SingleValue,
} from "react-select";
import type { OptionType } from "../types/select";
import { useId } from "react";

const customStyles: StylesConfig<OptionType, boolean> = {
  control: (base, state) => ({
    ...base,
    borderWidth: "2px",
    borderColor: state.isFocused ? "#6b7280" : "#e5e7eb",
    outline: "none",
    boxShadow: "none",
    transition: "border-color 0.3s ease-in-out",
    "&:hover": {
      cursor: "text",
    },
  }),
};

interface CustomSelectProps
  extends Omit<
    SelectProps<OptionType, false, GroupBase<OptionType>>,
    "isMulti"
  > {
  label: string;
  options: OptionType[];
  placeholder?: string;
  onChange: (selected: SingleValue<OptionType>) => void;
  value: OptionType | null;
  errorMessage: string | undefined;
}

const CustomSelect = ({
  label,
  options,
  placeholder,
  onChange,
  value,
  errorMessage,
  ...props
}: CustomSelectProps) => {
  const id = useId();

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={`${id}-${props.name}`}
        className="text-sm text-gray-600 after:content-['*'] after:ml-1 after:text-red-500"
      >
        {label}
      </label>
      <Select
        id={`${id}-${props.name}`}
        options={options}
        isMulti={false}
        placeholder={placeholder}
        styles={customStyles}
        onChange={onChange}
        value={value}
        menuPortalTarget={document.body}
        {...props}
      />
      {errorMessage && (
        <span className="text-sm text-red-500 ml-1">{errorMessage}</span>
      )}
    </div>
  );
};

export default CustomSelect;
