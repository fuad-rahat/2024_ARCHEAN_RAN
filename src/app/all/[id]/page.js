'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Dynamically import ClientLottie for client-side rendering only
const ClientLottie = dynamic(() => import('@/components/ClientLottie'), { ssr: false });

export default function DataDetails({ params }) {
  const [data, setData] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [lottieData, setLottieData] = useState(null);

  const currentId = parseInt(params.id);
  const prevId = currentId === 1 ? data.length : currentId - 1;
  const nextId = currentId === data.length ? 1 : currentId + 1;

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/data.json');
      const json = await res.json();
      setData(json);

      const item = json.find((item) => item.id === currentId);
      setCurrentItem(item);
    }

    fetchData();
  }, [currentId]);

  useEffect(() => {
    if (currentItem?.lottie) {
      fetch(currentItem.lottie)
        .then((response) => response.json())
        .then((data) => setLottieData(data))
        .catch((err) => console.error('Error fetching Lottie data:', err));
    }
  }, [currentItem]);

  if (!currentItem) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full flex flex-col justify-between">
        <div className="flex justify-between">
          <div className="flex-1 pr-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{currentItem.title}</h1>
            <p className="text-gray-600 mb-4">{currentItem.description}</p>
            <p className="text-gray-500 mb-6">{currentItem.details_description}</p>
          </div>

          <div className="flex-shrink-0">
            {currentItem.lottie && lottieData ? (
              <ClientLottie animationData={lottieData} className="w-60 h-60 mx-auto" />
            ) : (
              <img
                src={`/${currentItem.image}`}
                alt={currentItem.title}
                className="w-60 h-60 object-cover mx-auto rounded-lg shadow-md"
              />
            )}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <Link href={`/all/${prevId}`}>
            <button className="p-2 bg-sky-500 text-white rounded-lg shadow-md hover:bg-sky-600 transition ease-in-out duration-200">
              Previous
            </button>
          </Link>

          <Link href={`/all/${nextId}`}>
            <button className="p-2 bg-sky-500 text-white rounded-lg shadow-md hover:bg-sky-600 transition ease-in-out duration-200">
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
