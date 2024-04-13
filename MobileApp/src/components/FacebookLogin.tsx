import React from 'react';
import {TouchableOpacity, StyleSheet, Platform, Alert} from 'react-native';
import {initializeApp as firebaseInitializeApp} from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  signInWithCredential,
  FacebookAuthProvider,
} from 'firebase/auth';
import * as Facebook from 'expo-facebook';
import {FacebookIcon} from '../assets/icons';
import {theme} from '../core/theme';
import {FACEBOOK_APP_ID, FIREBASE_CONFIG} from '../core/config';

export default function FacebookLogin() {
  const signInWithFacebook = async () => {
    const app = firebaseInitializeApp(FIREBASE_CONFIG);
    const provider = new FacebookAuthProvider();
    const auth = getAuth(app);
    if (Platform.OS === 'web') {
      signInWithPopup(auth, provider);
      return;
    }

    try {
      await Facebook.initializeAsync({
        appId: FACEBOOK_APP_ID,
      });
      const result = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (result.type === 'success') {
        const credential = FacebookAuthProvider.credential(result.token);
        await signInWithCredential(auth, credential);
      } else {
        Alert.alert('Error', 'Something went wrong.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  return (
    <TouchableOpacity onPress={signInWithFacebook} style={styles.container}>
      <FacebookIcon />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: theme.colors.facebook,
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
