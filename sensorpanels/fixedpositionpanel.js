import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import Panel from '../components/Panel'
import ApiInfo from '../configuration/apiInfo'

export default class FixedPositionPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sensorId: props.sensorId,
            url: ApiInfo.getInstance().getIp() + ":" + ApiInfo.getInstance().getPort(),
            reading: []
        };
    }

    fetchSensorInformation = async () =>
    {
        const response = await fetch("http://" + this.state.url +"/scim/v1.0/sensors/" + this.state.sensorId, {
      method: 'GET',
      headers: {
        "apikey": "abc",
        'Accept': 'application/json'
      }
    }).catch((error) => console.log(error))
    if (response != undefined) {
      const json = await response.json();
      this.setState({ reading: json.SensorData.Reading})
    }
    }

    componentDidMount() {
        this.fetchSensorInformation()
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
                <Text style={styles.legend}>Reading</Text>
                <View style={styles.fieldset}>


                    {this.state.reading.map((item, index) =>(
                        
                        item['@type'] != "toggle" ? 
                        <View key={index} style={styles.read}>
                            <Text style={styles.atri}>{item['@id']}</Text>
                             <Text style={styles.atriValue}>{item.Value['$']}</Text>
                        </View>
                        : 
                        null
                    ))}
                </View>

                <Text style={styles.legend}>Status</Text>
                <View style={styles.fieldset}>
                    <TouchableOpacity style={this.getMajorStyle("ACTIVE")}>
                        <Text style={styles.buttonText}>ACTIVE</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fieldset: {
        margin: 8,
        borderWidth: 1,
        padding: 8,
        borderRadius: 4,
        borderColor: '#d6d7da',
        backgroundColor: '#EDF1F7',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    legend: {
        marginLeft: 8,
        fontWeight: 'bold',
    },
    atri: {
        padding: 5,
        width: '50%'
    },
    atriValue: {
        padding: 5,
        width: '50%',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#d6d7da',
    },
    read:{
        flexDirection: 'row',
        width :'100%'
    },
    sensorStatusViewActive: {
        backgroundColor: '#00FF00',
        flex: 1
    },
    sensorStatusViewError: {
        backgroundColor: '#FFC800',
        flex: 1
    },
    sensorStatusViewOffline: {
        backgroundColor: 'grey',
        flex: 1
    },
    sensorStatusViewAlert: {
        backgroundColor: 'red',
        flex: 1
    },
    sensorStatusViewInactive: {
        backgroundColor: 'yellow',
        flex: 1
    },
    buttonText: {
        textAlign: 'center'
    },
    modifyButton: {
        justifyContent: "center",
        backgroundColor: "grey",
        padding: 10,
        marginTop: 5,
        width: '100%',
        height: 30
    }

});
