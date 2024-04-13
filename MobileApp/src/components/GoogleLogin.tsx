import React from 'react';
import {TouchableOpacity, StyleSheet, Platform, Alert} from 'react-native';
import {initializeApp as firebaseInitializeApp} from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  signInWithCredential,
  GoogleAuthProvider,
} from 'firebase/auth';
import * as Google from 'expo-google-app-auth';
import {GoogleLogo} from '../assets/icons';
import {theme} from '../core/theme';
import {
  ANDROID_GOOGLE_CLIENT_ID,
  IOS_GOOGLE_CLIENT_ID,
  FIREBASE_CONFIG,
} from '../core/config';

export default function GoogleLogin() {
  const signInWithGoogle = async () => {
    const app = firebaseInitializeApp(FIREBASE_CONFIG);
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    if (Platform.OS === 'web') {
      signInWithPopup(auth, provider);
      return;
    }

    try {
      const result = await Google.logInAsync({
        clientId:
          Platform.OS === 'android'
            ? ANDROID_GOOGLE_CLIENT_ID
            : IOS_GOOGLE_CLIENT_ID,
        scopes: ['profile', 'email'],
      });
      if (result.type === 'success') {
        const credential = GoogleAuthProvider.credential(
          result.idToken,
          result.accessToken,
        );
        await signInWithCredential(auth, credential);
      } else {
        Alert.alert('Error', 'Something went wrong.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  return (
    <TouchableOpacity onPress={signInWithGoogle} style={styles.container}>
      <GoogleLogo />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: theme.colors.google,
    backgroundColor: theme.colors.surface,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 8,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
});
