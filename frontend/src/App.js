
import Home from './pages/home';
import Register from './pages/register';
import Main from './pages/main';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/login';
import Trains from "./pages/trains";
import Seats from './pages/seats';
import Payment from './pages/payment';
import Booking from './pages/booking';
import AdminDashboard from './pages/AdminDashboard';
import AssignStaff from './pages/AssignStaff';
import AddTrain from './components/AddTrain';
import TrainManagement from './pages/TrainManagement';
import WaitlistPromotion from './pages/waitlistPromotion.js';
import ViewTrain from './components/ViewTrain';


function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route path = "/" element ={<Home></Home>}></Route>
        <Route path ="/register" element={<Register></Register>}></Route>
        <Route path = "/login" element = {<Login></Login>}></Route>
        <Route path = "/main" element = {<Main></Main>} ></Route>
        <Route path = "/admin" element = {<AdminDashboard></AdminDashboard>} ></Route>
        <Route path = "/trains" element = {<Trains></Trains>} ></Route>
        <Route path = "/seats/:id/:num" element={<Seats></Seats>}></Route>
        <Route path="/payment/:id" element= {<Payment></Payment>}></Route>
        <Route path ="/booking" element = {<Booking></Booking>}></Route>
        <Route path="/admin/assign-staff" element={<AssignStaff />} />
        <Route path="/admin/train-management" element={<TrainManagement />} />
        <Route path="/admin/train-management/add" element={<AddTrain />} />
        <Route path="/admin/train-management/edit" element={<ViewTrain />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
