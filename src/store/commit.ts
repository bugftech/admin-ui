// Plugin
import type { components as octokitComponents } from "@octokit/openapi-types";

// Composable
import { defineStore } from "pinia";

// Types
export type Commit = octokitComponents["schemas"]["commit"];
// State stores git commit information
export type State = {
  latest: Commit | null;
  commits: Commit[];
  isLoading: boolean;
};

const url = import.meta.env.VITE_API_SERVER_URL;

export const useCommitStore = defineStore({
  id: "commit",
  state: (): State => ({
    latest: null,
    commits: [] as Commit[],
    isLoading: false,
  } as State),

  actions: {
    async fetch() {
      this.isLoading = true;
      try {
        this.latest = await fetch(`${url}/github/commits`, {
          method: "GET",
          credentials: "include",
        }).then((res) => res.json());
      } catch (err: any) {
        console.error(err);
      }

      this.isLoading = false;
    },
  },
});
