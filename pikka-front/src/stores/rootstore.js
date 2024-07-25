import { defineStore } from "pinia";


  export const changeSidebar = defineStore("changeSidebar", {
    state: () => ({
      root: "post", // 초기값 설정
    }),
    actions: {
      setRoot(option) {
        this.root = option;
      },
    },
  });

 
  export const sidebarhandler = defineStore("sidebarhandler", {
    state: () => ({
      selectedItem: null,
    }),
    actions: {
      setItem(option){
        this.selectedItem = option;
      },
    },
  });

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



