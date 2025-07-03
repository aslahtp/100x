import { Route, Routes, BrowserRouter, Navigate } from "react-router";
import Signup from "./components/Signup.jsx";
import Signin from "./components/Signin.jsx";
import Dashboard from "./components/Dashboard.jsx";
import './App.css'
import Blogid from "./components/Blogid.jsx";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blogid" element={<Blogid />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
