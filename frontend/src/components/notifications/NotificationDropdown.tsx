"use client";

console.log("🔔 NotificationDropdown FILE LOADED");

import { useEffect } from "react";   // ✅ added
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { useNotificationStore } from "@/store/notificationStore";

export default function NotificationDropdown() {
  console.log("NotificationDropdown rendered");

  const { notifications, setNotifications } = useNotificationStore(); // ✅ changed

  useEffect(() => {
  console.log("Loading notifications...");

  async function loadNotifications() {
    try {
      const res = await fetch("http://localhost:8000/api/notifications", {
        credentials: "include",
      });

      console.log("Fetch status:", res.status);

      const data = await res.json();
      console.log("Fetched notifications:", data);

      setNotifications(data);
    } catch (err) {
      console.error("Notification fetch error:", err);
    }
  }

  loadNotifications();
}, []);


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          onClick={() => console.log("Bell clicked")}
          className="relative z-50 cursor-pointer"
        >
          <Bell className="h-5 w-5 pointer-events-none" />

          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="bottom"
        align="end"
        className="z-50 w-80 bg-white shadow-xl border rounded-xl"
      >
        {notifications.length === 0 ? (
          <p className="p-4 text-sm text-gray-500">No notifications</p>
        ) : (
          notifications.map((n) => (
            <div key={n._id} className="p-3 border-b text-sm hover:bg-gray-50">
              {n.message}
            </div>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
