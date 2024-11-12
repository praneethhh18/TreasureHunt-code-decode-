import { ref, onValue, set, get } from 'firebase/database';
import { useState, useEffect } from 'react';
import { database } from '../firebase';
import { TeamScore } from '../components/Leaderboard';

export function useLeaderboard() {
  const [scores, setScores] = useState<TeamScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const scoresRef = ref(database, 'scores');

    const unsubscribe = onValue(scoresRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          const scoresArray = Object.values(data) as TeamScore[];
          setScores(scoresArray);
        }
        setLoading(false);
      } catch (err) {
        setError('Error loading leaderboard');
        setLoading(false);
      }
    }, (error) => {
      setError(error.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addScore = async (newScore: TeamScore) => {
    try {
      const scoresRef = ref(database, 'scores');
      const snapshot = await get(scoresRef);
      const currentScores = snapshot.val() || {};
      
      // Use timestamp as unique key
      const scoreKey = Date.now().toString();
      await set(ref(database, `scores/${scoreKey}`), newScore);
    } catch (err) {
      setError('Error adding score');
    }
  };

  return { scores, loading, error, addScore };
}