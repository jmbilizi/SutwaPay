import firebase from 'firebase/app'
import 'firebase/auth'

export const logoutUser = () => {
  firebase.auth().signOut()
}

export const signUpUser = async ({
  name,
  email,
  password,
}: {
  name: string
  email: string
  password: string
}) => {
  try {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
    firebase?.auth()?.currentUser?.updateProfile({
      displayName: name,
    })
    return { user }
  } catch (error) {
    return {
      error: error.message,
    }
  }
}

export const loginUser = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  try {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
    return { user }
  } catch (error) {
    return {
      error: error.message,
    }
  }
}

export const sendEmailWithPassword = async (email: string) => {
  try {
    await firebase.auth().sendPasswordResetEmail(email)
    return {}
  } catch (error) {
    return {
      error: error.message,
    }
  }
}
