"use client";

import { useState } from "react";
import Link from "next/link";
import { GraduationCap, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import LoginDialog from "../shared/login";
import RegisterDialog from "../shared/register";

// const links = [
//   { href: "#features", label: "Features" },
//   { href: "#how-it-works", label: "How it works" },
//   { href: "#testimonials", label: "Testimonials" },
//   { href: "#pricing", label: "Pricing" },
//   { href: "#faq", label: "FAQ" },
// ];

export function Navbar() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const openLogin = () => {
    setSheetOpen(false);
    setRegisterOpen(false);
    setLoginOpen(true);
  };

  const openRegister = () => {
    setSheetOpen(false);
    setLoginOpen(false);
    setRegisterOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">AssignHub</span>
          </Link>

          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" size="sm" onClick={openLogin}>
              Sign in
            </Button>
            <Button size="sm" onClick={openRegister}>
              Get started
            </Button>
          </div>

          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  AssignHub
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1">
                {/* {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setSheetOpen(false)}
                    className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))} */}
              </nav>
              <div className="mt-6 flex flex-col gap-2">
                <Button variant="outline" onClick={openLogin}>
                  Sign in
                </Button>
                <Button onClick={openRegister}>Get started</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <LoginDialog
        open={loginOpen}
        onOpenChange={setLoginOpen}
        onSwitchToRegister={openRegister}
      />
      <RegisterDialog
        open={registerOpen}
        onOpenChange={setRegisterOpen}
        onSwitchToLogin={openLogin}
      />
    </>
  );
}
