import { HTMLAttributes, ReactNode } from "react";

const TextTheme = {
  base: "",
  colors: {
    default: "text-slate-950 dark:text-gray-400",
    defaultInverse: "text-gray-300 dark:text-gray-300",
    hyperlink: "text-blue-500",
    primary: "text-blue-600 dark:text-blue-400",
    primaryInverse: "text-gray-100 dark:text-blue-400",
    secondary: "text-slate-600 dark:text-gray-400",
    secondaryInverse: "text-gray-200 dark:text-slate-300",
  },
  variants: {
    default: "text-[1rem] lg:text-[1.1rem] xl:text-[1.2rem] 2xl:text-[1.3rem]",
    heading1:
      "font-extrabold text-[1.5rem] lg:text-[1.7rem] xl:text-[1.9rem] 2xl:text-[2.1rem]",
    heading2:
      "font-bold text-[1.3rem] lg:text-[1.5rem] xl:text-[1.7rem] 2xl:text-[1.9rem]",
    heading3:
      "font-semibold text-[1.1rem] lg:text-[1.3rem] xl:text-[1.5rem] 2xl:text-[1.7rem]",
    label:
      "font-semibold text-[0.8rem] lg:text-[0.9rem] xl:text-[1rem] 2xl:text-[1.1rem]",
    paragraph:
      "text-[0.8rem] lg:text-[0.9rem] xl:text-[1rem] 2xl:text-[1.1rem]",
    subHeading1:
      "font-semibold text-[1.1rem] lg:text-[1.3rem] xl:text-[1.5rem] 2xl:text-[1.7rem]",
    subHeading2:
      "font-semibold text-[0.9rem] lg:text-[1.1rem] xl:text-[1.3rem] 2xl:text-[1.5rem]",
    subHeading3:
      "font-semibold text-[0.7rem] lg:text-[0.9rem] xl:text-[1.1rem] 2xl:text-[1.3rem]",

    title:
      "font-semibold text-[1.2rem] lg:text-[1.3rem] xl:text-[1.4rem] 2xl:text-[1.5rem]",
  },
};

type TextProps = {
  children: ReactNode;
  color?:
    | "default"
    | "defaultInverse"
    | "hyperlink"
    | "primary"
    | "primaryInverse"
    | "secondary"
    | "secondaryInverse";
  TextProps?: HTMLAttributes<HTMLParagraphElement>;
  variant?:
    | "default"
    | "heading1"
    | "heading2"
    | "heading3"
    | "label"
    | "paragraph"
    | "subHeading1"
    | "subHeading2"
    | "subHeading3"
    | "title";
};

function Text({
  children,
  color = "default",
  TextProps,
  variant = "default",
}: TextProps) {
  return (
    <p
      {...TextProps}
      className={`${TextTheme.base} ${TextTheme.variants[variant]} ${TextTheme.colors[color]} ${TextProps?.className}`}
    >
      {children}
    </p>
  );
}

export default Text;
