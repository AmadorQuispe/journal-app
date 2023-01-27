import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
const initial = {
    email:'',
    password:''
}
export const LoginScreen = () => {
    const dispatch = useDispatch();
    const {loading} = useSelector( state => state.ui );
    const [values,handleInputChanges] = useForm(initial);
    const {email,password} = values;
    const handleSubmit =(e) =>{
        e.preventDefault();
        dispatch(startLoginEmailPassword(email,password));
    }
    const handleGoogle = () =>{
        dispatch(startGoogleLogin());
    }
    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form onSubmit={handleSubmit} className='animate__animated animate__fadeIn'>

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={handleInputChanges}
                    className="auth__input"
                    autoComplete="off"
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={handleInputChanges}
                    className="auth__input"
                />


                <button
                    type="submit"
                    disabled={ loading }
                    className="btn btn-primary btn-block"
                >
                    Login
                </button>

                
                <div className="auth__social-networks">
                    <p>Login with social networks</p>

                    <div 
                        className="google-btn"
                        onClick={handleGoogle}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link 
                    to="/auth/register"
                    className="link"
                >
                    Create new account    
                </Link>

            </form>
        </>
    )
}
