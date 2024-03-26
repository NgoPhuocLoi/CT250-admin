import { defineStore } from "pinia";
import { computed, onMounted, ref } from "vue";

const useWindowSizeStore = defineStore("windowSize", () => {
  const windowSize = ref({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const isSmallScreen = computed(() => windowSize.value.width <= 1024);

  onMounted(() => {
    window.addEventListener("resize", () => {
      windowSize.value.width = window.innerWidth;
      windowSize.value.height = window.innerHeight;
    });
  });

  return {
    windowSize,
    isSmallScreen,
  };
});

export default useWindowSizeStore;
