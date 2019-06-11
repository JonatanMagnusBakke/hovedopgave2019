import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl
} from 'react-native';
import Panel from '../components/Panel';
import SensorsView from '../components/SenorsView'
import ApiInfo from '../configuration/apiInfo'

export default class HomeScreen extends React.Component {
  state = {
    groupsData: [],
    primaryGroups: [],
    url: ApiInfo.getInstance().getIp() + ":" + ApiInfo.getInstance().getPort()
  }
  static navigationOptions = {
    title: 'Groups',
    refreshing: false
  };

  _onRefresh = async() => {
    this.setState({ refreshing: true });
    this.fetchPrimaryGroups();
    this.fetchGroupsStatus().then(() => {
      this.setState({ refreshing: false });
    });
  }

  componentDidMount() {
    this.fetchGroupsStatus();
    this.fetchPrimaryGroups();
  }

  fetchGroupsStatus = async () => {

    const response = await fetch("http://" + this.state.url +"/scim/v1.0/groups/status", {
      method: 'GET',
      headers: {
        "apikey": "abc",
        'Accept': 'application/json'
      }
    }).catch((error) => console.log(error))
    if (response != undefined) {
      const json = await response.json();
      this.setState({ groupsData: json.AggregatedState.SensorData })
    }
  }

  fetchPrimaryGroups = async () => {
    const response = await fetch("http://" + this.state.url +"/scim/v1.0/groups/primary", {
      method: 'GET',
      headers: {
        "apikey": "abc",
        'Accept': 'application/json'
      }
    }).catch((error) => console.log(error))
    if (response != undefined) {
      const json = await response.json();
      this.setState({ primaryGroups: json.Response.Groups })
    }
  }

  render() {
    return (
      <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />}>
          {
            this.state.primaryGroups instanceof Array ? 
            (
            
              this.state.primaryGroups.map((item, index) => (
                <View key={index}>
                  <Panel title={item['@group']}>
                    <SensorsView group={item['@group']}  test={this.props.navigation}></SensorsView>
                  </Panel>
                </View>
              ))
            
            ): (
              <View>
                  <Panel title={this.state.primaryGroups['@group']}>
                    <SensorsView group={this.state.primaryGroups['@group']}></SensorsView>
                  </Panel>
                </View>
            )
          }
      </ScrollView>


    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7f9',
    paddingTop: 30
  },
  listItem: {
    backgroundColor: '#EEEEEE',
    padding: 12,
    marginBottom: 1,
    flexDirection: 'row',
    alignItems: "center",
    height: 80
  },
  name: {
    paddingLeft: 12,
    color: '#666',
    fontWeight: 'bold',
    fontSize: 20
  }
});
