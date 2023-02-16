import React from "react";
import reducer from "./reducer";

const AppContext = React.createContext();

const InitialState = { isLoading: false, user: null, cart: [] };

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, InitialState);

  const login = async () => {
    dispatch({ action: "START_LOADING" });
    try {
      const response = await fetch("/api/v1/users/get_me");
      const user = await response.json();

      console.log(user);
    } catch (error) {
      console.log("USER NOT FOUND");
      dispatch({ action: "SET_USER", payload: null });
    }

    dispatch({ action: "STOP_LOADING" });
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
    login();
  }, []);

  return (
    <AppContext.Provider value={{ ...state, addToCart, clearCart }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
