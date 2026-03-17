import {Link} from "react-router-dom";


const Signup = () => {
    /**
     Challenge:
     * 1) In 'Signup.jsx', import the Link component
     * 2) Turn 'Sign in' into a link which routes back to 'Signin.jsx'
     * 3) Add the 'form-link' class to the link
     * 4) Save and test your link
     Hint: Check 'router.jsx' for the correct path
     */
    return (
        <>
            <h1 className="landing-header">Sign Up</h1>
            <div className="sign-form-container">
                <form
                    // action={}
                    aria-label="Sign up form"
                    aria-describedby="form-description"
                >
                    <div id="form-description" className="sr-only">
                        Use this form to create a new account. Enter your email and
                        password.
                    </div>

                    <h2 className="form-title">Sign up today!</h2>
                    <p>
                        Already have an account?{' '}
                        <Link to={'/'} className={'form-link'}>
                            Sign in
                        </Link>
                    </p>

                    <label htmlFor="email">Email</label>
                    <input
                        className="form-input"
                        type="email"
                        name="email"
                        id="email"
                        placeholder=""
                        required
                        aria-required="true"
                        //aria-invalid=
                        //aria-describedby=
                        //disabled=
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        className="form-input"
                        type="password"
                        name="password"
                        id="password"
                        placeholder=""
                        required
                        aria-required="true"
                        //aria-invalid=
                        //aria-describedby=
                        //disabled=
                    />

                    <button
                        type="submit"
                        className="form-button"
                        //disabled=
                        //aria-busy=
                    >
                        Sign Up
                        {/*'Signing up...' when pending*/}
                    </button>

                    {/* Error message */}
                </form>
            </div>
        </>
    );
};

export default Signup;
