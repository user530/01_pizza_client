import React from "react";
import ProductListControl from "./ProductListControls";
import ProductListContent from "./ProductListContent";

const prodTypesURL = "http://localhost:5000/api/v1/product_types";
const productsURL = "http://localhost:5000/api/v1/products";

const MainProductsList = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [allProducts, setAllProducts] = React.useState([]);
  const [productTypes, setProductTypes] = React.useState([]);
  const [selectedType, setSelectedType] = React.useState("");
  const [products, setProducts] = React.useState([]);

  const getProductTypes = async (URL) => {
    setIsLoading(true);

    try {
      const response = await fetch(URL);
      const data = await response.json();

      if (data.success) {
        const prodTypes = data.data.map(({ _id: id, typeName }) => ({
          id,
          typeName,
        }));
        setProductTypes(prodTypes);
      } else {
        setProductTypes([]);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw new Error("Failed to fetch the data");
    }
  };

  const getAllProducts = async (URL) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${URL}`);
      const data = await response.json();

      if (data.success) {
        const products = data.data;
        const newProducts = products.map(
          ({
            _id: id,
            name,
            productType,
            weight,
            options,
            ingredients,
            price,
            specialPrice,
            tags,
            img,
          }) => {
            return {
              id,
              name,
              productType,
              weight,
              options,
              ingredients,
              price,
              specialPrice,
              tags,
              img,
            };
          }
        );

        setAllProducts(newProducts);
      } else {
        setAllProducts([]);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw new Error("Failed to fetch the data");
    }
  };

  const filterProducts = () => {
    const filteredProducts = allProducts.filter(
      (product) => product.productType === selectedType.id
    );

    setProducts(filteredProducts);
  };

  React.useEffect(() => {
    getProductTypes(prodTypesURL);
    getAllProducts(productsURL);
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
