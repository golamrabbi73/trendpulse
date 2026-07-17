'use client';

import * as React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '../hooks/useAuth';

export function GoogleLoginButton() {
  const { mutate: googleLogin } = useGoogleLogin();

  return (
    <div className="flex justify-center w-full">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (credentialResponse.credential) {
            googleLogin(credentialResponse.credential);
          }
        }}
        onError={() => {
          console.log('Login Failed');
        }}
        useOneTap
        shape="rectangular"
        width="100%"
      />
    </div>
  );
}
