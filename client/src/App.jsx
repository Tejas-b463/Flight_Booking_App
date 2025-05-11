import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SearchResultPage from './pages/SearchResultPage'; 
import BookingPage from './pages/BookingPage';
import ReviewFlightDetail from './components/ReviewFlightDetail';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResultPage />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/review" element={<ReviewFlightDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
