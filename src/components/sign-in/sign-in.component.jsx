import React from "react";
import {connect} from "react-redux";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {
    signInWithGoogle,
    customSignInWithEmailAndPassword,
} from "../../firebase/firebase.utils";

import {
    SignInContainer,
    SignInTitle,
    ButtonsBarContainer
} from './sign-in.styles';

import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions'

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
        };
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const {email, password} = this.state;

            this.props.doEmailSignInStart(email, password);
        // try {
        //     await customSignInWithEmailAndPassword(email, password);
        //     this.setState({email: "", password: ""});
        // } catch (error) {
        //     console.log(error);
        // }
    };

    handleChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value,
        });
    };

    render() {
        return (
            <SignInContainer>
                <SignInTitle>I already have an account</SignInTitle>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name="email"
                        type="email"
                        onChange={this.handleChange}
                        value={this.state.email}
                        label="Email"
                        required
                    />
                    <FormInput
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        label="Password"
                        required
                    />
                    <ButtonsBarContainer>
                        <CustomButton type='submit'> Sign in </CustomButton>
                        <CustomButton type='button' onClick={this.props.doGoogleSignInStart/*signInWithGoogle*/}
                                      isGoogleSignIn>
                            Sign in with Google
                        </CustomButton>
                    </ButtonsBarContainer>
                </form>
            </SignInContainer>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    doGoogleSignInStart: () => dispatch(googleSignInStart()),
    doEmailSignInStart: (email,password) => dispatch(emailSignInStart({email,password})),
});

export default connect(null, mapDispatchToProps)(SignIn);
