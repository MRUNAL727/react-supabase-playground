import {createBrowserRouter} from "react-router-dom";
import Dashboard from "./routes/Dashboard.tsx";
import SignIn from "./components/SignIn.tsx";
import Header from "./components/Header.tsx";

const routes = [
    {path: '/', element: <SignIn />},
    {path: '/dashboard', element:(<><Header /><Dashboard /></>)},
];

export const router = createBrowserRouter(routes);
