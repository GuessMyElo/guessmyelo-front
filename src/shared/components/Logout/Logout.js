import { logout, useAuthDispatch } from "context/Auth";
import React from "react";
import Button from "../Button/Button";
import { FaPowerOff } from "react-icons/fa";
import "./Logout.scss";

const Logout = () => {
  const dispatch = useAuthDispatch();
  return (
    <Button size="fit-content" className="logout" onClick={() => logout(dispatch)}>
      <FaPowerOff size={20}/>
    </Button>
  );
};

export default Logout;
