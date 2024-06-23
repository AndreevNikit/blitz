import React from "react";
import {Switch, Route, Redirect, Routes, Navigate} from 'react-router-dom'
import MainBlitz from "./components/menu/MainBlitz.js";
import Auth from "./components/Auth/Auth.js";

export const useRoutes = (isLogin) => {
    if (isLogin) {
        return (
            <>
                <Route path="/menu" element={<MainBlitz />} />
                <Route path="*" element={<Navigate to="/menu" />} />
            </>

        )
    }

    return (
        <>
        <Route path="/auth" element={<Auth />} />

    </>

    )
}