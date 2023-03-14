import React from "react";
import reducer from "./reducer";

const AppContext = React.createContext();

const InitialState = { isLoading: false, user: null, cart: [] };

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, InitialState);

  const setUser = (user) => {
    dispatch({ type: "SET_USER", payload: user });
  };

  const setCart = (cart) => {
    dispatch({ type: "SET_CART", payload: cart });
  };

  const setAnonymousCart = () => {
    // Load anonymous cart or just empty cart if no data stored
    const anonymousCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    // Load user cart
    setCart(anonymousCart);
  };

  const login = async () => {
    dispatch({ type: "START_LOADING" });
    try {
      const response = await fetch("/api/v1/users/get_me");
      const data = await response.json();

      // Failed request
      if (!data.success) throw new Error(data.error);

      // If request is OK, get and set user data
      const { user, cart } = data.data;
      setUser(user);

      // If user have cart data
      if (cart) {
        // Set data
        setCart(cart);
      } else {
        // Set anonymous cart data
        setAnonymousCart();
      }
    } catch (error) {
      setUser(null);
      setAnonymousCart();
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
    <AppContext.Provider
      value={{ ...state, setUser, setCart, addToCart, clearCart }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
