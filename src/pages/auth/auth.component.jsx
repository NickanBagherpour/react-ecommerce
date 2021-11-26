import React from "react";

import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

import {AuthPageContainer} from "./auth.styles";

const AuthPage = () => {
  return (
    <AuthPageContainer>
      <SignIn />
      <SignUp />
    </AuthPageContainer>
  );
};

export default AuthPage;