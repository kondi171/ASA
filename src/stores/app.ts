import { reactive } from 'vue';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', () => {
  const data = reactive({
    value: []
  });

  return {
    data,
  }
});
