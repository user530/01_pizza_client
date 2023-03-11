import React from "react";
import { Link } from "react-router-dom";

import useProductListCard from "./customHooks/useProductListCard";

const ProductListCard = ({ product }) => {
  const {
    id,
    name,
    ingredients,
    img,
    variantData,
    amount,
    options,
    curOptions,
    updateCurOptions,
    counterMinus,
    counterPlus,
    buyHandler,
  } = useProductListCard(product);

  const { weight, price, specialPrice, tags } = variantData;

  return (
    <div key={id} className="col-md-6 col-xl-4">
      <div className="product-card">
        <div className="card-badges">
          {tags
            ? tags.map((tag, ind) => {
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
              })
            : null}
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

            {Object.keys(options).map((option, ind) => {
              const optionValues = options[option];

              return (
                <div key={ind} className="product-card__filters">
                  <span className="filter-name">{option}:</span>
                  <div className="filters-type">
                    {optionValues.map((singleOption, optInd) => {
                      return (
                        <div key={optInd} className="filters-type__item">
                          <label>
                            <input
                              type="radio"
                              name={option}
                              value={singleOption}
                              checked={singleOption === curOptions[option]}
                              onChange={() =>
                                updateCurOptions(option, singleOption)
                              }
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

            {/* {options.map(({ title, options }, ind) => {
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
            })} */}
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
                <span className="product-counter--num">{amount}</span>
                <button className="product-counter--plus" onClick={counterPlus}>
                  +
                </button>
                <input type="hidden" name="product_count" value={amount} />
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

export default React.memo(ProductListCard);
