import React from "react";
import { Link } from "react-router-dom";

import { useAppContext } from "../utils/context";

const ProductListCard = ({ product }) => {
  const {
    id,
    name,
    weight,
    options,
    ingredients,
    price,
    specialPrice,
    tags,
    img,
  } = product;

  const [productAmount, setProductAmount] = React.useState(1);
  const [productOptions, setProductOptions] = React.useState([]);

  const initialOptions = Object.fromEntries(
    options.map((optObj) => {
      return [optObj.title, optObj.options[0]];
    })
  );

  const { addToCart } = useAppContext();

  //   Handle counter btns
  const counterMinus = (e) => {
    e.preventDefault();
    setProductAmount((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const counterPlus = (e) => {
    e.preventDefault();
    setProductAmount((prev) => prev + 1);
  };

  //   Handle option click
  const optionChange = (title, singleOption) => {
    const newOptions = { ...productOptions };
    newOptions[title] = singleOption;
    setProductOptions(newOptions);
  };

  // Handle buy btn
  const buyHandler = (e) => {
    e.preventDefault();

    const orderInfo = {
      orderProdId: id,
      orderOptions: productOptions,
      orderAmount: productAmount,
      orderPrice: specialPrice || price,
      orderCost: specialPrice || price * productAmount,
    };

    addToCart(orderInfo);
    setProductAmount(1);
    setProductOptions(initialOptions);
  };

  //   Set Initial options
  React.useEffect(() => {
    setProductOptions(initialOptions);
  }, []);

  return (
    <div key={id} className="col-md-6 col-xl-4">
      <div className="product-card">
        <div className="card-badges">
          {tags.map((tag, ind) => {
            let tagClass = "card-badge";

            switch (tag) {
              case "Акция":
                tagClass += " card-badge--sale";
                break;
              case "Популярное":
                tagClass += " card-badge--favorite";
                break;
              default:
                tagClass += " card-badge--new";
                break;
            }

            return (
              <span key={ind} className={tagClass}>
                {tag}
              </span>
            );
          })}
        </div>

        <form>
          <Link to={`/${id}`} className="product-card__img">
            <img src={img} alt={name} className="lazy" crossOrigin="" />
          </Link>

          <div className="product-card__title">
            <Link to={`/${id}`} className="product-title">
              {name}
            </Link>
            <span className="card-text">{weight}гр</span>
          </div>

          <div className="product-card__deskrip">
            <p>{ingredients.join(", ")}</p>

            {options.map(({ title, options }, ind) => {
              return (
                <div key={ind} className="product-card__filters">
                  <span className="filter-name">{title}</span>
                  <div className="filters-type">
                    {options.map((singleOption, optInd) => {
                      return (
                        <div key={optInd} className="filters-type__item">
                          <label>
                            <input
                              type="radio"
                              name={title}
                              value={singleOption}
                              checked={singleOption === productOptions[title]}
                              onChange={() => optionChange(title, singleOption)}
                            />
                            <div className="fake-radiobutton">
                              {singleOption}
                            </div>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="product-card__addition"></div>

          <div className="product-card-footer">
            <div className="product-card__calc">
              <div className="product-card__prices">
                <span className="new-price">
                  <span className="value">{specialPrice || price}</span>
                  <span className="dim">₽</span>
                </span>

                {specialPrice ? (
                  <span className="old-price">
                    <span className="value">{price}</span>
                    <span className="dim">₽</span>
                  </span>
                ) : null}
              </div>
              <div className="product-counter">
                <button
                  className="product-counter--minus"
                  onClick={counterMinus}
                >
                  -
                </button>
                <span className="product-counter--num">{productAmount}</span>
                <button className="product-counter--plus" onClick={counterPlus}>
                  +
                </button>
                <input
                  type="hidden"
                  name="product_count"
                  value={productAmount}
                />
              </div>
            </div>
            <div className="product-card__buttons">
              <div className="form-btn">
                <button
                  className="page-button--yellow page-button"
                  onClick={buyHandler}
                >
                  Купить
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductListCard;
