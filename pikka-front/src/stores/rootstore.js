import { defineStore } from "pinia";

  export const useInsertStore = defineStore("useInsertStore", {
    state: () => ({
      root: "Notice",
    }),
    actions: {
      setRoot(option) {
        this.root = option;
      },
    },
  });



