import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Map = ({ route, navigation }) => 
{
  const { longitude, latitude } = route.params || {};
  const [location, setLocation] = useState({ longitude, latitude });

  const handlePress = (event) => {
    const { longitude, latitude } = event.nativeEvent.coordinate;
    // console.log(longitude);
    // console.log(latitude);
    setLocation({ longitude:longitude, latitude:latitude });
  };
  const handleSave = async () => {
    navigation.navigate('ManageCart', { longitude:location.longitude,latitude:location.latitude});
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          longitude,
          latitude,
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
        }}
        onPress={handlePress}
      >
        <Marker coordinate={{ longitude: location.longitude, latitude: location.latitude }} />
      </MapView>
      <View style={styles.bottomBar}>
        <Text style={styles.text} onPress={handleSave}>Save</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#DDD',
  },
  text: {
    color: '#039be5',
    fontWeight: 'bold',
  },
});

export default Map;