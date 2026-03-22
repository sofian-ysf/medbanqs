// User Statistics Management
import { doc, setDoc, getDoc, updateDoc, increment, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';

// Initialize user document with default stats
export const initializeUserStats = async (userId, email) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      // Create new user document with initial stats
      await setDoc(userRef, {
        email: email,
        displayName: email.split('@')[0],
        createdAt: new Date(),
        stats: {
          totalQuestionsAnswered: 0,
          correctAnswers: 0,
          incorrectAnswers: 0,
          accuracyRate: 0,
          questionsRemaining: 0,
          categoryProgress: {},
          lastUpdated: new Date()
        },
        answeredQuestions: [], // Array of question IDs already answered
        studyStreak: 0,
        lastStudyDate: null,
        examDate: null
      });
    }
    return userRef;
  } catch (error) {
    console.error('Error initializing user stats:', error);
  }
};

// Update user stats after answering a question
export const updateUserStats = async (userId, questionId, isCorrect, category) => {
  try {
    const userRef = doc(db, 'users', userId);
    
    // Update general stats
    const updates = {
      'stats.totalQuestionsAnswered': increment(1),
      'stats.lastUpdated': new Date(),
      answeredQuestions: arrayUnion(questionId)
    };
    
    if (isCorrect) {
      updates['stats.correctAnswers'] = increment(1);
    } else {
      updates['stats.incorrectAnswers'] = increment(1);
    }
    
    // Update category-specific progress
    const categoryPath = `stats.categoryProgress.${category}`;
    updates[`${categoryPath}.attempted`] = increment(1);
    if (isCorrect) {
      updates[`${categoryPath}.correct`] = increment(1);
    }
    
    await updateDoc(userRef, updates);
    
    // Calculate and update accuracy rate
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const stats = userDoc.data().stats;
      const accuracyRate = stats.totalQuestionsAnswered > 0 
        ? Math.round((stats.correctAnswers / stats.totalQuestionsAnswered) * 100)
        : 0;
      
      await updateDoc(userRef, {
        'stats.accuracyRate': accuracyRate
      });
    }
  } catch (error) {
    console.error('Error updating user stats:', error);
  }
};

// Get user stats
export const getUserStats = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error('Error getting user stats:', error);
    return null;
  }
};

// Update study streak
export const updateStudyStreak = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const lastStudyDate = userData.lastStudyDate?.toDate();
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      let newStreak = userData.studyStreak || 0;
      
      if (lastStudyDate) {
        const lastDate = new Date(lastStudyDate);
        lastDate.setHours(0, 0, 0, 0);
        
        const daysDiff = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 0) {
          // Already studied today, no update needed
          return newStreak;
        } else if (daysDiff === 1) {
          // Consecutive day
          newStreak += 1;
        } else {
          // Streak broken
          newStreak = 1;
        }
      } else {
        // First time studying
        newStreak = 1;
      }
      
      await updateDoc(userRef, {
        studyStreak: newStreak,
        lastStudyDate: today
      });
      
      return newStreak;
    }
  } catch (error) {
    console.error('Error updating study streak:', error);
  }
};

// Check if question was already answered
export const isQuestionAnswered = async (userId, questionId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const answeredQuestions = userDoc.data().answeredQuestions || [];
      return answeredQuestions.includes(questionId);
    }
    return false;
  } catch (error) {
    console.error('Error checking answered question:', error);
    return false;
  }
};

// Update exam date
export const updateExamDate = async (userId, examDate) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      examDate: examDate
    });
  } catch (error) {
    console.error('Error updating exam date:', error);
  }
};