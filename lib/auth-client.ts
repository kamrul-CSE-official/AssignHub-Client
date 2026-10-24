import envConfig from "@/config/env.config";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: envConfig.baseServerApi,
  fetchOptions: {
    credentials: "include",
  },
});

export const { signIn, signUp, useSession, signOut } = authClient;
