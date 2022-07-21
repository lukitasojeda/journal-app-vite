import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

import { removeErrorAction, setErrorAction } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';


export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector( state => state.ui );

    const [ formValues, handleInputChange, reset ] = useForm({
        name: 'Hernando',
        email: 'nando@gmail.com',
        password: '123456',
        password2: '123456'
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if( isFormValid() ) {
            dispatch( startRegisterWithEmailPasswordName(email, password, name) );
        };

    }

    const isFormValid = () => {
        
        if( validator.isEmpty(name) ) {

            dispatch( setErrorAction('Name is required') );
            return false;

        } else if ( !validator.isEmail(email) ) {

            dispatch( setErrorAction('Must be a valid email!') );
            return false

        } else if ( password.length <= 5 ) {

            dispatch( setErrorAction('Password should be at least 5 characters') );
            return false;

        }  else if ( password !== password2 ) {

            dispatch( setErrorAction('Passwords are not the same') );
            return false;
            
        }

        dispatch( removeErrorAction() )

            return true;
    }

    return (
        <>
            <h3 className='auth__title' >Register</h3>
            <form
                onSubmit={handleRegister}
            >

                {
                    msgError &&
                    (
                        <div className='auth__alert-error'>
                            { msgError }
                        </div>
                    )
                }

                <input
                    className='auth__input'
                    type='text'
                    placeholder='Name'
                    name='name'
                    autoComplete='off'
                    value={name}
                    onChange={handleInputChange}
                />

                <input
                    className='auth__input'
                    type='text'
                    placeholder='Email'
                    name='email'
                    autoComplete='off'
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    className='auth__input'
                    type='password'
                    placeholder='Password'
                    name='password'
                    autoComplete='off'
                    value={password}
                    onChange={handleInputChange}
                />

                <input
                    className='auth__input'
                    type='password'
                    placeholder='Confirm password'
                    name='password2'
                    autoComplete='off'
                    value={password2}
                    onChange={handleInputChange}
                />

                <button
                    type='submit'
                    className='btn btn-primary btn-block mb-1'
                >
                    Registrarse
                </button>



                <Link to='/auth/login'
                    className='link'
                >
                    Already registered?
                </Link>

            </form>
        </>
    );
};