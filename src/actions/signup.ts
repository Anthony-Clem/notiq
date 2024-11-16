"use server";

import { getUserByEmail } from "@/data/user";
import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/lib/schemas";
import { createSession } from "@/lib/session";
import bcrypt from "bcryptjs";
import { isRedirectError } from "next/dist/client/components/redirect";
import { z } from "zod";

export const signup = async (credentials: z.infer<typeof signupSchema>) => {
  try {
    const { email, password } = signupSchema.parse(credentials);

    const existingEmail = await getUserByEmail(email);

    if (existingEmail) {
      return {
        error: "Email already taken",
      };
    }

    const hash = bcrypt.hashSync(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hash,
      },
    });

    await createSession(newUser.id);

    return {
      error: null,
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return {
      error: "Something went wrong",
    };
  }
};
