'use client';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

// Dynamically import LottiePlayer
const LottiePlayer = dynamic(() => import('react-lottie-player').then((mod) => mod.default), { ssr: false });

// Dynamically import AnimatedTooltip
const AnimatedTooltip = dynamic(() => import('@/components/ui/animated-tooltip').then((mod) => mod.AnimatedTooltip), { ssr: false });

const Live = () => {
  const [data, setData] = useState([]);
  const [friendAnimationData, setFriendAnimationData] = useState(null);
  const [enemyAnimationData, setEnemyAnimationData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/data.json');
        const json = await res.json();
        setData(json);

        const friendAnimation = await fetch('/b5.json');
        const friendAnimData = await friendAnimation.json();
        setFriendAnimationData(friendAnimData);

        const enemyAnimation = await fetch('/b2.json');
        const enemyAnimData = await enemyAnimation.json();
        setEnemyAnimationData(enemyAnimData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const friends = data.filter((item) => item.isFriend);
  const enemies = data.filter((item) => !item.isFriend);

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-r from-orange-300 to-pink-300 flex items-center justify-center p-6">
        <div className="grid mt-8 grid-cols-1 md:grid-cols-2 gap-12 max-w-[80vw]">
          
          {/* Friends Section */}
          <div className="flex flex-col bg-white h-[35rem] w-full rounded-2xl shadow-lg p-6 items-center justify-between transform transition duration-300 hover:scale-105">
            <div className="text-center">
              <p className="bg-sky-500 text-white text-2xl py-2 px-4 rounded-full shadow-md">Friends</p>
              <h2 className="text-xl mt-4 font-semibold text-gray-800">Cherished Connections</h2>
              <p className="text-gray-600 mt-2">These are the people who stand by your side, through thick and thin. Your trusted circle of friends, always there to support you.</p>
            </div>

            {friendAnimationData && (
              <LottiePlayer
                autoplay
                loop
                play
                animationData={friendAnimationData}
                className="w-72 h-72 mb-28"
              />
            )}

            <div className="absolute bottom-8 flex flex-wrap gap-4 justify-center w-full">
              <AnimatedTooltip items={friends} />
            </div>
            <p className="text-gray-600 -mt-16 text-sm">Total Friends: {friends.length}</p>
          </div>

          {/* Enemies Section */}
          <div className="flex flex-col bg-white h-[35rem] w-full rounded-2xl shadow-lg p-6 items-center justify-between transform transition duration-300 hover:scale-105">
            <div className="text-center">
              <p className="bg-red-500 text-white text-2xl py-2 px-4 rounded-full shadow-md">Enemies</p>
              <h2 className="text-xl mt-4 font-semibold text-gray-800">Frenemies or Foes?</h2>
              <p className="text-gray-600 mt-2">
                They challenge you, push your boundaries, and sometimes remind you of the value of keeping your friends closer.
              </p>
            </div>

            {enemyAnimationData && (
              <LottiePlayer
                autoplay
                loop
                play
                animationData={enemyAnimationData}
                className="w-72 h-72 mb-28"
              />
            )}

            <div className="absolute bottom-8 flex flex-wrap gap-4 justify-center w-full">
              <AnimatedTooltip items={enemies} />
            </div>
            <p className="text-gray-600 text-sm mt-5">Total Enemies: {enemies.length}</p>
          </div>
        </div>
      </div>
      
      {/* Figma Link Button */}
      <div className='flex justify-center items-center'>
        <a href="https://www.figma.com/proto/eLakp9wqJfnheUcNUCZVgO/Nasa-app?node-id=7-53&node-type=canvas&t=6dB1Hc8zj0KcgLJW-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=7%3A53" className='absolute bottom-1 mt-2' target="_blank" rel="noopener noreferrer">
          <button className="bg-gradient-to-r  from-sky-500 to-indigo-600 hover:from-indigo-500 hover:to-sky-600 transition-colors duration-300 text-white font-bold px-4 py-2 rounded-full text-lg shadow-md hover:shadow-lg">
            Visit Figma Project
          </button>
        </a>
      </div>
    </div>
  );
};

export default Live;
