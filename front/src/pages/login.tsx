import { Logo } from '@/component/common/Logo';
import { LockIcon } from '@chakra-ui/icons';
import { Button, GenericAvatarIcon, HStack, Input, InputGroup, InputLeftAddon, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';
import { GoogleLogin } from 'react-google-login';

const refreshTokenSetup = (res: any) => {
  // Timing to renew access token
  let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();
    refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
    console.log('newAuthRes:', newAuthRes);
    // saveUserToken(newAuthRes.access_token);  <-- save new token
    localStorage.setItem('authToken', newAuthRes.id_token);

    // Setup the other timer after the first one
    setTimeout(refreshToken, refreshTiming);
  };

  // Setup first refresh timer
  setTimeout(refreshToken, refreshTiming);
};

export default function Login() {
  const onSuccess = (res: any) => {
    console.log('Login Success: currentUser:', res.profileObj);
    alert(`Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`);
    refreshTokenSetup(res);
  };

  const onFailure = (res: any) => {
    console.log('Login failed: res:', res);
    alert(`Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`);
  };

  return (
    <VStack maxW="400px" w="full" h="full" align="center" justify="center" spacing="32px" pb="80px">
      <Logo />

      <GoogleLogin
        clientId="503224493558-a4a14sn8oqtun95qp8d4t9mnh95nuqa0.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </VStack>
  );
}
