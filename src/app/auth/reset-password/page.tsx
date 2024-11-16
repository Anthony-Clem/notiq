import AuthWrapper from "@/components/auth/auth-wrapper";
import ResetPasswordForm from "@/components/auth/reset-password-form";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

const ResetPassword = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="animate-spin text-primary" />
        </div>
      }
    >
      <AuthWrapper
        cardTitle="Reset Your Password"
        cardDescription="Choose a new password to secure your account."
      >
        <ResetPasswordForm />
      </AuthWrapper>
    </Suspense>
  );
};

export default ResetPassword;
