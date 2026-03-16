import {useAuth} from "../context/AuthContext.tsx";

const MyComponent = () => {

    const { session } = useAuth()

    return (
       <>
         <h1 className={'landing-header'}>Sign In</h1>
       </>
    );
};

export default MyComponent;
