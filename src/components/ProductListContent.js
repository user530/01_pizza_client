import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductListCard from "./ProductListCard";

import useProductListContent from "./customHooks/useProductListContent";

const ProductListContent = ({ products }) => {
  const {
    isEmpty,
    visibleProducts,
    pages,
    curPage,
    nextPageHandler,
    prevPageHandler,
  } = useProductListContent(products);

  return (
    <div className="menu-products__content">
      {isEmpty ? (
        <p className="no-products">NO PRODUCTS TO SHOW...</p>
      ) : (
        <div className="row">
          {visibleProducts.map((product) => {
            return <ProductListCard key={product.id} product={product} />;
          })}
        </div>
      )}

      {pages > 1 ? (
        <div className="product-pages-row">
          {
            <div className="product-pages-container">
              <button
                className="product-pages-control"
                onClick={prevPageHandler}
              >
                <FaChevronLeft />
              </button>
              <span className="product-pages-counter">{curPage}</span>
              <button
                className="product-pages-control"
                onClick={nextPageHandler}
              >
                <FaChevronRight />
              </button>
            </div>
          }
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(ProductListContent);
