import React from "react";
import reducer from "./reducer";

const AppContext = React.createContext();

const InitialState = { isLoading: false, test: true, cart: [] };

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, InitialState);

  const clearCart = React.useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, state.cart);

  return (
    <AppContext.Provider value={{ ...state, clearCart }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
