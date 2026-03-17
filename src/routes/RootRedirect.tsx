import {useAuth} from "../context/AuthContext.tsx";
import {Navigate} from "react-router-dom";


const MyComponent = () => {
    const { session } = useAuth();

    return session ? <Navigate to={'/dashboard'}/> : <Navigate to={'/signin'}/>;
};

export default MyComponent;
