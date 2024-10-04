'use client';

import Link from 'next/link';
import Lottie from 'react-lottie-player';
import { useEffect, useState } from 'react';

// Component to display the data details
export default function DataDetails({ params }) {
  const [data, setData] = useState([]); // State for fetched data
  const [currentItem, setCurrentItem] = useState(null); // State for the current item
  const [lottieData, setLottieData] = useState(null); // State for Lottie data

  const currentId = parseInt(params.id); // Get the ID from params
  const prevId = currentId === 1 ? data.length : currentId - 1; // Calculate the previous ID
  const nextId = currentId === data.length ? 1 : currentId + 1; // Calculate the next ID

  // Fetch the data on component mount
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:3000/data.json');
      const json = await res.json();
      setData(json);

      const item = json.find((item) => item.id === currentId);
      setCurrentItem(item);
    }

    fetchData();
  }, [currentId]);

  // Fetch the Lottie animation if available
  useEffect(() => {
    if (currentItem?.lottie) {
      fetch(currentItem.lottie)
        .then((response) => response.json())
        .then((data) => setLottieData(data))
        .catch((err) => console.error('Error fetching Lottie data:', err));
    }
  }, [currentItem]);

  if (!currentItem) return <p>Loading...</p>; // Show loading state while fetching

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-200 to-blue-200 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-5xl w-full flex flex-col justify-between transition-transform transform hover:scale-105">
        
        <div className="flex justify-between">
          
          {/* Left Side: Details Description */}
          <div className="flex-1 pr-10">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{currentItem.title}</h1>
            <p className="text-lg text-gray-700 mb-4">{currentItem.description}</p>
            <p className="text-md text-gray-600 leading-relaxed">{currentItem.details_description}</p>
          </div>

          {/* Right Side: Lottie Animation or Image */}
          <div className="flex-shrink-0 w-64">
            {currentItem.lottie && lottieData ? (
              <Lottie play loop animationData={lottieData} className="w-full h-full mx-auto" />
            ) : (
              <img
                src={`/${currentItem.image}`}
                alt={currentItem.title}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            )}
          </div>
        </div>

        {/* Bottom Section: Buttons Positioned at Opposite Corners */}
        <div className="flex justify-between mt-10">
          <Link href={`/live-world/all/${prevId}`}>
            <button className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white text-lg rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
              Previous
            </button>
          </Link>

          <Link href={`/live-world/all/${nextId}`}>
            <button className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white text-lg rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
