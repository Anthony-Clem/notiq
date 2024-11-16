import AuthWrapper from "@/components/auth/auth-wrapper";
import ResetPasswordForm from "@/components/auth/reset-password-form";

const ResetPassword = () => {
  return (
    <AuthWrapper
      cardTitle="Reset Your Password"
      cardDescription="Choose a new password to secure your account."
    >
      <ResetPasswordForm />
    </AuthWrapper>
  );
};

export default ResetPassword;
