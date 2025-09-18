import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileImage from "../SvgImages/ProfileImage";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[267px] h-[538px] flex flex-col items-center justify-between gap-[113px] bg-gray-50 p-4">
        {/* Heading */}
        <div>
          <h1 className="text-4xl font-bold mb-6">
            Welcome to <p className="text-[#6358DC]">Unstop</p>
          </h1>
        </div>

        {/* Card */}
        <div className="  w-[267px] h-[311px] rounded-[20px] border border-gray-200 p-5 flex flex-col items-center text-center gap-5 bg-white">
          <ProfileImage />
          <div>
            <h2 className="text-base font-semibold text-[#6358DC]">
              {user.firstName} {user.lastName}
            </h2>
            <div className="text-[12px] p-2">
              <p className="m-1">{user.email}</p>
              <p className="capitalize">{user.gender}</p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className=" w-[137px] h-[48px] bg-[#6358DC] text-white rounded-[16px] flex items-center justify-center gap-[10px] cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
