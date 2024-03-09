import { defineStore } from "pinia";
import { ref } from "vue";

const useSizeStore = defineStore("size", () => {
  const sizes = ref([]);

  const setSizes = (payload) => {
    sizes.value = payload;
  };

  return {
    sizes,
    setSizes,
  };
});

export default useSizeStore;
