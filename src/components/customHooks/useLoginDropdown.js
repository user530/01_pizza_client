import React from "react";

import { useAppContext } from "../../utils/context";

const useLoginDropdown = () => {
  const { user, setUser, clearCart } = useAppContext();
  const [photo, setPhoto] = React.useState(null);
  const [visible, setVisible] = React.useState(false);

  const logout = async () => {
    try {
      const response = await fetch("/api/v1/auth/logout", {
        method: "delete",
      });

      const data = await response.json();

      if (data.success) {
        setUser(null);
        clearCart();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPhoto = async () => {
    try {
      const { photo } = user;

      const response = await fetch(photo);
      const imageBlob = await response.blob();

      const imgObjURL = URL.createObjectURL(imageBlob);
      setPhoto(imgObjURL);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getPhoto();
  }, [user]);

  return { photo, logout, visible, setVisible };
};

export default useLoginDropdown;
