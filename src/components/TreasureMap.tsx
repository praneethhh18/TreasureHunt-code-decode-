import React, { useState } from 'react';
import { MapPin, CheckCircle, X } from 'lucide-react';

interface TreasureMapProps {
  onComplete: () => void;
}

const WINNING_CODES = [
  ["1", "4", "6", "8", "9"],
  ["2", "4", "6", "8", "9"],
  ["3", "4", "6", "8", "9"]
];

export function TreasureMap({ onComplete }: TreasureMapProps) {
  const [codes, setCodes] = useState<string[]>(Array(5).fill(''));
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState('');

  const handleCodeChange = (index: number, value: string) => {
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);
    setError('');
  };

  const handleSubmit = () => {
    const isWinningCombination = WINNING_CODES.some(winningCode => 
      winningCode.every((code, index) => code === codes[index])
    );

    if (isWinningCombination) {
      setCompleted(true);
      onComplete();
    } else {
      setError('Incorrect combination. Try again!');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Phase 2: The Hunt Begins!
      </h2>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="aspect-video relative bg-gray-100 rounded-lg mb-6">
          {/* Map placeholder - Replace URL with actual map */}
          <div className="absolute inset-0 flex items-center justify-center">
            <MapPin className="w-12 h-12 text-red-500" />
            <p className="text-gray-500">Map will be displayed here</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Instructions:</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Find the marked locations on the map</li>
              <li>At each location, search for a hidden code</li>
              <li>Enter codes in the boxes below in ascending order</li>
              <li>Return to checkpoint after finding all codes</li>
              <li>Show your completed status to claim your prize!</li>
            </ol>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Enter Location Codes:</h3>
            <div className="grid grid-cols-5 gap-2">
              {codes.map((code, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={code}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center font-mono"
                  placeholder={`#${index + 1}`}
                />
              ))}
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-red-500">
                <X className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Codes
            </button>
          </div>

          {completed && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl shadow-2xl p-8 text-center max-w-md">
                <div className="mb-6">
                  <div className="w-24 h-24 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
                    <CheckCircle className="w-16 h-16 text-green-500" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Congratulations!
                  </h2>
                  <p className="text-xl text-gray-600">
                    You've completed the treasure hunt!
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg text-yellow-800 mb-6">
                  Please return to the checkpoint to claim your prize!
                </div>
                <div className="animate-bounce">
                  🏆
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}