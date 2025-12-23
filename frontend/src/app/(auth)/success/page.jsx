"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { userAuthStore } from "@/store/authStore";

export default function AuthSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setUser = userAuthStore((state) => state.setUser);

  useEffect(() => {
    const token = searchParams.get("token");
    const type = searchParams.get("type");
    const userParam = searchParams.get("user");

    if (!token || !type || !userParam) {
      router.push("/login");
      return;
    }

    // ✅ REAL USER FROM BACKEND
    const user = JSON.parse(decodeURIComponent(userParam));

    setUser(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        type,
        profileImage: user.profileImage,
      },
      token
    );

    router.replace("/"); // homepage
  }, [router, searchParams, setUser]);

  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-xl font-semibold">
        Signing you in with Google...
      </h1>
    </div>
  );
}
