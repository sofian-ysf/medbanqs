const https = require('https');

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error('ERROR: OPENAI_API_KEY environment variable is not set');
  process.exit(1);
}

// Test 1: Check API key format
console.log('Testing OpenAI API Key...\n');
console.log('API Key starts with:', apiKey.substring(0, 10) + '...');
console.log('API Key length:', apiKey.length);

// Test 2: Make a minimal API request
const data = JSON.stringify({
  model: 'gpt-3.5-turbo',
  messages: [{ role: 'user', content: 'Hi' }],
  max_tokens: 5
});

const options = {
  hostname: 'api.openai.com',
  port: 443,
  path: '/v1/chat/completions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  console.log('\nAPI Response Status:', res.statusCode);
  
  let responseData = '';
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    const response = JSON.parse(responseData);
    
    if (res.statusCode === 200) {
      console.log('✅ SUCCESS! API is working');
      console.log('Response:', response.choices[0].message.content);
    } else {
      console.log('❌ ERROR:', res.statusCode);
      console.log('Error details:', JSON.stringify(response, null, 2));
      
      if (response.error?.type === 'insufficient_quota') {
        console.log('\n⚠️  DIAGNOSIS: Quota Issue');
        console.log('This API key has no available credits.');
        console.log('Possible causes:');
        console.log('1. This key is from a different organization than shown in screenshot');
        console.log('2. This is a project key with its own separate billing');
        console.log('3. The key has been rate limited');
        
        console.log('\nSOLUTION:');
        console.log('1. Go to: https://platform.openai.com/api-keys');
        console.log('2. Create a NEW API key (not a project key)');
        console.log('3. Make sure you\'re in the right organization (moccet)');
        console.log('4. Replace the key in .env.local');
      }
    }
  });
});

req.on('error', (error) => {
  console.error('Request error:', error);
});

req.write(data);
req.end();