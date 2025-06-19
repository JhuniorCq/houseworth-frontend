import Select, {
  type Props as SelectProps,
  type GroupBase,
  type StylesConfig,
  type SingleValue,
} from "react-select";
import type { OptionType } from "../types/select";
import { useId } from "react";

const customStyles: StylesConfig<OptionType, boolean> = {
  // Arreglar estilos para los Select
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
    <div className="flex flex-col gap-1">
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
        {...props}
      />
      {errorMessage && (
        <span className="text-xs text-red-500">{errorMessage}</span>
      )}
    </div>
  );
};

export default CustomSelect;
