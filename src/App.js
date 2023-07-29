import Home from "./components/Home/Home";
import Login from "./components/Login/Login"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./components/ContextAPI/AuthContext";
import SignUp from "./components/Signup/SignUp";
import TermsAndCondition from "./components/Login/Terms&Condition";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="terms&conditions" element={<TermsAndCondition />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
