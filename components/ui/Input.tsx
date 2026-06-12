import { cn } from "@/lib/utils";
import { type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes } from "react";

/** Build an id and the describedby/invalid wiring shared by all fields. */
function fieldIds(id: string | undefined, label: string | undefined, hint?: string, error?: string) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  return { inputId, hintId, errorId, describedBy };
}

const fieldBase =
  "w-full bg-card border border-border-base rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-subtle-foreground transition-colors focus:border-ring focus:outline-none";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({ label, error, hint, className, id, ...props }: InputProps) {
  const { inputId, hintId, errorId, describedBy } = fieldIds(id, label, hint, error);
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-muted-foreground">
          {label}
        </label>
      )}
      {hint && <p id={hintId} className="text-xs text-subtle-foreground">{hint}</p>}
      <input
        id={inputId}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        className={cn(fieldBase, error && "border-error", className)}
        style={{ transitionDuration: "var(--duration-fast)" }}
        {...props}
      />
      {error && <p id={errorId} role="alert" className="text-xs text-error">{error}</p>}
    </div>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Textarea({ label, error, hint, className, id, ...props }: TextareaProps) {
  const { inputId, hintId, errorId, describedBy } = fieldIds(id, label, hint, error);
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-muted-foreground">
          {label}
        </label>
      )}
      {hint && <p id={hintId} className="text-xs text-subtle-foreground">{hint}</p>}
      <textarea
        id={inputId}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        className={cn(fieldBase, "resize-y min-h-[100px]", error && "border-error", className)}
        style={{ transitionDuration: "var(--duration-fast)" }}
        {...props}
      />
      {error && <p id={errorId} role="alert" className="text-xs text-error">{error}</p>}
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
  const { inputId, errorId, describedBy } = fieldIds(id, label, undefined, error);
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-muted-foreground">
          {label}
        </label>
      )}
      <select
        id={inputId}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        className={cn(fieldBase, "appearance-none", error && "border-error", className)}
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
      {error && <p id={errorId} role="alert" className="text-xs text-error">{error}</p>}
    </div>
  );
}
