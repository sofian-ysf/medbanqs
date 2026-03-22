# How to List ALL Firebase Collections

Since Firestore doesn't allow listing collections from the client SDK, you need to use the Admin SDK. Here's how:

## Setup Instructions

1. **Get your Firebase Admin Service Account Key:**
   - Go to Firebase Console
   - Click on Project Settings (gear icon)
   - Go to "Service Accounts" tab
   - Click "Generate New Private Key"
   - Save the downloaded JSON file as `serviceAccountKey.json` in this scripts folder

2. **Install dependencies:**
   ```bash
   cd scripts
   npm install
   ```

3. **Run the script:**
   ```bash
   npm run list-collections
   ```

This will:
- List ALL collections in your Firestore database
- Show the document count for each collection
- Save the list to your Firebase metadata collection
- Create a local `allCollections.json` file with all the data

## What happens next?

Once you run this script, your ProfilePage will automatically load all collections from the metadata document in Firebase.

## Alternative: Manual Update

If you can't use the Admin SDK, you can manually add all your collection names to the `commonCategories` array in ProfilePage.js (lines 65-147).

## Important Notes

- The Admin SDK script needs to be run server-side (not in the browser)
- Keep your service account key secure and never commit it to git
- Add `serviceAccountKey.json` to your `.gitignore` file
- Run this script whenever you add new collections to your database