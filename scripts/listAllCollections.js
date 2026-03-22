// This script uses Firebase Admin SDK to list ALL collections
// Run this with Node.js to get a complete list of your collections

const admin = require('firebase-admin');

// Initialize admin SDK
// You'll need to download your service account key from Firebase Console
// Go to Project Settings > Service Accounts > Generate New Private Key
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function listAllCollections() {
  try {
    console.log('Fetching all collections from Firestore...\n');
    
    // Get all collections
    const collections = await db.listCollections();
    const collectionNames = [];
    const collectionData = [];
    
    // Process each collection
    for (const collection of collections) {
      const collectionName = collection.id;
      collectionNames.push(collectionName);
      
      // Get document count for each collection
      const snapshot = await collection.count().get();
      const count = snapshot.data().count;
      
      collectionData.push({
        name: collectionName,
        documentCount: count
      });
      
      console.log(`${collectionName}: ${count} documents`);
    }
    
    console.log(`\nTotal collections found: ${collections.length}`);
    
    // Save to metadata collection
    await db.collection('metadata').doc('categories').set({
      categories: collectionNames,
      categoriesWithCount: collectionData,
      lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
      totalCategories: collectionNames.length
    });
    
    console.log('\nMetadata document updated successfully!');
    
    // Create a JSON file with all collections
    const fs = require('fs');
    fs.writeFileSync('allCollections.json', JSON.stringify({
      collections: collectionNames,
      collectionsWithCount: collectionData,
      totalCollections: collectionNames.length
    }, null, 2));
    
    console.log('Collection list saved to allCollections.json');
    
  } catch (error) {
    console.error('Error listing collections:', error);
  } finally {
    // Terminate the app
    admin.app().delete();
  }
}

// Run the function
listAllCollections();