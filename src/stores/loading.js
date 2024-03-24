import { defineStore } from "pinia";
import { ref } from "vue";

const useLoadingStore = defineStore("loading", () => {
  const loading = ref(false);
  const loadingProgress = ref(0);
  let loadingIntervalId;
  let loadingIntervalPace = 20;

  const startLoading = () => {
    loading.value = true;
    loadingIntervalId = setInterval(frameFast, loadingIntervalPace);
    function frameFast() {
      if (loadingProgress.value >= 52) {
        clearInterval(loadingIntervalId);
        loadingIntervalId = setInterval(frameSlow, loadingIntervalPace);
      } else {
        loadingProgress.value += 0.8;
      }
    }

    function frameSlow() {
      if (loadingProgress.value >= 86) {
        clearInterval(loadingIntervalId);
      } else {
        loadingProgress.value += 0.3;
      }
    }
  };

  const endLoading = () => {
    loadingProgress.value = 100;
    setTimeout(() => {
      loading.value = false;
      loadingProgress.value = 0;
    }, 50);
    clearInterval(loadingIntervalId);
  };

  const setLoading = (status) => {
    loading.value = status;
  };

  return {
    loading,
    setLoading,
    startLoading,
    endLoading,
    loadingProgress,
  };
});

export default useLoadingStore;
