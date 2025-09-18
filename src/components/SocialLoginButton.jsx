import React from "react";

const SocialLoginButton = ({ icon: Icon, text }) => {
  return (
    <button className="flex items-center justify-center w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-50 gap-2 cursor-pointer">
      {Icon && <Icon className="mr-2" />}
      <span className="text-gray-700">{text}</span>
    </button>
  );
};

export default SocialLoginButton;
