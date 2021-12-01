import React, {useState} from "react";
import {connect} from "react-redux";

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

    const {email, password} = userCredentials;

    const handleSubmit = async (event) => {
        event.preventDefault();
        doEmailSignInStart(email, password);
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
                    <CustomButton type='button' onClick={doGoogleSignInStart/*signInWithGoogle*/}
                                  isGoogleSignIn>
                        Sign in with Google
                    </CustomButton>
                </ButtonsBarContainer>
            </form>
        </SignInContainer>
    );

}

const mapDispatchToProps = dispatch => ({
    doGoogleSignInStart: () => dispatch(googleSignInStart()),
    doEmailSignInStart: (email, password) => dispatch(emailSignInStart({email, password})),
});

export default connect(null, mapDispatchToProps)(SignIn);
