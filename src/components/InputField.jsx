import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const InputField = ({ type, placeholder, value, onChange, icon: Icon }) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex items-center border border-gray-300 rounded-lg text-base px-3 py-2 gap-2">
      {Icon && <Icon className="mr-2 text-gray-500" />}
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="flex-1 outline-none text-gray-700"
        required
      />
      {/* Toggle for password fields */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="ml-2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
};

export default InputField;
