import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import authService from "./Appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from './components';
import './App.css';

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        authService.getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login({ userData }));
                } else {
                    dispatch(logout());
                }
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
                dispatch(logout());
            })
            .finally(() => setLoading(false));
    }, [dispatch]);

    return (
        loading ? (
            <div className='min-h-screen flex justify-center items-center bg-gray-400'>
                <p>Loading...</p>
            </div>
        ) : (
            <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
                <div className='w-full block'>
                    <Header />
                    <main>
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            </div>
        )
    );
}

export default App;
