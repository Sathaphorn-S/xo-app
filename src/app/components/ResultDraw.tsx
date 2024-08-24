// components/ResultDraw.tsx
import { FC } from 'react';
import Image from 'next/image';

interface ResultDrawProps {
  onClose: () => void;
}

const ResultDraw: FC<ResultDrawProps> = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 cursor-pointer transition-opacity duration-1000 ease-in-out"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full max-w-screen-md max-h-screen"
      >
        <Image
          src="/drawtest.png" // Ensure this path is correct and the image is in the public directory
          alt="Draw"
          layout="fill" // Use fill to cover the container
          objectFit="contain" // Ensure the image fits within its container
        />
      </div>
    </div>
  );
};

export default ResultDraw;
