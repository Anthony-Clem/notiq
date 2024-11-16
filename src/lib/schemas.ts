import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email({
    message: "ⓘ Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be 8 characters",
  }),
});

export const loginSchema = z.object({
  email: z.string().min(1, {
    message: "Required",
  }),
  password: z.string().min(1, {
    message: "Required",
  }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: "ⓘ Please enter a valid email address",
  }),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, {
      message: "Password must be 8 characters",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be 8 characters",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
