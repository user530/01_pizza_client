import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductListCard from "./ProductListCard";

const ProductListContent = ({ products }) => {
  const isEmpty = products.length < 1;
  const cardsPerList = 4;
  const [pages, setPages] = React.useState(null);
  const [curPage, setCurPage] = React.useState(1);
  const [visibleProducts, setVisibleProducts] = React.useState([]);

  const updateFilter = () => {
    const newProdList = products.filter((product, ind) => {
      return (
        ind >= cardsPerList * (curPage - 1) && ind < cardsPerList * curPage
      );
    });

    setVisibleProducts(newProdList);
  };

  const scrollToMenu = () => {
    const menuEl = document.querySelector("#main-menu");
    menuEl.scrollIntoView({ behavior: "smooth" });
  };

  const prevPageHandler = () => {
    if (curPage > 1) {
      setCurPage(curPage - 1);
      scrollToMenu();
    }
  };

  const nextPageHandler = () => {
    if (curPage < pages) {
      setCurPage(curPage + 1);
      scrollToMenu();
    }
  };

  React.useEffect(() => {
    setPages(Math.ceil(products.length / cardsPerList));
    setCurPage(1);
  }, [products]);

  React.useEffect(updateFilter, [products, curPage]);

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

export default ProductListContent;
