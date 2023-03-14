import React from "react";

const useProductListContent = (products) => {
  const [isEmpty, setIsEmpty] = React.useState(true);
  const [cardsPerList] = React.useState(4);
  const [pages, setPages] = React.useState(null);
  const [curPage, setCurPage] = React.useState(1);
  const [visibleProducts, setVisibleProducts] = React.useState([]);

  //  Update visible products
  const updateVisible = () => {
    const newProdList = products.filter((product, ind) => {
      return (
        ind >= cardsPerList * (curPage - 1) && ind < cardsPerList * curPage
      );
    });

    setVisibleProducts(newProdList);
  };

  //  Scroll to the top of the product list
  const scrollToMenu = () => {
    const menuEl = document.querySelector("#main-menu");
    menuEl.scrollIntoView({ behavior: "smooth" });
  };

  //  Handle prev page btn
  const prevPageHandler = () => {
    if (curPage > 1) {
      setCurPage(curPage - 1);
      scrollToMenu();
    }
  };

  //  Handle next page btn
  const nextPageHandler = () => {
    if (curPage < pages) {
      setCurPage(curPage + 1);
      scrollToMenu();
    }
  };

  //  On products update
  React.useEffect(() => {
    setIsEmpty(products.length < 1);

    setPages(Math.ceil(products.length / cardsPerList));

    setCurPage(1);
  }, [products]);

  //  Update visible products
  React.useEffect(updateVisible, [products, curPage]);

  return {
    isEmpty,
    visibleProducts,
    pages,
    curPage,
    nextPageHandler,
    prevPageHandler,
  };
};

export default useProductListContent;
