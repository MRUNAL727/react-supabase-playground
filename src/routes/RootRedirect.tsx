import {useAuth} from "../context/AuthContext.tsx";
import {Navigate} from "react-router-dom";


const MyComponent = () => {
    const { session, loading } = useAuth();

    console.log(session)
    if (loading) {
        return <div>Loading...</div>; // or spinner
    }

    return session ? <Navigate to={'/dashboard'}/> : <Navigate to={'/signin'}/>;
};

export default MyComponent;
