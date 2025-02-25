import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navabar from "./Components/Navbar";
import Login from "./Components/Login";
import Signup from "./Components/SignUp";
import Home from "./Components/Home";
import PlayVideo from "./Components/PlayVideo";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
              </>
            }
          />
          <Route
            path="/signUp"
            element={
              <>
                <Signup />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path="/watch/:id"
            element={
              <>
                <PlayVideo />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
