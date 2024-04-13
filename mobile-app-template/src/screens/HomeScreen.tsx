import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { RootStackParamList } from '../../App'
import Button from '../components/Button'
import TopBar from '../components/TopBar'

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AuthLoadingScreen'
>

type Props = {
  navigation: ProfileScreenNavigationProp & { openDrawer: () => void }
}

export default function HomeScreen({ navigation }: Props) {
  return (
    <>
      <TopBar title="Home" />
      <View style={styles.container}>
        <Button
          mode="contained"
          onPress={navigation.openDrawer}
          style={{ width: 160 }}
        >
          Open Menu
        </Button>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
