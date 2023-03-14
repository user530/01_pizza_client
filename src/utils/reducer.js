const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CART": {
      return { ...state, cart: action.payload };
    }
    case "CLEAR_CART": {
      return { ...state, cart: [] };
    }
    case "ADD_TO_CART": {
      // Get item data
      const { product, variant, amount } = action.payload;

      // Clone the cart to prevent changes in the state variable
      const newCart = state.cart.map((cartItem) => {
        return { ...cartItem };
      });

      // Find if item already in the cart
      const items = newCart.filter(
        (cartItem) =>
          cartItem.product === product && cartItem.variant === variant
      );

      // If no items found -> add item to cart
      if (items.length === 0) {
        const extendedCart = [...state.cart, action.payload];
        // Write cart data to the session storage
        sessionStorage.setItem("cart", JSON.stringify(extendedCart));

        return { ...state, cart: extendedCart };
      }

      // If item already exists -> just increment the amount by reference
      items[0].amount += amount;

      // Write cart data to the session storage
      sessionStorage.setItem("cart", JSON.stringify(newCart));

      // Set new cart
      return { ...state, cart: [...newCart] };
    }
    case "START_LOADING": {
      return { ...state, isLoading: true };
    }
    case "STOP_LOADING": {
      return { ...state, isLoading: false };
    }
    case "SET_USER": {
      return { ...state, user: action.payload };
    }
    default: {
      return { ...state };
    }
  }
};

export default reducer;
