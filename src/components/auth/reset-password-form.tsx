"use client";

import { resetPasswordSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import LoadingButton from "../common/loading-button";
import { resetPassword } from "@/actions/reset-password";
import { useRouter, useSearchParams } from "next/navigation";

const form = useForm<z.infer<typeof resetPasswordSchema>>({
  resolver: zodResolver(resetPasswordSchema),
  defaultValues: {
    password: "",
    confirmPassword: "",
  },
});

const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      router.push("/auth/forgot-password");
    }
  }, [token, router]);

  if (!token) {
    return null;
  }

  const onSubmit = (credentials: z.infer<typeof resetPasswordSchema>) => {
    startTransition(async () => {
      await resetPassword({ credentials, token });
      // toast.error(error);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <Label>New Password</Label>
              <div className="relative">
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    className={cn(
                      form.formState.errors.password &&
                        "border-red-500 focus-visible:ring-red-500 focus-visible:border-input transition-all"
                    )}
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <Label>Confirm New Password</Label>
              <div className="relative">
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    className={cn(
                      form.formState.errors.password &&
                        "border-red-500 focus-visible:ring-red-500 focus-visible:border-input transition-all"
                    )}
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <LoadingButton
          loading={isPending}
          className="w-full"
          size="lg"
          disabled={isPending}
          type="submit"
        >
          Login
        </LoadingButton>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
