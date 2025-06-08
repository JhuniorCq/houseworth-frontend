type InputProps = {
  label?: string;
  type: string;
  name: string;
  placeholder?: string;
};

const Input = ({ label, type, name, placeholder }: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor=""
          className="text-sm text-gray-600 after:content-['*'] after:ml-1 after:text-red-500"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        className="px-3 py-2 text-sm outline-none border-[2px] border-gray-200 rounded transition-colors duration-300 ease-in-out focus:border-gray-500"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
