import {useAuth} from "../context/AuthContext.tsx";
import {Navigate} from "react-router-dom";
import type { ReactNode } from "react";


const MyComponent = ({ children }: { children: ReactNode }) => {
    const { session } = useAuth();



    return session ? <>{children}</> : <Navigate to={'/signin'}/>;
};

export default MyComponent;
