import { NextRequest, NextResponse } from "next/server";
import envConfig from "@/config/env.config";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const response = await fetch(
      `${envConfig.baseServerApi}/api/auth/verify-email?token=${encodeURIComponent(
        token,
      )}`,
      {
        method: "GET",
        cache: "no-store",
      },
    );

    const data = await response.json();

    console.log("Verification response:", data);

    if (response.ok && data.status) {
      return NextResponse.redirect(
        `${envConfig.baseClientUrl}/verify-email?verified=true`,
      );
    }

    return NextResponse.redirect(
      new URL(
        `/not-verify?error=${encodeURIComponent(
          data.message ?? "Verification failed",
        )}`,
        req.url,
      ),
    );
  } catch (error: unknown) {
    return NextResponse.redirect(
      new URL(
        `/not-verify?error=${encodeURIComponent(
          error instanceof Error ? error.message : "Verification failed",
        )}`,
        req.url,
      ),
    );
  }
}
