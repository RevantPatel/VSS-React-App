import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Rent from './pages/Rent';
import ListCar from './pages/ListCar';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './utils/ProtectedRoute';
import Booking from './pages/Booking';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/list" element={<ListCar />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;