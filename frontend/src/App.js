
import Home from './pages/home';
import Register from './pages/register';
import Main from './pages/main';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/login';
import Trains from "./pages/trains";
import Seats from './pages/seats';
import Payment from './pages/payment';
import Booking from './pages/booking';


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
        <Route path = "/seats/:id" element={<Seats></Seats>}></Route>
        <Route path="/payment/:id" element= {<Payment></Payment>}></Route>
        <Route path ="/booking:id" element = {<Booking></Booking>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
