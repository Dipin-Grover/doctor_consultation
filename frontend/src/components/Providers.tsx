"use client";

import { useEffect } from "react";
import { userAuthStore } from "@/store/authStore";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      userAuthStore.setState({
        token,
        isAuthenticated: true,
      });
    }
  }, []);

  return <>{children}</>;
}
