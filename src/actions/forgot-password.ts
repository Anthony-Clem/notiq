"use server";

import { generateResetPasswordToken } from "@/data/reset-token";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";
import { forgotPasswordSchema } from "@/lib/schemas";
import { z } from "zod";

export const forgotPassword = async (
  credentials: z.infer<typeof forgotPasswordSchema>
) => {
  try {
    const { email } = forgotPasswordSchema.parse(credentials);

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return {
        error: "No user with this email",
      };
    }

    const passwordResetToken = await generateResetPasswordToken(email);

    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token
    );

    return {
      success: "Reset email sent!",
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong",
    };
  }
};
