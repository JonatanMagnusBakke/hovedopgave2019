var sensorStatus = {
    "Response": {
        "SensorOverview": {
            "Status": [
                {
                    "@group": "Mobile Detectors",
                    "@sensorId": "FixedGPS-Mobile",
                    "Major": "ACTIVE",
                    "Minor": "",
                    "Description": "",
                    "Readings": {
                        "Reading": [
                            {
                                "@id": "Longitude",
                                "@log": 0,
                                "@time": "2019-04-28T08:34:30+02:00",
                                "@type": "Longitude",
                                "Value": {
                                    "@UOM": 4,
                                    "$": "000.000000E"
                                }
                            },
                            {
                                "@id": "Latitude",
                                "@log": 0,
                                "@time": "2019-04-28T08:34:30+02:00",
                                "@type": "Latitude",
                                "Value": {
                                    "@UOM": 4,
                                    "$": "00.000000N"
                                }
                            }
                        ]
                    },
                    "Position": "00.000000N000.000000E"
                },
                {
                    "@group": "Mobile Detectors",
                    "@sensorId": "RAIDM100-Mobile",
                    "Major": "ERROR",
                    "Minor": "AUTOACK",
                    "Description": "Communication error: no data received the last 15 seconds",
                    "Readings": "",
                    "Position": "00.000000N000.000000E"
                }
            ]
        }
    }
}

export {sensorStatus}