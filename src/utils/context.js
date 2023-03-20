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

  const addToCart = async (cartItemInfo) => {
    // If no user -> add to anonymous cart
    if (!state.user) {
      const cart = addToAnonymousCart(cartItemInfo);

      // Set updated cart
      setCart(cart);
    } else {
      // If user exists -> add to db
      const userCart = await addToUserCart(cartItemInfo);

      if (!userCart) return;

      // Set updated cart
      setCart(userCart);
    }
  };

  function addToAnonymousCart(cartItemInfo) {
    // Get item data
    const { product, variant, amount } = cartItemInfo;

    // Clone the cart to prevent changes in the state variable
    const newCart = state.cart.map((cartItem) => {
      return { ...cartItem };
    });

    // Find if item already in the cart
    const items = newCart.filter(
      (cartItem) => cartItem.product === product && cartItem.variant === variant
    );

    // If no items found -> add item to cart
    if (items.length === 0) {
      const extendedCart = [...state.cart, cartItemInfo];
      // Write cart data to the session storage
      sessionStorage.setItem("cart", JSON.stringify(extendedCart));

      return extendedCart;
    }

    // If item already exists -> just increment the amount by reference
    items[0].amount += amount;

    // Write cart data to the session storage
    sessionStorage.setItem("cart", JSON.stringify(newCart));

    return newCart;
  }

  async function addToUserCart(cartItemInfo) {
    const controller = new AbortController();

    try {
      const response = await fetch(`/api/v1/users/addToCart/${state.user.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItemInfo),
        signal: controller.signal,
      });

      const data = await response.json();

      return data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

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
