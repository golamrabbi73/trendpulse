// eslint-disable-next-line @typescript-eslint/no-require-imports
const http = require('http');

const options = {
  hostname: '127.0.0.1',
  port: 5000,
  path: '/api/v1/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Response:', res.statusCode, data));
});

req.on('error', e => console.error('Error:', e.message));

req.write(JSON.stringify({
  name: 'Test User',
  email: 'test@trendpulse.ai',
  password: 'password123'
}));
req.end();
