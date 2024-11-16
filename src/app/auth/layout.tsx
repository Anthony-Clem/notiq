import Logo from "@/components/common/logo";
import { Card } from "@/components/ui/card";

import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100">
      <Card className="sm:max-w-[540px] max-sm:h-screen min-w-screen w-full sm:p-12 p-6 flex flex-col items-center max-sm:justify-center">
        <Logo />
        {children}
      </Card>
    </div>
  );
};

export default AuthLayout;
