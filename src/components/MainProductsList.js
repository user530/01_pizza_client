import React from "react";
import ProductListControl from "./ProductListControls";
import ProductListContent from "./ProductListContent";

import { getProductTypes, getAllProducts } from "../utils/dataTransfer";

const MainProductsList = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [allProducts, setAllProducts] = React.useState([]);
  const [productTypes, setProductTypes] = React.useState([]);
  const [selectedType, setSelectedType] = React.useState("");
  const [products, setProducts] = React.useState([]);

  const filterProducts = () => {
    const filteredProducts = allProducts.filter(
      (product) => product.productType === selectedType.id
    );

    setProducts(filteredProducts);
  };

  React.useEffect(() => {
    setIsLoading(true);

    getProductTypes()
      .then((types) => setProductTypes(types))
      .catch((err) => console.error(err));

    getAllProducts()
      .then((products) => setAllProducts(products))
      .catch((err) => console.error(err));

    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    filterProducts();
  }, [selectedType]);

  React.useEffect(() => {
    setSelectedType(productTypes[0] || { id: "", productType: "" });
  }, [productTypes]);

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
