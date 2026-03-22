// Helper to create metadata document with your actual collection names
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

// IMPORTANT: Replace these with your ACTUAL collection names from Firebase Console
const createMetadata = async () => {
  try {
    // List your ACTUAL collection names here
    // Check Firebase Console > Firestore Database to see the exact names
    const actualCollections = [
      // Replace these with your real collection names
      'anatomy',  // or 'Anatomy' - use exact case
      'physiology',
      'biochemistry',
      'pathology',
      'pharmacology',
      // Add all your other collections here...
    ];

    await setDoc(doc(db, 'metadata', 'categories'), {
      categories: actualCollections,
      lastUpdated: new Date(),
      totalCategories: actualCollections.length
    });

    console.log('Metadata created successfully!');
    console.log('Collections added:', actualCollections);
  } catch (error) {
    console.error('Error creating metadata:', error);
  }
};

// Uncomment to run:
// createMetadata();

export default createMetadata;