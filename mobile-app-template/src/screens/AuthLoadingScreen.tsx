import React from 'react'
import { ActivityIndicator } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import firebase from 'firebase/app'
import Background from '../components/Background'
import { theme } from '../core/theme'
import { RootStackParamList } from '../../App'

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AuthLoadingScreen'
>

type Props = {
  navigation: ProfileScreenNavigationProp
}

export default function AuthLoadingScreen({ navigation }: Props) {
  firebase.auth().onAuthStateChanged((user: any) => {
    if (user) {
      // User is logged in
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    } else {
      // User is not logged in
      navigation.reset({
        index: 0,
        routes: [{ name: 'StartScreen' }],
      })
    }
  })

  return (
    <Background>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </Background>
  )
}
