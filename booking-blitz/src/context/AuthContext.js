import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const instance = axios.create({
        baseURL: 'http://localhost:5000',
        headers: {
            'Content-Type': 'application/json',
            // Добавьте любые другие заголовки, если они необходимы
        }
    });

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await instance.get('/api/users/current');

                setUser(response.data);
            } catch (error) {
                console.error('Ошибка при получении текущего пользователя:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};