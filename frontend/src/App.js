
import Home from './pages/home';
import Register from './pages/register';
import Main from './pages/main';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/login';
import Trains from "./pages/trains";
import Seats from './pages/seats';


function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route path = "/" element ={<Home></Home>}></Route>
        <Route path ="/register" element={<Register></Register>}></Route>
        <Route path = "/login" element = {<Login></Login>}></Route>
        <Route path = "/main" element = {<Main></Main>} ></Route>
        <Route path = "/trains" element = {<Trains></Trains>} ></Route>
        <Route path = "seats" element={<Seats></Seats>}></Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
