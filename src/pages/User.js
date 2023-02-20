import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../utils/context";

const User = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) navigate("/");
  }, [user]);

  return (
    <>
      <h2>User</h2>
    </>
  );
};

export default User;
