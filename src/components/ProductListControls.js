import React from "react";

const ProductListControl = ({
  productTypes,
  selectedType,
  setSelectedType,
}) => {
  return (
    <div className="menu-products__controls">
      {productTypes.map((type) => {
        return (
          <button
            key={type.id}
            className={`title-light ${
              type.id === selectedType.id ? "control-active" : ""
            }`}
            onClick={() => setSelectedType(type)}
          >
            {type.typeName}
          </button>
        );
      })}
    </div>
  );
};

export default ProductListControl;
