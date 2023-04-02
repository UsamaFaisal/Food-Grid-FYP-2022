import React, { useState, useEffect } from 'react';
import { View, StyleSheet,Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const TrackOrder = ({route}) => {
  const { longitude, latitude } = route.params || {};
  const [onePoint, setonePoint] = useState({
    latitude: latitude,
    longitude: longitude,
  });
  const [secondPoint, setSecondPoint] = useState({
    latitude: latitude+0.05,
    longitude: longitude+0.05,
  });
  if (!latitude) {
    // The orderId parameter is missing, show an error message or navigate back to the previous screen
    return (
      <View style={styles.container}>
          <Text>Invalid</Text>
    </View>
    );
  }
  useEffect(() => {
    // Use setInterval to periodically update the second point
    const interval = setInterval(() => {
      setSecondPoint(prevPoint => ({
        latitude: prevPoint.latitude - 0.001,
        longitude: prevPoint.longitude - 0.001,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker coordinate={onePoint} />
        <Marker coordinate={secondPoint} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default TrackOrder;
