import { Route, Routes } from "react-router-dom";
import AuthProvider from "@/common/auth/AuthProvider";
import { ROUTES } from "@/common/routes/routes";
import { MessageProvider } from "./common/context/messageContext";
import { UserContext } from "./common/context/userContext";
import { useState } from "react";
import store from "./api/store";

function App() {
  const [user, setUser] = useState(store.getUser());

  return (
    <>
      <UserContext.Provider
        value={{
          setUser,
          user,
        }}
      >
        <MessageProvider>
          <Routes>
            {ROUTES.map((route) => (
              <Route
                key={route.name}
                path={route.url}
                element={
                  <AuthProvider access={route.access} name={route.name}>
                    {route.component}
                  </AuthProvider>
                }
              />
            ))}
          </Routes>
        </MessageProvider>
      </UserContext.Provider>
    </>
  );
}

export default App;
