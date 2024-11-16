import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const key = new TextEncoder().encode(process.env.AUTH_SECRET);

const cookie = {
  name: "session",
  options: {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as "lax",
    path: "/",
  },
  duration: 30 * 24 * 60 * 60 * 1000,
};

export const encrypt = async (payload: JWTPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30day")
    .sign(key);
};

export const decrypt = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
};

export const createSession = async (userId: string) => {
  const expires = new Date(Date.now() + cookie.duration);
  const session = await encrypt({ userId, expires });

  (await cookies()).set(cookie.name, session, { ...cookie.options, expires });
  redirect("/dashboard");
};

export const verifySession = async () => {
  const cookieValue = (await cookies()).get(cookie.name)?.value;

  if (!cookieValue) {
    redirect("/auth/login");
  }

  const session = await decrypt(cookieValue);

  if (!session?.userId) {
    redirect("/auth/login");
  }

  return { userId: session.userId };
};

export const deleteSession = async () => {
  (await cookies()).delete(cookie.name);
  redirect("/auth/login");
};
