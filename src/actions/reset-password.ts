"use server";

import { getPasswordResetTokenByToken } from "@/data/reset-token";
import { getUserByEmail } from "@/data/user";
import { resetPasswordSchema } from "@/lib/schemas";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

interface ResetPasswordProps {
  credentials: z.infer<typeof resetPasswordSchema>;
  token: string;
}

export const resetPassword = async ({
  credentials,
  token,
}: ResetPasswordProps) => {
  try {
    if (!token) {
      redirect("/auth/forgot-password");
    }

    const { password } = resetPasswordSchema.parse(credentials);

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
      redirect("/auth/forgot-password");
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return {
        error: "Token has expired",
      };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return {
        error: "Email does not exist",
      };
    }

    const hash = bcrypt.hashSync(password, 10);

    await prisma.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        password: hash,
      },
    });

    await prisma.passwordRestToken.delete({
      where: {
        id: existingToken.id,
      },
    });

    redirect("/auth/login");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return {
      error: "Something went wrong",
    };
  }
};
