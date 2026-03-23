import {Link, useNavigate} from "react-router-dom";
import {useActionState} from "react";
import {useAuth} from "../context/AuthContext.tsx";



const Signup = () => {

    const { signUpUser } = useAuth();
    const navigate = useNavigate();

    const [error, submitAction, isPending] = useActionState<any, FormData>(
        async(_previousState: any, formData: FormData) => {
            const name = formData.get('name') as string;
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;
            const accountType = formData.get('account-type') as string;

           const { success, data, error } = await signUpUser(name, email, password, accountType)

            if(error){
                return new Error(error)
            }

            if(success && data?.session){
                alert('Account created successfully! Please verify your email.')
                navigate('/signin')
                return null
            }

            return null
        },
        null
    )
    return (
        <>
            <h1 className="landing-header">Sign Up</h1>
            <div className="sign-form-container">
                <form
                    action={submitAction}
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

                    <label htmlFor="email">Name</label>
                    <input
                        className="form-input"
                        type="text"
                        name="name"
                        id="name"
                        placeholder=""
                        required
                        aria-required="true"
                        aria-invalid={error ? 'true' : 'false'}
                        aria-describedby={error ? 'signup-error' : undefined}
                        disabled={isPending}
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        className="form-input"
                        type="email"
                        name="email"
                        id="email"
                        placeholder=""
                        required
                        aria-required="true"
                        aria-invalid={error ? 'true' : 'false'}
                        aria-describedby={error ? 'signup-error' : undefined}
                        disabled={isPending}
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
                        aria-invalid={error ? 'true' : 'false'}
                        aria-describedby={error ? 'signup-error' : undefined}
                        disabled={isPending}
                    />



                    <fieldset
                    className="form-fieldset"
                    aria-required="true"
                    aria-label="Select your role"
                    >
                    <legend>Select your role</legend>
                    <div className="radio-group">
                        <label>
                            <input type="radio" name="account-type" value="admin" required/>{' '}
                            Admin
                        </label>
                        <label>
                            <input type="radio" name="account-type" value="rep" required />{' '}
                            Sales Rep
                        </label>
                    </div>
                </fieldset>

                    <button
                        type="submit"
                        className="form-button"
                        disabled={isPending}
                        aria-busy={isPending}
                    >
                        { isPending ? 'Signing up...' : 'Sign up' }
                    </button>

                    {
                        error && (
                            <div>{error?.message}</div>
                        )
                    }

                </form>
            </div>
        </>
    );
};

export default Signup;
