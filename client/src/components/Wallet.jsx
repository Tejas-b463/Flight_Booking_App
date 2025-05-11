import React from "react";
import { BanknoteArrowUp, IndianRupee } from "lucide-react";

const Wallet = ({ flight, walletBalance, error, onBook }) => {
  if (!flight) return null;

  const { basePrice = 0 } = flight;
  const emi = Math.ceil(basePrice / 3);

  return (
    <div className="w-full lg:w-[360px]">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-gray-600 font-medium">{"Total Price"}</div>
          </div>
          <div className="flex items-center justify-center text-2xl font-bold text-gray-800"><IndianRupee size={20}/>{basePrice?.toLocaleString()}</div>
        </div>

        <div className="space-y-3 border-t border-gray-200 pt-4 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{"Base Fare"}</span>
            <div className="flex items-center justify-center text-gray-600"><IndianRupee size={13}/> {basePrice?.toLocaleString()}</div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{"Taxes"}</span>
            <div className="flex items-center justify-center text-gray-600">
              <IndianRupee size={13}/>{"0"}</div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{"Add ons"}</span>
            <div className="flex items-center justify-center text-gray-600"><IndianRupee size={13}/>{"0"}</div>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-100 rounded-lg p-4">
          <div className="flex items-start">
            <BanknoteArrowUp size={24} className="text-gray-600 mr-3 mt-1" />
            <div>
              <div className="text-gray-700">{"Pay in 3 interest free EMIs"}</div>
              <div className="flex items-center">
                <div className="font-bold text-gray-800 flex items-center">{"at "} <IndianRupee size={15}/>{emi?.toLocaleString()}/mo</div>
                <span className="mx-2">{"•"}</span>
                <a className="text-blue-600 font-medium cursor-pointer">{"View plans"}</a>
              </div>
              <div className="text-gray-500 text-sm">{"with your credit card"}</div>
            </div>
          </div>
        </div>

        {walletBalance !== null && (
          <div className="text-sm text-gray-700 mt-3">
            {"Wallet Balance:"} 
            <div className="flex items-center">
            <IndianRupee size={14}/>
            {walletBalance?.toLocaleString()}
            </div>
          </div>
        )}

        {error && (
          <div className="text-sm text-red-500 mt-2">{error}</div>
        )}

        <button
          onClick={onBook}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg py-3 mt-6 transition-colors"
        >
          {"Book"}
        </button>
      </div>
    </div>
  );
};

export default Wallet;
