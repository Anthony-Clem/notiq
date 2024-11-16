import AuthWrapper from "@/components/auth/auth-wrapper";
import LoginForm from "@/components/auth/login-form";
import React from "react";

const LoginPage = () => {
  return (
    <AuthWrapper
      cardTitle="Welcome to Note"
      cardDescription="Please log in to continue"
      redirectText="Don't have an account? Sign up"
      showSocial
      href="/auth/signup"
    >
      <LoginForm />
    </AuthWrapper>
  );
};

export default LoginPage;
