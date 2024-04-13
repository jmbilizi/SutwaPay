import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {initializeApp as firebaseInitializeApp} from 'firebase/app';
import {FIREBASE_CONFIG} from '../core/config';
import 'firebase/auth';

const app = firebaseInitializeApp(FIREBASE_CONFIG);

const auth = getAuth(app);

export const logoutUser = () => {
  getAuth().signOut();
};

export const signUpUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    const currentUser = getAuth().currentUser;
    if (currentUser) {
      updateProfile(currentUser, {
        displayName: name,
      });
    }
    return {user};
  } catch (error) {
    return {
      error: 'Sign up failed!',
    };
  }
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return {user};
  } catch (error) {
    return {
      error: 'Log in failed!',
    };
  }
};

export const sendEmailWithPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {};
  } catch (error) {
    return {
      error: 'Failed to send a password reset email!',
    };
  }
};
