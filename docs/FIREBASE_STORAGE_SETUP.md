# Firebase Storage Setup for Medical Images

## 1. Enable Firebase Storage

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Navigate to **Storage** in the left sidebar
4. Click **Get Started**
5. Choose your security rules (start with test mode, then secure later)
6. Select your storage location

## 2. Configure Storage Rules

Update your Firebase Storage rules (`storage.rules`):

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Public read access for medical images
    match /medical-images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Dermatology images
    match /dermatology/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Radiology images
    match /radiology/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // ECG images
    match /ecg/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

## 3. Image Organization Structure

```
/medical-images/
  /dermatology/
    /conditions/
      psoriasis_01.jpg
      eczema_01.jpg
      melanoma_01.jpg
    /clinical-signs/
      butterfly_rash.jpg
      target_lesions.jpg
  /radiology/
    /chest-xray/
      pneumonia_rlb.jpg
      pneumothorax_left.jpg
    /ct-scans/
      subdural_hematoma.jpg
      stroke_mca.jpg
  /ecg/
    stemi_inferior.jpg
    atrial_fibrillation.jpg
```

## 4. Upload Images Script

Create `scripts/uploadMedicalImages.js`:

```javascript
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize admin SDK
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'your-project.appspot.com'
});

const bucket = admin.storage().bucket();

async function uploadImage(localPath, storagePath) {
  try {
    await bucket.upload(localPath, {
      destination: storagePath,
      metadata: {
        contentType: 'image/jpeg',
        metadata: {
          source: 'Educational Database',
          license: 'Educational Use Only'
        }
      }
    });
    
    // Make the file public
    const file = bucket.file(storagePath);
    await file.makePublic();
    
    // Get the public URL
    const publicUrl = \`https://storage.googleapis.com/\${bucket.name}/\${storagePath}\`;
    console.log(\`Uploaded: \${publicUrl}\`);
    return publicUrl;
  } catch (error) {
    console.error(\`Error uploading \${localPath}:`, error);
  }
}

// Upload dermatology images
const dermatologyImages = [
  { local: './images/psoriasis.jpg', storage: 'dermatology/psoriasis_01.jpg' },
  { local: './images/eczema.jpg', storage: 'dermatology/eczema_01.jpg' },
  // Add more images...
];

async function uploadAll() {
  for (const img of dermatologyImages) {
    await uploadImage(img.local, img.storage);
  }
}

uploadAll();
```

## 5. Image Sources (Copyright-Free)

### Recommended Medical Image Databases:

1. **DermNet NZ** (https://dermnetnz.org)
   - Extensive dermatology image library
   - Free for educational use with attribution

2. **Radiopaedia** (https://radiopaedia.org)
   - Radiology cases and images
   - Creative Commons licensing

3. **LITFL ECG Library** (https://litfl.com/ecg-library/)
   - Comprehensive ECG examples
   - Educational use permitted

4. **OpenI** (https://openi.nlm.nih.gov)
   - NIH medical image database
   - Public domain images

5. **MedPix** (https://medpix.nlm.nih.gov)
   - Medical image database
   - Free for educational use

6. **Wellcome Collection** (https://wellcomecollection.org)
   - Historical and modern medical images
   - CC BY license

## 6. Image Processing Recommendations

### Before uploading, optimize images:

1. **Resize**: Keep images under 1MB
   - Question display: 800x600px max
   - Thumbnail: 300x300px

2. **Format**: Use JPEG for photos, PNG for diagrams

3. **Compression**: Use tools like:
   - ImageOptim (Mac)
   - TinyPNG (Web)
   - Sharp (Node.js)

## 7. Integration with Question Generator

The system automatically:
1. Detects dermatology/visual questions
2. Matches conditions to available images
3. Adds images to question data
4. Displays images in the question UI

## 8. Alternative: Using Public CDN

Instead of Firebase Storage, you can use:

1. **Cloudinary**: 
   - Free tier available
   - Auto-optimization
   - On-the-fly transformations

2. **Local Public Folder**:
   - Store in `/public/images/medical/`
   - Simpler but less scalable

## 9. Legal Considerations

- Always verify image licenses
- Include attribution where required
- Keep documentation of image sources
- Consider patient privacy (use anonymized images)
- Add watermark if needed: "For Educational Purposes Only"

## 10. Testing Images

Test image display with sample questions:

```javascript
const testQuestion = {
  question: "A 45-year-old man presents with this rash...",
  images: [{
    url: "https://storage.googleapis.com/your-bucket/dermatology/psoriasis.jpg",
    alt: "Psoriasis plaques on elbow",
    caption: "Well-demarcated erythematous plaques with silvery scales",
    position: "before-question",
    source: "Clinical Database",
    license: "Educational Use"
  }]
};
```