import { create } from "zustand";

interface Notification {
  _id: string;
  message: string;
  read: boolean;
}

interface NotificationStore {
  notifications: Notification[];
  setNotifications: (n: Notification[]) => void;
  addNotification: (n: Notification) => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  setNotifications: (notifications) => set({ notifications }),
  addNotification: (n) =>
    set((state) => ({ notifications: [n, ...state.notifications] })),
  clearNotifications: () => set({ notifications: [] }),
}));
