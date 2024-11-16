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
import { signupSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { signup } from "@/actions/signup";
import LoadingButton from "../common/loading-button";
import { toast } from "sonner";

const SignupForm = () => {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (credentials: z.infer<typeof signupSchema>) => {
    startTransition(async () => {
      const { error } = await signup(credentials);
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

              <FormMessage className="text-xs -pt-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <Label>Password</Label>
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
              <p className="text-6 text-neutral-600">
                &#9432; At least 8 charcters
              </p>
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
          Sign up
        </LoadingButton>
      </form>
    </Form>
  );
};

export default SignupForm;
