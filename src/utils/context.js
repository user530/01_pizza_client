import React from "react";
import reducer from "./reducer";

const AppContext = React.createContext();

const InitialState = { isLoading: false, test: true, cart: [] };

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, InitialState);

  const addToCart = React.useCallback(
    (packageInfo) => {
      dispatch({ type: "ADD_TO_CART", payload: packageInfo });
    },
    [state.cart]
  );

  const clearCart = React.useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, [state.cart]);

  return (
    <AppContext.Provider value={{ ...state, addToCart, clearCart }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
