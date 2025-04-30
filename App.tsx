import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import changeNavigationBarColor from "react-native-navigation-bar-color";
import React, { useEffect } from 'react';
import OnboardingPage from "./onboarding";
import MainPage from "./MainPage";
import ListPage from "./ListPage";
import EditItem from "./editItem";
import SettingsPage from "./settings";
import EditList from "./editList";
import { getListNames, getTheme, Task, useGlobalStore } from './common';

export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
  EditList: { item: string };
  List: {item: string}; 
  SettingsPage: undefined;
  EditItem: { item: Task, index: number, listName: string }; 
};

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  const rerenderFlag = useGlobalStore((state) => state.rerenderFlag);
    changeNavigationBarColor(getTheme() == "light" ? "white" : "black");
        useEffect(() => {
        }, [rerenderFlag]);
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={getListNames().length == 0 ? "Onboarding" : "Main"} screenOptions={{headerShown: false}}>
        <Stack.Screen name="Onboarding" component={OnboardingPage} />
        <Stack.Screen name="Main" component={MainPage} />
        <Stack.Screen name="EditList" component={EditList} />
        <Stack.Screen name="List" component={ListPage} />
        <Stack.Screen name="SettingsPage" component={SettingsPage} />
        <Stack.Screen name="EditItem" component={EditItem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
