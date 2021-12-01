import React, {useState} from "react";
import {useDispatch} from "react-redux";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import {
    SignInContainer,
    SignInTitle,
    ButtonsBarContainer
} from './sign-in.styles';

import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions'

const SignIn = ({doEmailSignInStart, doGoogleSignInStart}) => {

    const [userCredentials, setCredentials] = useState({email: '', password: ''});

    const dispatch = useDispatch();


    const {email, password} = userCredentials;


    const handleGoogleSignInClick =  () => {
        dispatch(googleSignInStart())
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(emailSignInStart({email, password}))
    };

    const handleChange = (event) => {
        const {name, value} = event.target;

        setCredentials({
            ...userCredentials,
            [name]: value,
        });
    };

    return (
        <SignInContainer>
            <SignInTitle>I already have an account</SignInTitle>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    name="email"
                    type="email"
                    onChange={handleChange}
                    value={email}
                    label="Email"
                    required
                />
                <FormInput
                    name="password"
                    type="password"
                    value={password}
                    onChange={handleChange}
                    label="Password"
                    required
                />
                <ButtonsBarContainer>
                    <CustomButton type='submit'> Sign in </CustomButton>
                    <CustomButton type='button' onClick={handleGoogleSignInClick/*signInWithGoogle*/}  isGoogleSignIn>
                        Sign in with Google
                    </CustomButton>
                </ButtonsBarContainer>
            </form>
        </SignInContainer>
    );

}

export default SignIn;
