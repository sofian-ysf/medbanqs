// This is a helper script to set up the metadata collection in Firebase
// Run this once to create a metadata document that lists all your category collections

import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

const setupMetadata = async () => {
  try {
    // List all your category collection names here
    const categories = [
      'Anatomy',
      'Physiology',
      'Biochemistry',
      'Pathology',
      'Pharmacology',
      'Microbiology',
      'Medicine',
      'Surgery',
      'Pediatrics',
      'Obstetrics_Gynecology',
      'Psychiatry',
      'Community_Medicine',
      'Forensic_Medicine',
      'Anesthesiology',
      'Radiology',
      'Dermatology',
      'Ophthalmology',
      'ENT',
      'Orthopedics',
      // Add more categories as needed
    ];

    // Create or update the metadata document
    await setDoc(doc(db, 'metadata', 'categories'), {
      categories: categories,
      lastUpdated: new Date(),
      totalCategories: categories.length
    });

    console.log('Metadata document created successfully!');
    console.log(`Total categories: ${categories.length}`);
  } catch (error) {
    console.error('Error creating metadata:', error);
  }
};

// To use this, uncomment the line below and run it once
// setupMetadata();

export default setupMetadata;