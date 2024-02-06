import { ButtonHTMLAttributes, ReactNode } from "react";

const ButtonTheme = {
  base: "rounded-md font-semibold",
  colors: {
    default: "bg-none text-slate-950 dark:text-gray-400",
    primary:
      "from-blue-700 dark:from-blue-900 to-sky-500 dark:to-sky-700 bg-gradient-to-br active:from-blue-800 active:to-blue-600  dark:active:from-blue-950 dark:active:to-blue-900 text-gray-50 dark:text-gray-200",
    secondary: "",
    transparent:
      "bg-transparent active:bg-gray-100 dark:active:bg-gray-800 text-slate-950 dark:text-gray-400",
    transparentInverse:
      "bg-transparent active:bg-gray-100 dark:active:bg-gray-800 text-gray-100 dark:text-gray-400",
  },
  variants: {
    bordered: "bg-none outline-1 outline outline-gray-500",
    default: "border-[1.5px] border-gray-500",
    solid: "border-0",
  },
  sizes: {
    default: "text-[1rem]",
    lg: "p-2 text-[1.2rem] xl:text-[1.4rem]",
    md: "p-2 text-[1rem] xl:text-[1.2rem]",
    sm: "p-2 text-[0.8rem] xl:text-[1rem]",
  },
};

type ButtonProps = {
  ButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  children: ReactNode;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "transparent"
    | "transparentInverse";
  size?: "default" | "lg" | "md" | "sm";
  variant?: "bordered" | "default" | "solid";
};

function Button({
  ButtonProps,
  children,
  color = "default",
  size = "default",
  variant = "default",
}: ButtonProps) {
  return (
    <button
      {...ButtonProps}
      className={`${ButtonTheme.base} ${ButtonTheme.colors[color]} ${ButtonTheme.variants[variant]} ${ButtonTheme.sizes[size]} ${ButtonProps?.className}`}
    >
      {children}
    </button>
  );
}

export default Button;
