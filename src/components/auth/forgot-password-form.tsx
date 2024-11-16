"use client";

import React, { useState, useTransition } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { forgotPasswordSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import LoadingButton from "../common/loading-button";
import { forgotPassword } from "@/actions/forgot-password";
import { z } from "zod";
import { cn } from "@/lib/utils";

const ForgotPasswordForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (credentials: z.infer<typeof forgotPasswordSchema>) => {
    startTransition(async () => {
      const { error, success } = await forgotPassword(credentials);
      if (error) {
        toast.error(error);
      } else if (success) {
        toast.success(success);
      }
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

        <LoadingButton
          loading={isPending}
          className="w-full"
          size="lg"
          disabled={isPending}
          type="submit"
        >
          Send Reset Link
        </LoadingButton>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
