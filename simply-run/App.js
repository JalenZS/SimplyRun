import React, {useEffect, useState, useRef} from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { View, Text, TouchableOpacity , StyleSheet, StatusBar} from 'react-native';
import * as Location from 'expo-location';

export default function App() {

  const mapRef = useRef(null);

  const [region, setRegion] = useState({  
    latitude: 38.606716300740565,
    longitude: -121.45747325343646,
    latitudeDelta: .01,
    longitudeDelta: .01
  })

  const [markers, setMarkers] = useState([
    {
      latitude: 38.606716300740565,
      longitude: -121.45747325343646,
    },
    {
      latitude: 38.606716300740565,
      longitude: -121.45647325343646,
    }
  ]);

  const [location, setLocation] = useState({"coords": {"accuracy": 9.289999961853027, "altitude": -20.100000381469727, "altitudeAccuracy": 0.8094989657402039, "heading": 130.65692138671875, "latitude": 38.6025332, "longitude": -121.4632824, "speed": 0.24433356523513794}, "mocked": false, "timestamp": 1716832128592})

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location)
      console.log(location)
    })();
  }, []);

  changeRegionFunction = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location)
      console.log(location)
    })();
  }

  return (
    <View style={{flex: 1}}>
      <StatusBar translucent={false} />
      <MapView 
        style={styles.map} 
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        region={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        ref={mapRef}
        onRegionChangeComplete={() => {
          changeRegionFunction();
        }}
      >
      {markers.map((marker, index) => (
        <Marker key={`marker-${index}`} coordinate={marker} />
      ))}
      </MapView>
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
          backgroundColor: 'blue',
          padding: 10,
          borderRadius: 5,
        }}
        //replace this with code to get current camera location
        onPress={async () => {
          const camera = await mapRef.current.getCamera();
          setMarkers(currentMarkers => [
            ...currentMarkers,
            {
              latitude: camera.center.latitude,
              longitude: camera.center.longitude,
            },
          ]);
        }}
      >
      <Text style={{ color: 'white' }}>Place Marker Here</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 10,
          left: 10,
          backgroundColor: 'blue',
          padding: 10,
          borderRadius: 5,
        }}
        onPress={() => 
          {
            setMarkers(currentMarkers => [...currentMarkers, {  latitude: location.coords.latitude,
              longitude: location.coords.longitude}]);
          }}
      >
      <Text style={{ color: 'white' }}>Place Marker At My Location</Text>
      </TouchableOpacity>
    </View>
  );


};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
    alignSelf: 'flex-end'
  }
});