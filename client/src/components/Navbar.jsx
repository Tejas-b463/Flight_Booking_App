import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, Plane  } from 'lucide-react';
import {useNavigate} from "react-router-dom"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


  const navigate = useNavigate()

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  function handleBooking(){
    navigate('/booking/:id')
  }

  return (
    <>
      {/* Top navigation bar */}
      <div className="shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo and company text */}
          <button onClick={()=> navigate('/')} className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="bg-[#FF6D38] rounded-full inline-block p-1">
                <Plane  size={30} color="white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-[#FF6D38]">{"FlightTrip"}</h1>
              </div>
            </div>
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="flex items-center text-gray-700 hover:text-[#FF6D38]">
              <span className="mr-1">{"Offers"}</span>
            </button>
            <button className="flex items-center text-gray-700 hover:text-[#FF6D38]">
              <span className="mr-1">{"Business"}</span>
              <ChevronDown size={16} />
            </button>
            <button
            onClick={handleBooking}
             className="flex items-center text-[#FF6D38] font-bold">
              <span className="mr-1">{"My Bookings"}</span>
            </button>
            <button className="flex items-center text-gray-700 hover:text-[#FF6D38]">
              <span className="mr-1">{"Support"}</span>
            </button>
            <button className="px-6 py-2 border border-gray-300 rounded-md text-gray-800 hover:bg-gray-50">
              {"Log in"}
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4">
          <div className="container mx-auto px-4 space-y-4">
            <button className="block w-full text-left py-2 text-gray-700 hover:text-[#FF6D38]">
              {"Offers"}
            </button>
            <button className="w-full text-left py-2 text-gray-700 hover:text-[#FF6D38] flex items-center justify-between">
              <span>{"Business"}</span>
              <ChevronDown size={16} />
            </button>
            <button
            onClick={handleBooking}
            className="block w-full text-left py-2 text-[#FF6D38] font-bold">
             {" My Bookings"}
            </button>
            <button className="block w-full text-left py-2 text-gray-700 hover:text-[#FF6D38]">
              {"Support"}
            </button>
            <button className="block w-full py-2 border border-gray-300 rounded-md text-center text-gray-800 hover:bg-gray-50">
             {" Log in"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;