import React from "react";

const AuthProvider = ({ children, access, name }) => {
  document.title = "CAR LEND - " + name;

  return <>{children}</>;
};

export default AuthProvider;
