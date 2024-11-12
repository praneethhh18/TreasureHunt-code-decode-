import React from 'react';
import { ImagePuzzle } from './components/ImagePuzzle';
import { TreasureMap } from './components/TreasureMap';
import { Timer } from './components/Timer';
import { Leaderboard } from './components/Leaderboard';
import { useLeaderboard } from './hooks/useLeaderboard';
import { useState } from 'react';

function App() {
  const [phase, setPhase] = useState<'start' | 'puzzle' | 'map'>('start');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [startTime, setStartTime] = useState<number>(0);
  const [phase1Time, setPhase1Time] = useState<number>(0);
  const [phase2Time, setPhase2Time] = useState<number>(0);
  
  const { scores, loading, error, addScore } = useLeaderboard();

  const calculateScore = (phase1: number, phase2: number): number => {
    const baseScore = 1000;
    const phase1Penalty = Math.floor(phase1 / 60) * 10;
    const phase2Penalty = Math.floor(phase2 / 60) * 5;
    return Math.max(0, baseScore - phase1Penalty - phase2Penalty);
  };

  const startGame = () => {
    if (!teamName.trim()) {
      alert('Please enter a team name to start!');
      return;
    }
    
    // Check if team name already exists
    if (scores.some(score => score.teamName === teamName)) {
      alert('This team name is already taken. Please choose another name.');
      return;
    }
    
    setGameStarted(true);
    setPhase('puzzle');
    setStartTime(Date.now());
  };

  const handlePuzzleComplete = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    setPhase1Time(timeSpent);
    setPhase('map');
  };

  const handleGameComplete = async () => {
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    const phase2TimeSpent = totalTime - phase1Time;
    setPhase2Time(phase2TimeSpent);
    setGameComplete(true);

    const finalScore = calculateScore(phase1Time, phase2TimeSpent);
    const newTeamScore = {
      teamName,
      phase1Time,
      phase2Time: phase2TimeSpent,
      totalScore: finalScore,
      completed: true,
      timestamp: Date.now()
    };

    await addScore(newTeamScore);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-8">Treasure Hunt Challenge</h1>
            <div className="max-w-md mx-auto">
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter your team name"
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={startGame}
                className="px-8 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform"
              >
                Start Adventure
              </button>
            </div>
          </div>
          
          <Leaderboard scores={scores} loading={loading} error={error} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {gameStarted && <Timer onComplete={handleGameComplete} />}
      
      {phase === 'puzzle' ? (
        <ImagePuzzle onComplete={handlePuzzleComplete} />
      ) : phase === 'map' ? (
        <TreasureMap onComplete={handleGameComplete} />
      ) : null}

      <div className="max-w-4xl mx-auto mt-8 px-6">
        <Leaderboard scores={scores} loading={loading} error={error} />
      </div>
    </div>
  );
}

export default App;