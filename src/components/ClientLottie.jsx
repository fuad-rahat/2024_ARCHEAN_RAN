'use client';

import Lottie from 'react-lottie-player';

export default function ClientLottie({ animationData, className }) {
  return (
    <Lottie
      play
      loop
      animationData={animationData}
      className={className}
    />
  );
}
