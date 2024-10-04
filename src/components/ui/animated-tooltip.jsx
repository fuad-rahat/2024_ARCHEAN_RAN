'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { motion, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';
import Lottie from 'react-lottie-player';

export const AnimatedTooltip = ({ items }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [lottieData, setLottieData] = useState({}); // Store fetched Lottie animations
  const [loadingItems, setLoadingItems] = useState([]); // Store loading state for each item
  const [errorItems, setErrorItems] = useState([]); // Store error state for each item
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);

  const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig);
  const translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), springConfig);

  const handleMouseMove = (event) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  // Fetch Lottie data for items that have lottie paths, with retry logic
  useEffect(() => {
    items.forEach((item) => {
      if (item.lottie && !lottieData[item.id] && !loadingItems.includes(item.id)) {
        const retryFetch = (retries = 3, delay = 1000) => {
          setLoadingItems((prev) => [...prev, item.id]);

          fetch(item.lottie)
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then((data) => {
              setLottieData((prevState) => ({
                ...prevState,
                [item.id]: data, // Store Lottie animation data using the item's ID
              }));
              setLoadingItems((prev) => prev.filter((id) => id !== item.id)); // Remove from loading
              setErrorItems((prev) => prev.filter((id) => id !== item.id)); // Remove from error
            })
            .catch((err) => {
              console.error('Error fetching Lottie data:', err);
              if (retries > 0) {
                setTimeout(() => retryFetch(retries - 1, delay), delay); // Retry after a delay
              } else {
                setErrorItems((prev) => [...prev, item.id]); // Set error state after all retries
                setLoadingItems((prev) => prev.filter((id) => id !== item.id)); // Remove from loading
              }
            });
        };

        retryFetch(); // Call the retry function
      }
    });
  }, [items, lottieData, loadingItems]);

  return (
    <div className="flex flex-wrap justify-center gap-1">
      {items.map((item) => (
        <div
          className="relative group w-40 h-40 flex flex-col items-center"
          key={item.id}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}>

          {/* Tooltip animation */}
          <AnimatePresence mode="popLayout">
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{ opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 10 } }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{ translateX: translateX, rotate: rotate, whiteSpace: 'nowrap' }}
                className="absolute -top-20 -left-1/2 translate-x-1/2 flex flex-col items-center justify-center bg-black text-white p-4 rounded-md z-50 shadow-lg">
                <div className="text-base font-bold">{item.title}</div>
                <div className="text-xs">{item.description}</div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Conditionally render Lottie or Image */}
          <Link href={`/live-world/all/${item.id}`}>
            {item.lottie && lottieData[item.id] ? (
              <Lottie
                play
                loop
                animationData={lottieData[item.id]}  // Use the fetched Lottie data
                className="object-cover rounded-full h-28 w-28 border-2 group-hover:scale-110 transition-transform duration-300 border-white shadow-lg"
              />
            ) : loadingItems.includes(item.id) ? (
              <div className="w-28 h-28 flex justify-center items-center bg-gray-200 rounded-full">
                <p className="text-gray-500">Loading...</p>
              </div>
            ) : errorItems.includes(item.id) ? (
              <div className="w-28 h-28 flex justify-center items-center bg-red-200 rounded-full">
                <p className="text-red-500">Error</p>
              </div>
            ) : (
              <Image
                onMouseMove={handleMouseMove}
                height={160}
                width={160}
                src={item.url ? item.url : item.image}  // Use the image URL or fallback to local image
                alt={item.title}
                className="object-cover rounded-full h-28 w-28 border-2 group-hover:scale-110 transition-transform duration-300 border-white shadow-lg"
              />
            )}
          </Link>
        </div>
      ))}
    </div>
  );
};
