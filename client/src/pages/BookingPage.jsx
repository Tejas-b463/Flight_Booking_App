import React, { useEffect, useState } from 'react';
import BookingCard from '../components/BookingCard';
import EmptyState from '../components/EmptyState';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

const BookingPage = ({ userId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${baseUrl}/api/bookings/6820c8de4a232489d81dac79`);
        if (!res.ok) throw new Error('Failed to fetch bookings');
        const data = await res.json();
        setBookings(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch bookings', err);
        setError('Unable to load your bookings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  return (
    <div className="max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white p-6 md:p-8 rounded-b-lg shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold">{"My Bookings"}</h1>
        <p className="mt-2 opacity-90">{"Manage and view all your flight bookings"}</p>
      </div>

      <div className="flex border-b border-gray-200 px-4 md:px-6 bg-white">
        <button className="py-4 px-4 md:px-6 font-medium text-sm md:text-base border-b-2 border-blue-600 text-blue-600">
          {"All Bookings"}
        </button>
      </div>

      <div className="p-4 md:p-6">
        {loading && <LoadingState />}
        {error && !loading && <ErrorState message={error} />}
        {!loading && !error && bookings.length === 0 && <EmptyState />}
        {!loading && !error && bookings.length > 0 && (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
