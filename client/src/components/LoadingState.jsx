import React from 'react';
import { Loader } from 'lucide-react';


const LoadingState = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <Loader className="h-8 w-8 text-orange-600 animate-spin" />
    <p className="mt-4 ">{"Loading your Flights....."}</p>
  </div>
);

export default LoadingState;
