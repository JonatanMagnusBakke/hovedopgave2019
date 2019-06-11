import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import Panel from '../components/Panel'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    return(
      <ScrollView style={styles.container}>
      </ScrollView>
    )
  }
}
var styles = StyleSheet.create({
  container: {
    flex            : 1,
    backgroundColor : '#f4f7f9'
  },
  
});
