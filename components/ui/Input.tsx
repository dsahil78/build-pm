import { cn } from "@/lib/utils";
import { type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({ label, error, hint, className, id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-grey-300">
          {label}
        </label>
      )}
      {hint && <p className="text-xs text-grey-500">{hint}</p>}
      <input
        id={inputId}
        className={cn(
          "w-full bg-brand-grey border border-[#333] rounded-lg px-4 py-3 text-sm text-white placeholder:text-grey-600 transition-colors focus:border-brand-coral focus:outline-none",
          error && "border-error",
          className
        )}
        style={{ transitionDuration: "var(--duration-fast)" }}
        {...props}
      />
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Textarea({ label, error, hint, className, id, ...props }: TextareaProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-grey-300">
          {label}
        </label>
      )}
      {hint && <p className="text-xs text-grey-500">{hint}</p>}
      <textarea
        id={inputId}
        className={cn(
          "w-full bg-brand-grey border border-[#333] rounded-lg px-4 py-3 text-sm text-white placeholder:text-grey-600 transition-colors focus:border-brand-coral focus:outline-none resize-y min-h-[100px]",
          error && "border-error",
          className
        )}
        style={{ transitionDuration: "var(--duration-fast)" }}
        {...props}
      />
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: readonly { value: string; label: string }[];
  placeholder?: string;
}

export function Select({ label, error, options, placeholder, className, id, ...props }: SelectProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-grey-300">
          {label}
        </label>
      )}
      <select
        id={inputId}
        className={cn(
          "w-full bg-brand-grey border border-[#333] rounded-lg px-4 py-3 text-sm text-white transition-colors focus:border-brand-coral focus:outline-none appearance-none",
          error && "border-error",
          className
        )}
        style={{ transitionDuration: "var(--duration-fast)" }}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}
