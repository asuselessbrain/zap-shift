import AuthLayout from "@/Layouts/AuthLayout";
import Root from "@/Layouts/Root";
import About from "@/pages/About/About";
import BeARider from "@/pages/BeARider/BeARider";
import CalculatePricing from "@/pages/CalculatePricing/CalculatePricing";
import Covarage from "@/pages/Covarage/Covarage";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import NotFound from "@/pages/NotFound/NotFound";
import Register from "@/pages/Register/Register";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
         
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/coverage",
                element: <Covarage />,
                loader: () => fetch('/data/warehouses.json').then(res => res.json())
            },
            {
                path: "/be-a-rider",
                element: <BeARider />,
                loader: () => fetch('/data/warehouses.json').then(res => res.json())
            },
            {
                path: "/pricing",
                element: <CalculatePricing />,
                loader: () => fetch('/data/warehouses.json').then(res => res.json())
            },
            {
                path: "/about",
                element: <About />
            }
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
])