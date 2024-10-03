'use client';
import React, { useState, useEffect } from 'react';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';

const Live = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const friends = data.filter((item) => item.isFriend);
  const enemies = data.filter((item) => !item.isFriend);

  return (
   <div className=' bg-orange-300'>
     <div className=" max-w-[60vw] mx-auto flex h-screen items-center justify-center">
      <div className="w-1/2 -mt-28 flex flex-col items-center justify-center">
        <p className=" bg-sky-400 p-2 rounded-xl text-3xl">Friends</p>
        <div className="flex items-center justify-center gap-14 flex-row mt-24 w-full">
          <AnimatedTooltip items={friends} />
        </div>
      </div>

      <div className="w-1/2 -mt-28 flex flex-col items-center justify-center ">
        <p className="bg-sky-400 p-2 rounded-xl text-3xl">Enemies</p>
        <div className="flex items-center justify-center gap-14 flex-row mt-24 w-full">
          <AnimatedTooltip items={enemies} />
        </div>
      </div>
    </div>
   </div>
  );
};

export default Live;
