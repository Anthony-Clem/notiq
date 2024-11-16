"use client";

import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { cn } from "@/lib/utils";
import LoadingButton from "../common/loading-button";
import { toast } from "sonner";
import Link from "next/link";
import { login } from "@/actions/login";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (credentials: z.infer<typeof loginSchema>) => {
    startTransition(async () => {
      const { error } = await login(credentials);
      toast.error(error);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Label>Email Address</Label>
              <FormControl>
                <Input
                  placeholder="email@example.com"
                  type="email"
                  className={cn(
                    form.formState.errors.email &&
                      "border-red-500 focus-visible:ring-red-500 focus-visible:border-input transition-all "
                  )}
                  {...field}
                  disabled={isPending}
                />
              </FormControl>

              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <Label>Password</Label>
                <Link
                  href="/auth/forgot-password"
                  className="text-6 text-neutral-600 hover:underline"
                >
                  Forgot?
                </Link>
              </div>
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

export default LoginForm;
