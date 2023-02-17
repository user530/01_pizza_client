import React from "react";
import reducer from "./reducer";

const AppContext = React.createContext();

const InitialState = { isLoading: false, user: null, cart: [] };

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, InitialState);

  const setUser = (user) => {
    dispatch({ type: "SET_USER", payload: user });
  };

  const login = async () => {
    dispatch({ type: "START_LOADING" });
    try {
      const response = await fetch("/api/v1/users/get_me");
      const data = await response.json();

      if (data.success && data.data) {
        const { user } = data.data;
        setUser(user);
      }
    } catch (error) {
      console.log(error.message);
      setUser(null);
    }

    dispatch({ type: "STOP_LOADING" });
  };

  const addToCart = (packageInfo) =>
    dispatch({ type: "ADD_TO_CART", payload: packageInfo });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  React.useEffect(() => {
    login();
  }, []);

  return (
    <AppContext.Provider value={{ ...state, addToCart, clearCart, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
