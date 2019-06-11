var sensorConfiguration = {
    "Response": {
        "Sensor": [
            {
                "@group": "Mobile Detectors",
                "@id": "FixedGPS-Mobile",
                "@model": "FixedPosition",
                "@name": "GPS",
                "@type": "GPS",
                "SecondaryGroup": "System",
                "Capability": "GenerateReport"
            },
            {
                "@group": "Mobile Detectors",
                "@id": "RAIDM100-Mobile",
                "@model": "RAID-M",
                "@name": "RAID-M 100",
                "@type": "CHEM",
                "SecondaryGroup": [
                    "Chem",
                    "System"
                ],
                "Capability": [
                    "Simulate",
                    "GenerateReport"
                ]
            }
        ]
    }
}

export {sensorConfiguration}