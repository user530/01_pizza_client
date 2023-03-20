const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CART": {
      return { ...state, cart: action.payload };
    }
    case "CLEAR_CART": {
      return { ...state, cart: [] };
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
