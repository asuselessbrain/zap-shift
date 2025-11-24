import Root from "@/Layouts/Root";
import BeARider from "@/pages/BeARider/BeARider";
import Covarage from "@/pages/Covarage/Covarage";
import Home from "@/pages/Home/Home";
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
            }
        ]
    }
])