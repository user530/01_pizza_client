import React from "react";

import { getProductTypes, getSelectedProducts } from "../../utils/dataTransfer";

const useProductList = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [productTypes, setProductTypes] = React.useState([]);
  const [selectedType, setSelectedType] = React.useState({
    id: "",
    productType: "",
  });
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    getProductTypes(setProductTypes, controller.signal);
    setIsLoading(false);

    return () => {
      controller.abort();
    };
  }, []);

  //    Initial type select
  React.useEffect(() => {
    setSelectedType(productTypes[0] || { id: "", productType: "" });
  }, [productTypes]);

  // Initial product load
  React.useEffect(() => {
    const controller = new AbortController();

    getSelectedProducts(selectedType.id, setProducts, controller.signal);

    return () => {
      controller.abort();
    };
  }, [selectedType]);

  return {
    isLoading,
    productTypes,
    selectedType,
    setSelectedType,
    products,
  };
};

export default useProductList;
