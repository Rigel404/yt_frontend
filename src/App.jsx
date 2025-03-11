import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navabar from "./Components/Navbar";
import Login from "./Components/Login";
import Signup from "./Components/SignUp";
import Home from "./Components/Home";
import PlayVideo from "./Components/PlayVideo";
import UploadVideo from "./Components/UploadVideo";
import LogOut from "./Components/LogOut";
import History from "./Components/History";
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
            path="/history"
            element={
              <>
                <History />
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
            path="/LogOut"
            element={
              <>
                <LogOut />
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
          <Route
            path="/uploadvideo"
            element={
              <>
                <UploadVideo />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
