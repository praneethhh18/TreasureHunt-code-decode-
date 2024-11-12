import React from 'react';
import { Lock } from 'lucide-react';

interface TreasureBoxProps {
  index: number;
  isUnlocked: boolean;
  onClick: () => void;
  imageUrl: string;
  row: number;
  col: number;
  isLastBox: boolean;
}

export function TreasureBox({ index, isUnlocked, onClick, imageUrl, row, col, isLastBox }: TreasureBoxProps) {
  return (
    <button
      onClick={onClick}
      className="relative w-full aspect-square rounded-lg transition-all duration-300 overflow-hidden group"
    >
      <div
        className={`
          absolute inset-0 transition-opacity duration-500
          ${isUnlocked ? 'opacity-100' : 'opacity-0'}
          ${!isLastBox && isUnlocked ? 'backdrop-blur-sm' : ''}
        `}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: '300%',
          backgroundPosition: `${col * 50}% ${row * 50}%`
        }}
      />
      <div
        className={`
          absolute inset-0 flex items-center justify-center
          ${isUnlocked 
            ? 'opacity-0' 
            : 'bg-gray-200 hover:bg-gray-300 opacity-100'
          }
          transition-all duration-300
        `}
      >
        <Lock className="w-8 h-8 text-gray-500 group-hover:scale-110 transition-transform" />
        <div className="absolute top-2 left-2 text-sm font-medium text-gray-600">
          {index + 1}
        </div>
      </div>
    </button>
  );
}