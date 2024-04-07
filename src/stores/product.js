import { defineStore } from "pinia";
import { ref, watch } from "vue";
import * as yup from "yup";

const useProductStore = defineStore("product", () => {
  const newProduct = ref({ visible: true });
  const images = ref([]);
  const variants = ref([]);

  const selectedCategory = ref({});
  watch(selectedCategory, async () => {
    newProduct.value.categoryId = selectedCategory.value.id;
  });

  const productSchema = yup.object().shape({
    // name: yup
    //   .string()
    //   .required("Không được để trống tên sản phẩm.")
    //   .max(50, "Tên sản phẩm tối đa 50 ký tự."),
    // price: yup
    //   .number()
    //   .required("Không được để trống giá."),
    // description: yup
    //   .string()
    //   .required("Không được để trống mô tả."),
    // overview: yup
    //   .string()
    //   .required("Không được để trống tổng quan."),
    // material: yup
    //   .string()
    //   .required("Không được để trống chất liệu."),
    // instruction: yup
    //   .string()
    //   .required("Không được để trống hướng dẫn giặt."),
    // colorName: yup
    //   .string()
    //   .required("Không được để trống tên màu."),
    // quantity: yup
    //   .number()
    //   .required("Không được để trống số lượng."),
  });

  const setNewProduct = (payload) => {
    newProduct.value = payload;
  }

  const setSelectedCategory = (payload) => {
    selectedCategory.value = payload;
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

  const editProductImage = (e, index) => {
    const files = e.target.files;
    images.value[index] = {
      file: files[0],
      path: URL.createObjectURL(files[0]),
    };
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

  const removeVariant = (variantIndex) => {
    variants.value.splice(variantIndex, 1);
  }

  return {
    productSchema,
    newProduct,
    selectedCategory,
    images,
    variants,
    setNewProduct,
    setSelectedCategory,
    setImages,
    uploadImage,
    addProductImage,
    editProductImage,
    removeProductImage,
    setVariants,
    addNewVariants,
    removeVariant,
  };
});

export default useProductStore;
