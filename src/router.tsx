import {createBrowserRouter} from "react-router-dom";
import Dashboard from "./routes/Dashboard.tsx";
import SignIn from "./components/SignIn.tsx";
import Header from "./components/Header.tsx";
import Signup from "./components/Signup.tsx";
import RootRedirect from "./routes/RootRedirect.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

const routes = [
    {path: '/', element: <RootRedirect />},
    {path: '/signin', element: <SignIn />},
    {path: '/signup', element: <Signup />},
    {path: '/dashboard', element:(<ProtectedRoute><Header /><Dashboard /></ProtectedRoute>)},

];

export const router = createBrowserRouter(routes);
