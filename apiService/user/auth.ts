import envConfig from "@/config/env.config";

// Regestation API
export interface SignUpPayload {
  name?: string;
  image?: string;
  phone: string;
  email: string;
  password: string;
  role: string;
}

export interface SignUpResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
  };
}

export const signUp = async (
  payload: SignUpPayload,
): Promise<SignUpResponse> => {
  const body = {
    ...payload,
    name: payload?.name?.trim(),
    image:
      payload.image ??
      `https://avatar.vercel.sh/${payload.name}?text=${payload.name?.charAt(0) ?? ""}`,
  };

  const response = await fetch(
    `${envConfig.baseServerApi}/api/users/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    },
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Signup failed");
  }

  return data as SignUpResponse;
};

// Login API
export interface SignInPayload {
  email: string;
  password: string;
}
export interface SignInResponse {
  success?: boolean;
  message?: string;
  code?: string;
  token?: string;
  data: {
    id: string;
    name: string;
    email: string;
  };
}

export const signIn = async (
  payload: SignInPayload,
): Promise<SignInResponse> => {
  const response = await fetch(
    `${envConfig.baseServerApi}/api/auth/sign-in/email`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    },
  );

  const data = await response.json();

  if (data.message) {
    throw new Error(data?.message || "Signup failed");
  }

  return data as SignUpResponse;
};

// Forget Password API
export interface IForgetPassPayload {
  email: string;
  redirectTo?: string;
}
export interface IForgetPassResponse {
  message: string;
  status: boolean;
}
export const forgetPassword = async (
  payload: IForgetPassPayload,
): Promise<IForgetPassResponse> => {
  const response = await fetch(
    `${envConfig.baseServerApi}/api/auth/request-password-reset`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Signup failed");
  }

  return data as IForgetPassResponse;
};

// Reset Password
export interface IResetPasswordPayload {
  token: string;
  newPassword: string;
}
export interface IResetPasswordResponse {
  code: string;
  message: string;
}
export const resetPassword = async (
  payload: IResetPasswordPayload,
): Promise<IResetPasswordResponse> => {
  const response = await fetch(
    `${envConfig.baseServerApi}/api/auth/reset-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Signup failed");
  }

  return data as IResetPasswordResponse;
};

// Logout
export const logout = async () => {
  const response = await fetch(`${envConfig.baseServerApi}/api/users/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Logout failed");
  }

  return data;
};
