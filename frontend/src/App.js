import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/create" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/create" />}
            />
            <Route
              path="/create"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
