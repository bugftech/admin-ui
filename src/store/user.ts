// Composables
import { defineStore } from "pinia";
import { API } from "@/services";
import { APIResponse } from "@/services/types";
import { AxiosError } from "axios";

type Notifications = {
  read: string[];
};

// UserProfile 用户profile
export type UserProfile = {
  id: number;
  uid: string;
  email: string;
  name: string;
  nickName: string;
  login: string;
  phone: string;
  tenantId?: number;
  isAdmin: boolean;
  isDisabled: boolean;
  emailVerified: boolean;
  updatedAt: Date;
  createdAt: Date;
  avatar: string;
  accessControl?: { [key: string]: boolean };
};

// RootState root state
export type RootState = {
  notifications: Notifications;
  userProfile: UserProfile;
};

export const useUserStore = defineStore({
  id: "user",
  state: () =>
    ({
      notifications: {
        read: [],
      },
      userProfile: {} as UserProfile, // Initialize userProfile as an empty object
    } as RootState),

  actions: {
    async fetchUserProfile<T>(): Promise<APIResponse<T>> {
      try {
        const res = await API.bugfreed.getByURL<UserProfile>("/users/profile");
        if (res.status === 200) {
          this.userProfile = res.data.data
          return {
            success: true,
            data: null as unknown as T,
          };
        }
      } catch (error) {
        const _error = error as AxiosError<string>;
        return {
          success: false,
          status: _error.response?.status,
          data: null as unknown as T,
        };
      }
      // If you reach here, return a default response
      return {
        success: false,
        status: undefined,
        data: null as unknown as T,
      };
    },
  },
});
