const reducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_CART": {
      return { ...state, cart: [] };
    }
    case "ADD_TO_CART": {
      return { ...state, cart: [...state.cart, action.payload] };
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
