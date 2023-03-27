import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const TrackOrder = () => {
  const [secondPoint, setSecondPoint] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  useEffect(() => {
    // Use setInterval to periodically update the second point
    const interval = setInterval(() => {
      setSecondPoint(prevPoint => ({
        latitude: prevPoint.latitude + 0.001,
        longitude: prevPoint.longitude + 0.001,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} />
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
