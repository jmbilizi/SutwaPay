import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import firebase from 'firebase/app'
import 'firebase/auth'
import { theme } from './src/core/theme'
import {
  AuthLoadingScreen,
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  ProfileScreen,
  HomeScreen,
} from './src/screens'
import { FIREBASE_CONFIG } from './src/core/config'
import { HomeIcon, ProfileIcon } from './src/assets/icons'
import DrawerContent from './src/components/DrawerContent'

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG)
}

export type RootStackParamList = {
  AuthLoadingScreen: undefined
  StartScreen: undefined
  LoginScreen: undefined
  RegisterScreen: undefined
  Home: undefined
  ResetPasswordScreen: undefined
}

export type DrawerStackParamList = {
  Home: undefined
}

export type BottomNavigationStackParamList = {
  Home: undefined
  Profile: undefined
}

const Stack = createStackNavigator<RootStackParamList>()
const Drawer = createDrawerNavigator<DrawerStackParamList>()
const Tab = createBottomTabNavigator<BottomNavigationStackParamList>()

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="AuthLoadingScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="AuthLoadingScreen"
            component={AuthLoadingScreen}
          />
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Home" component={DrawerNavigator} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <HomeIcon fill={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <ProfileIcon fill={color} />,
        }}
      />
    </Tab.Navigator>
  )
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={() => <DrawerContent />}>
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
    </Drawer.Navigator>
  )
}
