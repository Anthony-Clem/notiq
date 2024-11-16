import AuthWrapper from "@/components/auth/auth-wrapper";
import ForgotPasswordForm from "@/components/auth/forgot-password-form";
import React from "react";

const ForgotPasswordPage = () => {
  return (
    <AuthWrapper
      cardTitle="Forgotten your password?"
      cardDescription="Enter your email below, and we’ll send you a link to reset it."
    >
      <ForgotPasswordForm />
    </AuthWrapper>
  );
};

export default ForgotPasswordPage;
