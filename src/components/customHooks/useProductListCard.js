import React from "react";

import { useAppContext } from "../../utils/context";

const useProductListCard = (product) => {
  const { id, name, ingredients, img, variants } = product;

  const [productOptions, setProductOptions] = React.useState([]);
  const [curOptions, setCurOptions] = React.useState(null);
  const [curVariantData, setCurVariantData] = React.useState({});
  const [productAmount, setProductAmount] = React.useState(1);

  const { addToCart } = useAppContext();

  // Get all options from product variants
  const collectOptions = (variantsArr) => {
    // Reduce all variant options to single object
    const options = variantsArr.reduce((optionsObj, curVariant) => {
      // Iterate over every variant and for each option store values in optionsObj
      const varOptions = curVariant.options;
      Object.keys(varOptions).forEach((option) => {
        if (optionsObj[option]) optionsObj[option].add(varOptions[option]);
        else optionsObj[option] = new Set([varOptions[option]]);
      });

      return optionsObj;
    }, {});

    // Options is 'Str:Set' obj, make it 'Str:Array'
    Object.keys(options).forEach((key) => (options[key] = [...options[key]]));

    return options;
  };

  // Update curent options based on the passed option and value
  const updateCurOptions = (option, value) => {
    setCurOptions({ ...curOptions, [option]: value });
  };

  //  Get options of the first variant
  const initialOptions = () => {
    let initialOptionsObj = {};

    // Set initial options values
    Object.keys(productOptions).forEach((option) => {
      initialOptionsObj[option] = productOptions[option][0];
    });

    return initialOptionsObj;
  };

  // Retrieve variand data based on the current options
  const getCurVariantData = () => {
    const curVariantObj = variants.reduce(
      (prev, variant) => {
        if (JSON.stringify(variant.options) === JSON.stringify(curOptions))
          return variant;
        return prev;
      },
      { weight: 0, price: 0, tags: [] }
    );

    return curVariantObj;
  };

  //   Handle counter btns
  const counterMinus = (e) => {
    e.preventDefault();
    setProductAmount((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const counterPlus = (e) => {
    e.preventDefault();
    setProductAmount((prev) => prev + 1);
  };

  // Handle buy btn
  const buyHandler = (e) => {
    e.preventDefault();

    const { _id: variantId, price, specialPrice } = getCurVariantData();

    const initOpts = initialOptions();

    const orderInfo = {
      product: id,
      variant: variantId,
      amount: productAmount,
      price: specialPrice || price,
      total: (specialPrice || price) * productAmount,
    };

    addToCart(orderInfo);
    setProductAmount(1);
    setCurOptions(initOpts);
  };

  React.useEffect(() => {
    // Collect all options for the product
    const options = collectOptions(variants);
    // Set initial options
    setProductOptions(options);
  }, [product]);

  React.useEffect(() => {
    const initOptions = initialOptions();
    // Set initial options
    setCurOptions(initOptions);
  }, [productOptions]);

  React.useEffect(() => {
    const variantData = getCurVariantData();

    setCurVariantData(variantData);
  }, [curOptions]);

  return {
    id,
    name,
    ingredients,
    img,
    variantData: curVariantData,
    amount: productAmount,
    options: productOptions,
    curOptions,
    updateCurOptions,
    counterMinus,
    counterPlus,
    buyHandler,
  };
};

export default useProductListCard;
