import {
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import Text from "@/atoms/Text/Text";

type InputFieldProps = {
  className?: string;
  endElement?: ReactNode;
  InputProps?: InputHTMLAttributes<HTMLInputElement>;
  label?: string;
  LabelProps?: HTMLAttributes<HTMLParagraphElement>;
  required?: true | false;
  showError?: boolean;
  startElement?: ReactNode;
  validator?: (value: string) => boolean;
};

function InputField({
  className,
  endElement,
  InputProps,
  label,
  LabelProps,
  required = false,
  showError,
  startElement,
  validator,
}: InputFieldProps) {
  const [error, setError] = useState(showError);

  const startElementRef = useRef<HTMLDivElement>(null);

  const onKeyUp = InputProps?.onKeyUp;

  // Function to handle the validation
  const handleInputChange = (value: string) => {
    value && validator ? setError(!validator(value)) : setError(undefined);
  };

  // UseEffects to handle the error
  useEffect(() => {
    showError && setError(showError);
  }, [error]);

  useEffect(() => {
    setError(showError);
  }, [showError]);

  return (
    <div className={`flex flex-col justify-between gap-2 ${className}`}>
      {label && (
        <Text TextProps={LabelProps} variant="label">
          {label} {required && <span className="text-red-500">*</span>}{" "}
          <span className="ps-3">
            {error !== undefined &&
              (error ? (
                <i className="bi bi-x-circle-fill text-red-500"></i>
              ) : (
                <i className="bi bi-check-circle-fill text-green-600"></i>
              ))}
          </span>
        </Text>
      )}
      <div
        className={`flex flex-nowrap items-center rounded-md border-[1.5px] bg-white dark:bg-slate-800 text-slate-950 dark:text-gray-400 focus:outline-none focus-within:border-gray-500 
        ${
          error === undefined
            ? "border-gray-300 dark:border-gray-700"
            : error
              ? "border-red-500 focus-within:border-red-500"
              : "border-green-600 focus-within:border-green-600"
        }`}
      >
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
          onKeyUp={(event) => {
            handleInputChange(event.currentTarget.value);
            onKeyUp && onKeyUp(event);
          }}
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
