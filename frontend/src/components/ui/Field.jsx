import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

/**
 * Labelled input with an optional leading icon and a built-in show/hide
 * toggle for passwords. Used across every auth and settings form.
 */
function Field({
  label,
  icon: Icon,
  type = "text",
  className = "",
  hint,
  ...props
}) {
  const [reveal, setReveal] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword && reveal ? "text" : type;

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={props.id || props.name}
          className="mb-1.5 block text-[13px] font-semibold text-ink-700"
        >
          {label}
        </label>
      )}

      <div className="group relative">
        {Icon && (
          <Icon
            size={18}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400 transition-colors duration-200 group-focus-within:text-brand-600"
          />
        )}

        <input
          {...props}
          id={props.id || props.name}
          type={resolvedType}
          className={`w-full rounded-xl border border-ink-200 bg-ink-50/60 py-3 text-[15px] text-ink-900 placeholder:text-ink-400 transition-all duration-200 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10 ${
            Icon ? "pl-11" : "pl-4"
          } ${isPassword ? "pr-11" : "pr-4"}`}
        />

        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setReveal(r => !r)}
            aria-label={reveal ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 transition-colors duration-200 hover:text-ink-700"
          >
            {reveal ? (
              <AiOutlineEye size={20} />
            ) : (
              <AiOutlineEyeInvisible size={20} />
            )}
          </button>
        )}
      </div>

      {hint && <p className="mt-1.5 text-[12px] text-ink-400">{hint}</p>}
    </div>
  );
}

export default Field;
