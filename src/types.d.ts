import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "user" | "partner" | "admin";
    } & DefaultSession["user"];
  }

  interface User {
    role: "user" | "partner" | "admin";
  }
}

export {}
