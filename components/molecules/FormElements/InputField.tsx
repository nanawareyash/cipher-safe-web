import { HTMLAttributes, InputHTMLAttributes, ReactNode, useRef } from "react";

import Text from "@/atoms/Text/Text";

type InputFieldProps = {
  className?: string;
  endElement?: ReactNode;
  InputProps?: InputHTMLAttributes<HTMLInputElement>;
  label?: string;
  LabelProps?: HTMLAttributes<HTMLParagraphElement>;
  required?: true | false;
  startElement?: ReactNode;
};

function InputField({
  className,
  endElement,
  InputProps,
  label,
  LabelProps,
  required = false,
  startElement,
}: InputFieldProps) {
  const startElementRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`flex flex-col justify-between gap-2 ${className}`}>
      {label && (
        <Text TextProps={LabelProps} variant="label">
          {label} {required && <span className="text-red-500">*</span>}
        </Text>
      )}
      <div className="flex flex-nowrap items-center rounded-md border-[1.5px] border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 text-slate-950 dark:text-gray-400 focus:outline-none focus-within:border-gray-500">
        {startElement && (
          <div
            className="text-gray-600 dark:text-gray-400 my-2 px-2 min-w-8 w-8 border-e-[1px] border-gray-300 dark:border-gray-400"
            ref={startElementRef}
          >
            {startElement}
          </div>
        )}
        <input
          enterKeyHint="done"
          {...InputProps}
          className={`bg-inherit p-3 text-[0.8rem] xl:text-md rounded-md min-w-0 grow placeholder:dark:text-gray-500 ${InputProps?.className}`}
        />
        {endElement && (
          <div className="text-gray-600 dark:text-gray-400 my-2 px-2 min-w-8 w-8 border-s-[1px] border-gray-300 dark:border-gray-400">
            {endElement}
          </div>
        )}
      </div>
    </div>
  );
}

export default InputField;
