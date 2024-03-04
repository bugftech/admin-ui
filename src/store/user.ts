// Composables
import { defineStore } from "pinia";

type Notifications = {
  read: string[];
};

// RootState root state
export type RootState = {
  notifications: Notifications;
  profile: {
    avatar: string;
    email: string;
    name: string;
  };
};

export const useUserStore = defineStore({
  id: "user",
  state: () =>
    ({
      notifications: {
        read: [],
      },
      profile: {
        avatar: "",
        email: "",
        name: "",
      },
    } as RootState),

  actions: {
    fetchProfile() {
      console.log("fetch user profile")
    }
  },
});
