import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  type: "button" | "submit" | "reset";
  styles?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const Button = ({
  children,
  styles,
  type,
  disabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={
        styles
          ? styles
          : "bg-earth text-white text-sm px-6 py-2.5 rounded cursor-pointer transition-colors duration-300 ease-in-out hover:bg-earth-strong"
      }
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
