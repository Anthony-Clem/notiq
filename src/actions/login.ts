"use server";

import { loginSchema } from "@/lib/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/session";
import { isRedirectError } from "next/dist/client/components/redirect";
import { getUserByEmail } from "@/data/user";

export const login = async (credentials: z.infer<typeof loginSchema>) => {
  try {
    const { email, password } = loginSchema.parse(credentials);

    const user = await getUserByEmail(email);

    if (!user) {
      return {
        error: "Invalid credentials",
      };
    }

    const isPasswordCorrect = bcrypt.compareSync(
      password,
      user.password as string
    );

    if (!isPasswordCorrect) {
      return {
        error: "Invalid credentials",
      };
    }

    await createSession(user.id);

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
