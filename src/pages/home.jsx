import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from '../components/Navigation/Navbar';
import Market from '../components/Market/Market';

const Home = () => {
  return (
    <Router>
        <Routes>
            <Route path="/market" element={<Market/>} />
        </Routes>
    </Router>
  )
}

export default Home