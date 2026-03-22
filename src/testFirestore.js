// Test script to check Firestore collections
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCMKJDFniyFk8jTV8uP8pVpPMfycAn3xTM",
  authDomain: "mastermla.firebaseapp.com",
  projectId: "mastermla",
  storageBucket: "mastermla.firebasestorage.app",
  messagingSenderId: "222936065603",
  appId: "1:222936065603:web:c49236a34db9f12b19d6f6",
  measurementId: "G-Q2XRYK44W3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testCollections() {
  console.log('Testing Firestore collections...\n');
  
  // Test common medical categories
  const testCategories = [
    'Anatomy',
    'Physiology', 
    'Biochemistry',
    'Pathology',
    'Pharmacology',
    'Medicine',
    'Surgery',
    'Pediatrics'
  ];
  
  console.log('1. Testing individual collections:');
  for (const categoryName of testCategories) {
    try {
      const categorySnapshot = await getDocs(collection(db, categoryName));
      if (categorySnapshot.size > 0) {
        console.log(`✓ ${categoryName}: ${categorySnapshot.size} questions`);
      } else {
        console.log(`✗ ${categoryName}: No documents found`);
      }
    } catch (error) {
      console.log(`✗ ${categoryName}: Error - ${error.message}`);
    }
  }
  
  console.log('\n2. Checking metadata collection:');
  try {
    const metadataDoc = await getDoc(doc(db, 'metadata', 'categories'));
    if (metadataDoc.exists()) {
      const categoryList = metadataDoc.data().categories || [];
      console.log('✓ Metadata found with categories:', categoryList);
      
      // Create metadata if it doesn't exist
      if (categoryList.length === 0) {
        console.log('Creating metadata with test categories...');
        await setDoc(doc(db, 'metadata', 'categories'), {
          categories: testCategories
        });
        console.log('✓ Metadata created');
      }
    } else {
      console.log('✗ No metadata collection found');
      console.log('Creating metadata collection...');
      await setDoc(doc(db, 'metadata', 'categories'), {
        categories: testCategories
      });
      console.log('✓ Metadata created');
    }
  } catch (error) {
    console.log(`✗ Metadata error: ${error.message}`);
  }
}

testCollections().then(() => {
  console.log('\nTest complete!');
  process.exit(0);
}).catch(error => {
  console.error('Test failed:', error);
  process.exit(1);
});