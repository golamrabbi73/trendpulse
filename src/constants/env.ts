export const ENV = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
} as const;
