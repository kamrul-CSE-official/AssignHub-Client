import React from "react";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Toaster />
      <TooltipProvider>{children}</TooltipProvider>
    </div>
  );
};

export default Providers;
