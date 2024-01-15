import React from "react";

const AuthProvider = ({ children, access, name }) => {
  document.title = "Car rental - " + name;

  return <>{children}</>;
};

export default AuthProvider;
