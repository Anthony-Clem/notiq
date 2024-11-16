import AuthWrapper from "@/components/auth/auth-wrapper";
import SignupForm from "@/components/auth/signup-form";
import React from "react";

const SignupPage = () => {
  return (
    <AuthWrapper
      cardTitle="Create your account"
      cardDescription="Sign up to start organizing your notes and boost your productivity."
      redirectText="Already have an account? Login"
      showSocial
      href="/auth/login"
    >
      <SignupForm />
    </AuthWrapper>
  );
};

export default SignupPage;
