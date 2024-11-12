import React, { useState } from 'react';
import { X } from 'lucide-react';

interface QuestionModalProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClose: () => void;
  onCorrectAnswer: () => void;
}

export function QuestionModal({ 
  question, 
  answer, 
  isOpen, 
  onClose, 
  onCorrectAnswer 
}: QuestionModalProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [showHint, setShowHint] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.toLowerCase().trim() === answer.toLowerCase()) {
      onCorrectAnswer();
      setInput('');
      setError('');
    } else {
      setError('Try again! That\'s not quite right.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Unlock this treasure!
        </h3>
        
        <p className="text-gray-600 mb-6">{question}</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your answer..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => setShowHint(true)}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Need a hint?
            </button>
            
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit
            </button>
          </div>
          
          {showHint && (
            <p className="text-sm text-gray-500 italic">
              First letter: {answer[0].toUpperCase()}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}