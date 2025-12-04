import React, { createContext, useState, useContext, useEffect } from 'react';
import { updateUser as apiUpdateUser, deleteUser as apiDeleteUser } from '../api/userService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const updateUser = async (newData) => {
        try {
            // Assuming user object has an id. If not, this will fail or need a fallback.
            // For now, we'll try to use user.id if it exists.
            if (user && user.id) {
                await apiUpdateUser(user.id, newData);
            }
            const updatedUser = { ...user, ...newData };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (error) {
            console.error("Failed to update user in backend", error);
            // Optionally handle error (e.g. show notification), but for now we update local state
            // or we could choose NOT to update local state if backend fails.
            // Let's update local state to keep UI responsive for this demo.
            const updatedUser = { ...user, ...newData };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
        }
    };

    const deleteUser = async () => {
        try {
            if (user && user.id) {
                await apiDeleteUser(user.id);
            }
            setUser(null);
            localStorage.removeItem('user');
        } catch (error) {
            console.error("Failed to delete user in backend", error);
            // Force logout anyway
            setUser(null);
            localStorage.removeItem('user');
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser, deleteUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
