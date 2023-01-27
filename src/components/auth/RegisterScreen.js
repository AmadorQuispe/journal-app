import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import isEmail from 'validator/lib/isEmail'
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPass } from '../../actions/auth';
const inititalState = {
    name: '',
    email: '',
    password: '',
    password2: ''
}
export const RegisterScreen = () => {
    const dispatch = useDispatch();
    const { ui: { msgError } } = useSelector(state => state);
    const [formValues, handleInputChanges] = useForm(inititalState);
    const { name, email, password, password2 } = formValues;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(startRegisterWithEmailPass(email,password,name))
        }
    }

    const isFormValid = () => {
        if (name.trim().length === 0) {
            dispatch(setError("El nombre no puede ser blanco"));
            return false;
        } else if (!isEmail(email)) {
            dispatch(setError("Email invalido"));
            return false;
        } else if (password !== password2 || password.length < 6) {
            dispatch(setError("Contraseña debe tener minimo 6 caracteres"));
            return false;
        }
        dispatch(removeError());
        return true;
    }
    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={handleSubmit} className='animate__animated animate__fadeIn'>
                {msgError && <div className='auth__alert-error'>
                    {msgError}
                </div>}
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={handleInputChanges}
                    className="auth__input"
                    autoComplete="off"
                />

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={handleInputChanges}
                    className="auth__input"
                    autoComplete="off"
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleInputChanges}
                    className="auth__input"
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    value={password2}
                    onChange={handleInputChanges}
                    className="auth__input"
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>



                <Link
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
