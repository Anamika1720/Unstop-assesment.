import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileImage from "../SvgImages/ProfileImage";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/auth/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const [confirmOpen, setConfirmOpen] = useState(false);

  const openConfirm = () => setConfirmOpen(true);
  const closeConfirm = () => setConfirmOpen(false);

  const handleLogout = () => {
    // Trigger confirmation modal
    openConfirm();
  };

  const confirmLogout = () => {
    localStorage.removeItem("user");
    closeConfirm();
    toast.success("Logged out successfully");
    navigate("/auth/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      {/* Heading */}
      <div className="mt-0 mb-16 text-center">
        <h1 className="text-[34px] leading-[40px] font-semibold text-gray-900 tracking-tight">
          Welcome to
        </h1>
        <div className="text-[36px] leading-[40px] font-extrabold text-[#6358DC] -mt-1 tracking-tight">
          Unstop
        </div>
      </div>

      {/* Profile Card */}
      <div className="w-full max-w-[340px] bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.06),_0_2px_6px_rgba(0,0,0,0.04)] p-7 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <ProfileImage />
          </div>
        </div>
        <h2 className="text-[16px] font-semibold text-[#6358DC] mb-1">
          {user.firstName} {user.lastName}
        </h2>
        <div className="text-[12px] text-gray-600 leading-5 mb-5">
          <p>{user.email}</p>
          <p className="capitalize">{user.gender}</p>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center justify-center h-10 px-6 rounded-xl bg-[#6358DC] text-white text-[14px] font-medium cursor-pointer"
        >
          Logout
        </button>
      </div>
      {/* Logout confirmation dialog */}
      <Dialog open={confirmOpen} onClose={closeConfirm}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirm} variant="text">
            Cancel
          </Button>
          <Button
            onClick={confirmLogout}
            variant="contained"
            sx={{ bgcolor: "#6358DC", ":hover": { bgcolor: "#564cd1" } }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HomePage;
