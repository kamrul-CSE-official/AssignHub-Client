"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import * as z from "zod";
import {
  Lock,
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  Shield,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState, useMemo, Suspense } from "react";
import { cn } from "@/lib/utils";
import { resetPassword } from "@/apiService/user/auth";

const PASSWORD_MIN = 8;
const PASSWORD_MAX = 32;

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(1, "Password is required")
      .min(PASSWORD_MIN, `Password must be at least ${PASSWORD_MIN} characters`)
      .max(
        PASSWORD_MAX,
        `Password must be less than ${PASSWORD_MAX} characters`,
      )
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: z.string().trim().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

// Password strength indicator component
function PasswordStrengthIndicator({ password }: { password: string }) {
  const strength = useMemo(() => {
    if (!password)
      return {
        score: 0,
        label: "",
        color: "bg-gray-200",
        textColor: "text-gray-400",
      };

    let score = 0;
    if (password.length >= PASSWORD_MIN) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const levels = [
      { label: "Very Weak", color: "bg-red-500", textColor: "text-red-500" },
      { label: "Weak", color: "bg-orange-500", textColor: "text-orange-500" },
      { label: "Fair", color: "bg-yellow-500", textColor: "text-yellow-500" },
      { label: "Good", color: "bg-blue-500", textColor: "text-blue-500" },
      { label: "Strong", color: "bg-green-500", textColor: "text-green-500" },
    ];

    return {
      score,
      ...levels[score],
    };
  }, [password]);

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-1.5 h-1.5">
        {[0, 1, 2, 3].map((level) => (
          <div
            key={level}
            className={cn(
              "flex-1 rounded-full transition-all duration-500",
              level < strength.score ? strength.color : "bg-gray-200",
            )}
          />
        ))}
      </div>
      <div className="flex justify-between items-center">
        <span
          className={cn(
            "text-xs font-medium transition-colors duration-300",
            strength.textColor,
          )}
        >
          {strength.label}
        </span>
        <span className="text-xs text-muted-foreground">
          {strength.score}/4
        </span>
      </div>
    </div>
  );
}

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      toast.success(data.message || "Password reset successfully!", {
        duration: 4000,
        icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
      });
      setTimeout(() => {
        router.push("/?reset=success");
      }, 2000);
    },
    onError: (error: Error) => {
      toast.error(
        error.message || "Failed to reset password. Please try again.",
      );
      form.setError("root", {
        message: error.message || "Failed to reset password. Please try again.",
      });
    },
  });

  const onSubmit = (data: ResetPasswordFormValues) => {
    if (!token) {
      toast.error("Invalid reset token");
      return;
    }
    resetPasswordMutation.mutate({
      token,
      newPassword: data.password,
    });
  };

  const isLoading = resetPasswordMutation.isPending;
  const password = form.watch("password");

  // Early return for invalid token
  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4 bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-red-100 dark:bg-red-950/50 p-4 rounded-full">
                <AlertCircle className="h-12 w-12 text-red-500" />
              </div>
            </div>
            <CardTitle className="text-2xl text-destructive">
              Invalid Reset Link
            </CardTitle>
            <CardDescription className="text-base">
              The reset link is missing or invalid. Please request a new
              password reset.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => router.push("/")}
              size="lg"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-linear-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Card className="w-full max-w-md shadow-xl border-0 dark:border dark:border-slate-800">
        <CardHeader className="text-center space-y-6 pb-8">
          <div className="flex justify-center">
            <div className="bg-primary/10 p-3 rounded-full">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold tracking-tight">
              Set New Password
            </CardTitle>
            <CardDescription className="mt-2 text-base">
              Create a strong password to secure your account
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {form.formState.errors.root && (
            <Alert
              variant="destructive"
              className="border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {form.formState.errors.root.message}
              </AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="New password"
                          maxLength={PASSWORD_MAX}
                          className="pl-10 pr-10 h-11 text-base"
                          {...field}
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          disabled={isLoading}
                          tabIndex={-1}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <PasswordStrengthIndicator password={field.value} />
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm new password"
                          maxLength={PASSWORD_MAX}
                          className="pl-10 pr-10 h-11 text-base"
                          {...field}
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          disabled={isLoading}
                          tabIndex={-1}
                          aria-label={
                            showConfirmPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Password requirements checklist */}
              <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
                <p className="text-xs font-medium text-muted-foreground">
                  Password requirements:
                </p>
                <ul className="space-y-1.5">
                  {[
                    {
                      label: `At least ${PASSWORD_MIN} characters`,
                      check: password.length >= PASSWORD_MIN,
                    },
                    {
                      label: "Contains uppercase & lowercase",
                      check: /[a-z]/.test(password) && /[A-Z]/.test(password),
                    },
                    {
                      label: "Contains at least one number",
                      check: /\d/.test(password),
                    },
                    {
                      label: "Contains at least one special character",
                      check: /[^A-Za-z0-9]/.test(password),
                    },
                  ].map((req, index) => (
                    <li key={index} className="flex items-center gap-2 text-xs">
                      <span
                        className={cn(
                          "shrink-0 h-4 w-4 rounded-full flex items-center justify-center transition-colors duration-300",
                          req.check
                            ? "bg-green-500 text-white"
                            : "bg-muted-foreground/20 text-muted-foreground",
                        )}
                      >
                        {req.check && <CheckCircle2 className="h-3 w-3" />}
                      </span>
                      <span
                        className={cn(
                          "transition-colors duration-300",
                          req.check
                            ? "text-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        {req.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                type="submit"
                className="w-full h-11 text-base font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Resetting...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex justify-center border-t pt-6 pb-6">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
