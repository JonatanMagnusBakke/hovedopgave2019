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
import ApiInfo from '../configuration/apiInfo'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    return(
      <ScrollView style={styles.container}>
        <Text>IP: {ApiInfo.getInstance().getIp()}</Text>
        <Text>Port: {ApiInfo.getInstance().getPort()}</Text>
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
