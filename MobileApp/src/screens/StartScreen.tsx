import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import {RootStackParamList} from '../../App';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AuthLoadingScreen'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export default function StartScreen({navigation}: Props) {
  return (
    <Background>
      <Logo />
      <Header>Sutwa Pay</Header>
      <Paragraph>
        The best and only Money App build for everyone and every lifestyle.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}>
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}>
        Sign Up
      </Button>
    </Background>
  );
}
