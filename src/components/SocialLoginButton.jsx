import React from "react";

const SocialLoginButton = ({ icon: Icon, text }) => {
  return (
    <button className="flex h-12 items-center justify-center w-full border border-gray-200 rounded-xl px-5 hover:bg-gray-50 gap-3.5 cursor-pointer bg-white">
      {Icon && <Icon className="w-6 h-6" />}
      <span className="text-gray-700 text-[16px] leading-none font-medium">
        {text}
      </span>
    </button>
  );
};

export default SocialLoginButton;
