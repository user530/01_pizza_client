import React from "react";
import reducer from "./reducer";

const AppContext = React.createContext();

const InitialState = { isLoading: false, isAuthorized: false, cart: [] };

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, InitialState);

  const relogin = () => {
    const token = localStorage.getItem("token");
    if (token) {
      // fetch
      // setIsAuthorized
      // setCart
    }
  };

  const addToCart = React.useCallback(
    (packageInfo) => {
      dispatch({ type: "ADD_TO_CART", payload: packageInfo });
    },
    [state.cart]
  );

  const clearCart = React.useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, [state.cart]);

  React.useEffect(() => {
    relogin();
  }, []);

  return (
    <AppContext.Provider value={{ ...state, addToCart, clearCart }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
