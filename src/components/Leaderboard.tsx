import React from 'react';
import { Trophy, Clock, Medal, Loader2 } from 'lucide-react';

export interface TeamScore {
  teamName: string;
  phase1Time: number;
  phase2Time: number;
  totalScore: number;
  completed: boolean;
  timestamp?: number;
}

interface LeaderboardProps {
  scores: TeamScore[];
  loading?: boolean;
  error?: string | null;
}

export function Leaderboard({ scores, loading, error }: LeaderboardProps) {
  const sortedScores = [...scores].sort((a, b) => b.totalScore - a.totalScore);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-600">Loading leaderboard...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-red-500 text-center">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          Live Leaderboard
        </h2>
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-sm text-gray-600">Live</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="py-3 text-left">Rank</th>
              <th className="py-3 text-left">Team</th>
              <th className="py-3 text-right">Phase 1</th>
              <th className="py-3 text-right">Phase 2</th>
              <th className="py-3 text-right">Score</th>
              <th className="py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedScores.map((team, index) => (
              <tr 
                key={team.teamName + (team.timestamp || index)}
                className={`
                  border-b border-gray-100
                  ${index === 0 ? 'bg-yellow-50' : ''}
                  ${index === 1 ? 'bg-gray-50' : ''}
                  ${index === 2 ? 'bg-orange-50' : ''}
                `}
              >
                <td className="py-3">
                  {index === 0 && <Medal className="w-5 h-5 text-yellow-500" />}
                  {index === 1 && <Medal className="w-5 h-5 text-gray-400" />}
                  {index === 2 && <Medal className="w-5 h-5 text-orange-400" />}
                  {index > 2 && `#${index + 1}`}
                </td>
                <td className="py-3 font-medium">{team.teamName}</td>
                <td className="py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Clock className="w-4 h-4" />
                    {formatTime(team.phase1Time)}
                  </div>
                </td>
                <td className="py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Clock className="w-4 h-4" />
                    {formatTime(team.phase2Time)}
                  </div>
                </td>
                <td className="py-3 text-right font-bold">{team.totalScore}</td>
                <td className="py-3 text-center">
                  {team.completed ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Complete
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      In Progress
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function formatTime(seconds: number): string {
  if (!seconds) return '--:--';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}