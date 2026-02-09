import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useStreak() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    checkStreak();
  }, []);

  const checkStreak = async () => {
    try {
      const today = new Date().toDateString(); // e.g., "Mon Feb 09 2026"
      const lastLogin = await AsyncStorage.getItem('lastLoginDate');
      const currentStreak = await AsyncStorage.getItem('currentStreak');

      let newStreak = 1;

      if (currentStreak && lastLogin) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastLogin === today) {
          // Already logged in today, keep streak
          newStreak = parseInt(currentStreak);
        } else if (lastLogin === yesterday.toDateString()) {
          // Logged in yesterday, increment streak
          newStreak = parseInt(currentStreak) + 1;
        } else {
          // Missed a day (or more), reset to 1
          newStreak = 1;
        }
      }

      // Save new state
      await AsyncStorage.setItem('lastLoginDate', today);
      await AsyncStorage.setItem('currentStreak', newStreak.toString());
      setStreak(newStreak);

    } catch (error) {
      console.error("Failed to load streak", error);
    }
  };

  return streak;
}