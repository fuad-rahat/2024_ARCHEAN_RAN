'use client';
import React, { useState, useEffect } from 'react';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import Lottie from 'react-lottie-player';  // Import Lottie player

const Live = () => {
  const [data, setData] = useState([]);
  const [friendAnimationData, setFriendAnimationData] = useState(null);
  const [enemyAnimationData, setEnemyAnimationData] = useState(null);

  useEffect(() => {
    // Fetch the friends and enemies data
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setData(data));

    // Fetch Lottie animations from public folder
    fetch('/b5.json')
      .then((response) => response.json())
      .then((data) => setFriendAnimationData(data));

    fetch('/b2.json') // Change this to the correct file for enemies if different
      .then((response) => response.json())
      .then((data) => setEnemyAnimationData(data));
  }, []);

  const friends = data.filter((item) => item.isFriend);
  const enemies = data.filter((item) => !item.isFriend);

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-300 to-pink-300 flex items-center justify-center p-6">
      <div className="grid mt-12 grid-cols-1 md:grid-cols-2 gap-12 max-w-[80vw]">
        
        {/* Friends Section */}
        <div className="flex flex-col bg-white h-[38rem] w-full rounded-2xl shadow-lg p-6 items-center justify-between transform transition duration-300 hover:scale-105">
          <div className="text-center">
            <p className="bg-sky-500 text-white text-2xl py-2 px-4 rounded-full shadow-md">Friends</p>
            <h2 className="text-xl mt-4 font-semibold text-gray-800">Cherished Connections</h2>
            <p className="text-gray-600 mt-2">These are the people who stand by your side, through thick and thin. Your trusted circle of friends, always there to support you.</p>
          </div>

          {friendAnimationData && (
            <Lottie
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
          <p className="text-gray-600 text-sm">Total Friends: {friends.length}</p>
        </div>

        {/* Enemies Section */}
        <div className="flex flex-col bg-white h-[38rem] w-full rounded-2xl shadow-lg p-6 items-center justify-between transform transition duration-300 hover:scale-105">
          <div className="text-center">
            <p className="bg-red-500 text-white text-2xl py-2 px-4 rounded-full shadow-md">Enemies</p>
            <h2 className="text-xl mt-4 font-semibold text-gray-800">Frenemies or Foes?</h2>
            <p className="text-gray-600 mt-2">They challenge you, push your boundaries, and sometimes remind you of the value of keeping your friends closer.</p>
          </div>

          {enemyAnimationData && (
            <Lottie
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
  );
};

export default Live;
