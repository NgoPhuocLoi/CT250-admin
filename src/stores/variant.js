import { defineStore } from "pinia";
import { ref } from "vue";

const useVariantStore = defineStore("variant", () => {
  const variants = ref([]);

  const setVariants = (payload) => {
    variants.value = payload;
  };

  const addNewVariants = (newVariants) => {
    variants.value = variants.value.concat(newVariants);
  };

  return {
    variants,
    setVariants,
    addNewVariants,
  };
});

export default useVariantStore;
