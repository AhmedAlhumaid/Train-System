import logo from './logo.svg';
import './App.css';
import Home from './pages/home';
import Register from './pages/register';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route path = "/" element ={<Home></Home>}></Route>
        <Route path ="/register" element={<Register></Register>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
