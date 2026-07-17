export const ENV = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'your-google-client-id.apps.googleusercontent.com',
} as const;
