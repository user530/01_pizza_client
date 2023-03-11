import React from "react";
import ProductListControl from "./ProductListControls";
import ProductListContent from "./ProductListContent";

// import { getProductTypes, getAllProducts } from "../utils/dataTransfer";

import useProductState from "./customHooks/useProductList";

const MainProductsList = () => {
  const { isLoading, productTypes, selectedType, setSelectedType, products } =
    useProductState();

  return (
    <div className="menu-products">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <ProductListControl
            productTypes={productTypes}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
          <ProductListContent products={products} />
        </>
      )}
    </div>
  );
};

export default MainProductsList;
