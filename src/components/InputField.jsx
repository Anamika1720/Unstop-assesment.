import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

// A styled input matching the screenshot: light label, icon chip, tall field, rounded corners
const InputField = ({
  type,
  placeholder,
  value,
  onChange,
  icon: Icon,
  label,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="w-full">
      <div
        className={`flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 h-16 bg-gray-50 ${
          disabled ? "opacity-60" : ""
        }`}
      >
        {Icon && (
          <span className="inline-flex items-center justify-center text-gray-500 w-8 h-8 shrink-0">
            <Icon className="w-4 h-4" />
          </span>
        )}
        <div className="flex-1 flex flex-col leading-tight">
          {label && (
            <span className="text-[11px] text-gray-700 mb-0.5">{label}</span>
          )}
          <div className="flex items-center">
            <input
              type={inputType}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              className="flex-1 outline-none text-[15px] text-gray-900 placeholder:text-gray-400 bg-transparent disabled:cursor-not-allowed"
              disabled={disabled}
              required
            />
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                disabled={disabled}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputField;
