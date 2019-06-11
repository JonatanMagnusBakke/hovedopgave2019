import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import ApiInfo from '../configuration/apiInfo'
import chemIcon from '../images/chem.png'
import nucIcon from '../images/nuc.png'
import bioIcon from '../images/bio.png'
import gpsIcon from '../images/gps.png'
import unkIcon from '../images/unknown.png'

export default class SensorsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group: props.group,
      sensorsConf: [],
      sensorStat: [],
      navigation: props.test,
      url: ApiInfo.getInstance().getIp() + ":" + ApiInfo.getInstance().getPort()
    };
  }

  componentDidMount() {
    this.fetchSensorConf();
    this.fetchSensorStatus();
  }

  fetchSensorStatus = async () => {

    const response = await fetch("http://" + this.state.url + "/scim/v1.0/sensors/status", {
      method: 'GET',
      headers: {
        "apikey": "abc",
        'Accept': 'application/json'
      }
    }).catch((error) => console.log(error))
    if (response != undefined) {
      const json = await response.json();
      this.setState({ sensorStat: json.Response.SensorOverview.Status })
    }
  }

  fetchSensorConf = async () => {

    const response = await fetch("http://" + this.state.url + "/scim/v1.0/sensors/configuration", {
      method: 'GET',
      headers: {
        "apikey": "abc",
        'Accept': 'application/json'
      }
    }).catch((error) => console.log(error))
    if (response != undefined) {
      const json = await response.json();
      this.setState({ sensorsConf: json.Response.Sensor })
    }
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
      <View style={styles.container}>
        {
          this.state.sensorsConf.map((item, index) => (
            item['@group'] == this.state.group ?
              <View key={index}>
                <TouchableOpacity style={styles.sensorItem} onPress={() => this.state.navigation.navigate('Sensor',{sensorId: item['@id']})}>
                  <View style={styles.sensorImageView}>
                    <Image style={styles.sensorImage} source={this.getSensorIcon(item['@type'])} />
                    <Text style={styles.sensorName}>{item['@name']}</Text>
                  </View>
                  {
                    this.state.sensorStat.map((status, i) => (
                      status['@sensorId'] == item['@id'] ? <View style={this.getMajorStyle(status.Major)} key={i}>
                        <Text style={styles.sensorStatusText} >{status.Major}</Text>
                      </View>
                        : null
                    ))
                  }
                </TouchableOpacity>
              </View>
              :
              null
          ))
        }
      </View>
    );
  }
}

const size = 100;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#EDF1F7',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sensorItem: {
    height: size,
    width: size,
    margin: 20
  },
  sensorImage: {
    width: size * 0.50,
    height: size * 0.50
  },
  sensorName: {
    height: size * 0.15

  },
  sensorStatus: {

  },
  sensorImageView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: size * 0.8,
    backgroundColor: '#C0C0C0'
  },
  sensorStatusViewActive: {
    height: size * 0.2,
    backgroundColor: '#00FF00'
  },
  sensorStatusViewError: {
    height: size * 0.2,
    backgroundColor: '#FFC800'
  },
  sensorStatusViewOffline: {
    height: size * 0.2,
    backgroundColor: 'grey'
  },
  sensorStatusViewAlert: {
    height: size * 0.2,
    backgroundColor: 'red'
  },
  sensorStatusViewInactive: {
    height: size * 0.2,
    backgroundColor: 'yellow'
  },
  sensorStatusText: {
    textAlign: 'center'
  }

});
