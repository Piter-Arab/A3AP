"use server";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";

export async function login(formData: FormData) {
  const passwd = formData.get("password") as string;
  const hash = process.env.ADMIN_PASSWORD_HASH || "";

  // --- DEBUGGING START ---
  console.log("Password received:", passwd); // Check if you typed it right
  console.log("Hash from Env:", hash); // Check if this is undefined or empty!
  console.log("Hash Length:", hash.length); // Should be around 60 chars
  // --- DEBUGGING END ---

  const match = await bcrypt.compare(passwd, hash);

  if (match) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(secret);

    (await cookies()).set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
    });

    return { success: true };
  }
  return { success: false };
}
