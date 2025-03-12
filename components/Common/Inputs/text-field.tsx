"use client";
import React, {
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactElement,
  useState,
} from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface Props extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  disabled?: boolean;
  LabelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  InputProps?: InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;
  helperText?: string;
  helperTextProps?: HTMLAttributes<HTMLHeadingElement>;
  multiline?: boolean;
  inputSuffix?: ReactElement;
}

export default function TextField({
  InputProps,
  label,
  helperText,
  helperTextProps,
  multiline,
  LabelProps,
  inputSuffix,
  disabled = false,
  ...props
}: Props) {
  return (
    <div {...props} className={`flex gap-1 flex-col w-full ${props.className}`}>
      {label && (
        <label
          {...LabelProps}
          htmlFor={InputProps?.id}
          className={`sm:text-[.85rem] text-[0.7rem] ${LabelProps?.className}`}
        >
          {label}
        </label>
      )}

      <div className="flex items-center gap-2 relative">
        {multiline ? (
          <textarea
            {...InputProps}
            disabled={disabled}
            className={`w-full h-[150px] md:h-[200px] p-[9px] outline-none text-[#444] text-[.8rem] rounded-md border-[1.2px] focus:border-primary transition-all disabled:opacity-50 duration-300 resize-none ${InputProps?.className}`}
          />
        ) : (
          <input
            {...InputProps}
            disabled={disabled}
            className={`w-full p-[9px] outline-none text-[#444] text-[.8rem] rounded-md border-[1.2px] focus:border-primary transition-all disabled:opacity-50 duration-300 ${InputProps?.className}`}
          />
        )}

        <span className="absolute top-[50%] -translate-y-[50%] right-[10px]">
          {inputSuffix}
        </span>
      </div>

      <p
        {...helperTextProps}
        className={`pl-2 text-red-500 text-[.8rem] ${
          helperTextProps?.className
        } ${
          helperText
            ? "translate-y-0 opacity-1"
            : "-translate-y-[100%] opacity-0"
        } transition-all duration-300`}
      >
        {helperText && helperText}
      </p>
    </div>
  );
}

export function PasswordTextField(props: Omit<Props, "inputSuffix">) {
  const [show, setShow] = useState<boolean>(false);

  const toggle = () => setShow((prev) => !prev);

  return (
    <TextField
      {...props}
      inputSuffix={
        <span className="cursor-pointer text-primary" onClick={toggle}>
          {show ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
        </span>
      }
      InputProps={{
        ...props.InputProps,
        type: show ? "text" : "password",
      }}
    />
  );
}
