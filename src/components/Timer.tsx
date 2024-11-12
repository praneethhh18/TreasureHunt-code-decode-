import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  onComplete: () => void;
}

export function Timer({ onComplete }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    if (timeLeft <= 600) { // Last 10 minutes
      setIsWarning(true);
    }
  }, [timeLeft]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className={`
      fixed top-4 right-4 z-50
      ${isWarning ? 'animate-pulse' : ''}
    `}>
      <div className={`
        flex items-center space-x-2 px-4 py-2 rounded-full
        ${isWarning ? 'bg-red-500' : 'bg-blue-500'}
        text-white shadow-lg
      `}>
        <Clock className="w-5 h-5" />
        <span className="font-mono text-lg">
          {hours.toString().padStart(2, '0')}:
          {minutes.toString().padStart(2, '0')}:
          {seconds.toString().padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}