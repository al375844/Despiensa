import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/Header';
import EditProfileScreen from './screens/EditProfileScreen';
import CreateProfilesScreen from './screens/CreateProfilesScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <Header title='Despiensa'></Header>
      {/* <EditProfileScreen></EditProfileScreen> */}
      <CreateProfilesScreen></CreateProfilesScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
