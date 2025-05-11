import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import FlightInfo from "./FlightInfo";
import Wallet from "./Wallet";

const ReviewFlightDetail = () => {
  const [walletBalance, setWalletBalance] = useState(null);
  const [error, setError] = useState("");
  
  const location = useLocation();
  const { flight } = location.state || {};

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/wallet/6820c8de4a232489d81dac79`);
        setWalletBalance(res.data.wallet);
      } catch (err) {
        setError("Failed to fetch wallet balance.");
        console.error(err);
      }
    };
    fetchWallet();
  }, []);

  const handleBooking = async () => {
    if (!flight || !flight.basePrice) {
      alert("Flight details are invalid.");
      return;
    }
  
    if (walletBalance < 50000) {
      alert("You need a minimum balance of ₹50,000 to book flights.");
      return;
    }
  
    try {

      const { data } = await axios.post(`${baseUrl}/api/bookings`, {
        flightId: flight._id,
        userId: "6820c8de4a232489d81dac79", 
      });
  
      // Update wallet balance 
      setWalletBalance((prev) => prev - flight.basePrice);
  
      alert("Booking successful!");
  
      // Open ticket 
      window.open(`${baseUrl}${data.ticketUrl}`, "_blank");
  
      navigate("/");

    } catch (error) {
      console.error("Error booking flight:", error);
      alert("Booking failed. Try again later.");
    } 
  };
  

  if (!flight) {
    return (
      <div className="text-center text-gray-600 mt-10">
        {"No flight selected. Please go back and choose a flight."}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <div className="flex flex-col lg:flex-row gap-6">
        <FlightInfo flight={flight} />
        <Wallet
          flight={flight}
          walletBalance={walletBalance}
          error={error}
          onBook={handleBooking}
        />
      </div>
    </div>
  );
};

export default ReviewFlightDetail;
