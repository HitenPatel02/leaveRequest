import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Addleave from "./pages/Addleave";
import Viewleave from "./pages/Viewleave";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout name="Leave Request Portal" />}>
          <Route index element={<Home />} />;
          <Route path="Addleave" element={<Addleave />} />
          <Route path="Viewleave" element={<Viewleave />} />
          <Route path="Register" element={<Register />} />
          <Route path="Login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
