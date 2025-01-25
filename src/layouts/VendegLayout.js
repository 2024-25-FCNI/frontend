import React from "react";
import Navigacio from "../pages/Navigacio";
import { Outlet } from "react-router-dom";

export default function VendegLayout() {
    return (
        <>
            <Navigacio />
            <Outlet />
        </>
    );
}