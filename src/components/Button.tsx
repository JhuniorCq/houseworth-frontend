import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  styles?: string;
};

const Button = ({ children, styles, type }: ButtonProps) => {
  return (
    <button
      type={type ? type : "button"}
      className={
        styles
          ? styles
          : "bg-black text-white text-sm px-6 py-2.5 rounded cursor-pointer transition-colors duration-300 ease-in-out hover:bg-black/90"
      }
    >
      {children}
    </button>
  );
};

export default Button;
