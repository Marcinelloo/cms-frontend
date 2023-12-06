import { Route, Routes } from "react-router-dom";
import AuthProvider from "@/common/auth/AuthProvider";
import { ROUTES } from "@/common/routes/routes";
import { MessageProvider } from "./common/context/messageContext";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
