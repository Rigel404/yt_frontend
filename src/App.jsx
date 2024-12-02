
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navabar from "./Components/Navbar";
import Login from './Components/Login';
import Signup from './Components/SignUp';
import Home from './Components/Home';
function App() {
  return (
    <>


      <BrowserRouter>
        <Routes>

          <Route path="/" element={<><Login /></>} />
          <Route path="/signUp" element={<><Signup /></>} />
          <Route path="/home" element={<><Home /></>} />

        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
