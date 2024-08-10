import React from "react";
import { useDispatch } from 'react-redux';
import authService from '../../Appwrite/auth';
import { logout } from '../../store/authSlice';

function LogoutBtn() {
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        try {
            await authService.logout();
            dispatch(logout());
        } catch (error) {
            console.error("Logout failed:", error);
            // Optionally, you could set an error state to display a message to the user
        }
    };

    return (
        <button
            className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
            onClick={logoutHandler}
            aria-label="Logout"
        >
            Logout
        </button>
    );
}

export default LogoutBtn;
