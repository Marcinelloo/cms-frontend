import React from "react";

const AuthProvider = ({ children, access, name }) => {
  // tu bedzie jakas logika co sprawdza dostepy
  document.title = "CRM - " + name;

  return <>{children}</>;
};

export default AuthProvider;
