import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Profile } from "./pages/profile/Profile";
import { Register } from "./pages/register/Register";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Messenger } from "./pages/messenger/Messenger";

function App() {
  const { user } = useContext(AuthContext);
  // console.log(user);
  const RequireAuth = ({ children }) => {
    return user ? children : <Navigate to="/register"  replace/>;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            path="login"
            element={user ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="register"
            element={user ? <Navigate to="/" replace /> : <Register />}
          />
          <Route
            path="/messenger"
            element={!user ? <Navigate to="/" replace /> : <Messenger />}
          />
          <Route
            index
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route path="profile">
            <Route path=":username" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
