import { useId, useState } from "react";
import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type InputProps<T extends FieldValues> = {
  label?: string;
  type: "text" | "number" | "email" | "password";
  name: Path<T>;
  labelStyles?: string;
  inputStyles?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
};

const Input = <T extends FieldValues>({
  label,
  type,
  name,
  placeholder,
  labelStyles,
  inputStyles,
  register,
  errors,
}: InputProps<T>) => {
  const [inputType, setInputType] = useState(type);
  const id = useId();
  const error = errors?.[name];

  const handleShowPassword = () => {
    setInputType((prev) => {
      if (prev === "password") return "text";
      else return "password";
    });
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={`${id}-${String(name)}`}
          className={
            labelStyles
              ? labelStyles
              : "text-sm text-gray-600 after:content-['*'] after:ml-1 after:text-red-500"
          }
        >
          {label}
        </label>
      )}
      <div className="w-full relative flex items-center">
        <input
          id={`${id}-${String(name)}`}
          type={inputType}
          className={
            inputStyles
              ? inputStyles
              : "w-full px-3 py-2 text-sm outline-none border-[2px] border-gray-200 rounded transition-colors duration-300 ease-in-out focus:border-gray-500"
          }
          placeholder={placeholder}
          {...register(name, {
            valueAsNumber: type === "number",
          })}
        />
        {type === "password" &&
          (inputType === "password" ? (
            <FaEye
              className="text-gray-300 text-lg absolute right-5 cursor-pointer"
              onClick={handleShowPassword}
            />
          ) : (
            <FaEyeSlash
              className="text-gray-300 text-lg absolute right-5 cursor-pointer"
              onClick={handleShowPassword}
            />
          ))}
      </div>
      {error && (
        <span className="text-sm text-red-500 ml-1">
          {error.message as string}
        </span>
      )}
    </div>
  );
};

export default Input;
