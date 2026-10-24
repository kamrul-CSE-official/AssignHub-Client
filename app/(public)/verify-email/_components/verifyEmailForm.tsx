"use client";

import { useCallback, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const verified = searchParams.get("verified");

  const openAuth = useCallback((mode: "login" | "signup") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Email Verification</CardTitle>
          <CardDescription>
            {verified === "true" ? "Success!" : "Verification Failed"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {verified === "true" ? (
            <Alert className="border-green-500 bg-green-50 dark:bg-green-900/20">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertTitle>Verified!</AlertTitle>
              <AlertDescription>
                Your email has been successfully verified.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Email verification failed. Please try again.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => openAuth("login")}>
            {verified === "true" ? "Go to Login" : "Try Again"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default VerifyEmailForm;
