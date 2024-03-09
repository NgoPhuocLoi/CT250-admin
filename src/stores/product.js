import { defineStore } from "pinia";
import { ref } from "vue";

const useProductStore = defineStore("product", () => {
  const newProduct = ref({ visible: true });
  const images = ref([]);
  const variants = ref([]);

  const setNewProduct = (payload) => {
    newProduct.value = payload;
  }

  const setImages = (payload) => {
    images.value = payload;
  }

  const uploadImage = (elementId) => {
    document.getElementById(elementId).click();
  };

  const addProductImage = (e) => {
    const files = e.target.files;
    images.value.push({
      file: files[0],
      path: URL.createObjectURL(files[0]),
    });
  };

  const removeProductImage = (imageIndex) => {
    images.value.splice(imageIndex, 1);
  };

  const setVariants = (payload) => {
    variants.value = payload;
  };

  const addNewVariants = (newVariants) => {
    variants.value = variants.value.concat(newVariants);
  };

  return {
    newProduct,
    images,
    variants,
    setNewProduct,
    setImages,
    uploadImage,
    addProductImage,
    removeProductImage,
    setVariants,
    addNewVariants,
  };
});

export default useProductStore;
