import React from "react";

import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import HeaderAuth from "./HeaderAuth/HeaderAuth";
import HeaderUser from "./HeaderUser/HeaderUser";

const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return user ? <HeaderUser /> : <HeaderAuth />;
};

export default Header;
