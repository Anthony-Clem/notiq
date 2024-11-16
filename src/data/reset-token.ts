import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await prisma.passwordRestToken.findUnique({
      where: { token },
    });

    return passwordResetToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await prisma.passwordRestToken.findFirst({
      where: { email },
    });

    return passwordResetToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const generateResetPasswordToken = async (email: string) => {
  const token = randomUUID();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await prisma.passwordRestToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await prisma.passwordRestToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};
