const crypto = require('crypto');

// Generate secure random API keys
function generateApiKey(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

// Generate your API keys
const apiKey = generateApiKey(32);

console.log('========================================');
console.log('🔐 Generated API Keys for MedBanqs');
console.log('========================================\n');

console.log('Add these to your .env.local file:\n');
console.log(`QUESTION_GENERATION_API_KEY=${apiKey}`);
console.log(`NEXT_PUBLIC_QUESTION_API_KEY=${apiKey}`);

console.log('\n========================================');
console.log('📋 Instructions:');
console.log('========================================');
console.log('1. Copy the above lines');
console.log('2. Open your .env.local file');
console.log('3. Paste these lines into the file');
console.log('4. Save the file');
console.log('5. Restart your Next.js server');
console.log('\n⚠️  Keep these keys secret and never commit them to git!');
console.log('========================================\n');

// Also generate a backup key if needed
const backupKey = generateApiKey(32);
console.log('🔄 Backup API Key (store securely):');
console.log(backupKey);
console.log('\n========================================');