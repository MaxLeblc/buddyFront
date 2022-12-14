import { LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...', 'ViewPropTypes will be removed ...', ]); 
LogBox.ignoreAllLogs();

import React from 'react';
import 'react-native-gesture-handler';
 
// import de toutes nos pages pour la navigation
import HomeScreen from './screens/HomeScreen'; 
import EmailScreen from './screens/EmailScreen';
import PasswordScreen from './screens/PasswordScreen';
import SignInScreen from './screens/SignInScreen';
import PseudoScreen from './screens/PseudoScreen';
import BirthdayScreen from './screens/BirthdayScreen';
import SearchGames from './screens/SearchGames';
import MoodScreen from './screens/MoodScreen';
import PlatformScreen from './screens/PlatformScreen';
import LanguageScreen from './screens/LanguageScreen';
import AgeScreen from './screens/AgeScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import ProfilScreen from './screens/ProfilScreen';
import MatchScreen from './screens/MatchScreen';
import ChatScreen from './screens/ChatScreen';
import EditScreen from './screens/EditScreen';
import Rooms from './screens/RoomScreen';

import EditPictureScreen from './screens/EditPictureScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import age from './reducers/age';
import pseudo from './reducers/pseudo';
import mail from './reducers/mail';
import mdp from './reducers/password';
import token from './reducers/token';
import room from './reducers/room';
import match from './reducers/match';


import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';

import socket from './reducers/socket';

const store = createStore(combineReducers({ age, pseudo, mail, mdp,socket,room, match, token})); // creation du store

const Stack = createStackNavigator();

function App(){

 return ( // stack navigation
  <Provider store={store}>
  <NavigationContainer> 
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="BirthdayScreen" component={BirthdayScreen} />
      <Stack.Screen name="PseudoScreen" component={PseudoScreen} />
      <Stack.Screen name="EmailScreen" component={EmailScreen} />
      <Stack.Screen name="PasswordScreen" component={PasswordScreen} />
      <Stack.Screen name="SignInScreen" component={SignInScreen}/>
      <Stack.Screen name="SearchGames" component={SearchGames}/>
      <Stack.Screen name="MoodScreen" component={MoodScreen}/>
      <Stack.Screen name="PlatformScreen" component={PlatformScreen}/>
      <Stack.Screen name="LanguageScreen" component={LanguageScreen}/>
      <Stack.Screen name="AgeScreen" component={AgeScreen}/>
      <Stack.Screen name="DiscoverScreen" component={DiscoverScreen}/>
      <Stack.Screen name="ProfilScreen" component={ProfilScreen}/>
      <Stack.Screen name="MatchScreen" component={MatchScreen}/>
      <Stack.Screen name="ChatScreen" component={ChatScreen}/>
      <Stack.Screen name="EditScreen" component={EditScreen}/>
      <Stack.Screen name="RoomScreen" component={Rooms}/>

      <Stack.Screen name="EditPictureScreen" component={EditPictureScreen}/>

    </Stack.Navigator>
  </NavigationContainer></Provider>
);
 }


 
export default App;





