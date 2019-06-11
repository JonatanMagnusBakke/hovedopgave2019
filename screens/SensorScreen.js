import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import ApiInfo from '../configuration/apiInfo'
import chemIcon from '../images/chem.png'
import nucIcon from '../images/nuc.png'
import bioIcon from '../images/bio.png'
import gpsIcon from '../images/gps.png'
import unkIcon from '../images/unknown.png'
import FixedPositionPanel from '../sensorpanels/fixedpositionpanel'

class SensorScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sensorId: props.navigation.state.params.sensorId,
      url: ApiInfo.getInstance().getIp() + ":" + ApiInfo.getInstance().getPort()
    };
  }

  getSensorIcon(type) {
    let res = "";
    switch (type) {
      case "CHEM":
        res = chemIcon
        break;
      case "NUC":
        res = nucIcon
        break;
      case "BIO":
        res = bioIcon
        break;
      case "GPS":
        res = gpsIcon
        break;
      default:
        res = unkIcon
    }

    return res;
  }

  getMajorStyle(major) {
    let res = "";
    switch (major) {
      case "ACTIVE":
        res = styles.sensorStatusViewActive
        break;
      case "ERROR":
        res = styles.sensorStatusViewError
        break;
      case "OFFLINE":
        res = styles.sensorStatusViewOffline
        break;
      case "ALERT":
        res = styles.sensorStatusViewAlert
        break;
      case "INACTIVE":
        res = styles.sensorStatusViewInactive
        break;
      default:
        res = styles.sensorStatusViewError
    }

    return res;
  }

  render() {
    return (
      <ScrollView style={styles.container}>
      <Text>{this.state.sensorId}</Text>
      <FixedPositionPanel sensorId={this.state.sensorId}></FixedPositionPanel>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


export default SensorScreen;
