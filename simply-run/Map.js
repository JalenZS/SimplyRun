import React, {useMemo, useEffect, useState, useRef} from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { View, Text, TouchableOpacity , StyleSheet, StatusBar, Alert} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import darkStyle from './darkStyle.json';
import BottomSheet from '@gorhom/bottom-sheet';

export default function Map() {
  const [mode, setMode] = useState(true);

  const snapPoints = useMemo(() => ['15%', '90%'], [])

  const mapRef = useRef(null);

  const [region, setRegion] = useState({  
    latitude: 38.606716300740565,
    longitude: -121.45747325343646,
    latitudeDelta: .25,
    longitudeDelta: .25
  })

  const [markers, setMarkers] = useState([]);

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
      setRegion({           //sets initial region to user position, if available
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,     
        latitudeDelta: .01,
        longitudeDelta: .01
        })
    })();
  }, []);

  const changeRegionFunction = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location)
    })();
  }

  const onMarkerSelected = (marker) => {
    Alert.alert(marker.longitude.toString())
  }

  return (
    <View style={{flex: 1}}>
      <StatusBar translucent={false} />
      <MapView 
        style={styles.map} 
        customMapStyle={mode ? darkStyle : []}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        region={region}
        showsUserLocation={true}
        showsMyLocationButton={false}
        ref={mapRef}
        onRegionChangeComplete={() => {
          changeRegionFunction();
        }}
      >
      {markers.map((marker, index) => (
        <Marker key={`marker-${index}`} coordinate={marker} onPress={() => onMarkerSelected(marker)}/>
      ))}
      </MapView>
      <BottomSheet snapPoints={snapPoints}>
        <ScrollView>
          <Text style={{fontSize: 100}}>test</Text>
          <Text style={{fontSize: 100}}>test</Text>
          <Text style={{fontSize: 100}}>test</Text>
          <Text style={{fontSize: 70}}>test</Text>
          <Text style={{fontSize: 70}}>test</Text>
          <Text style={{fontSize: 100}}>test</Text>
        </ScrollView>
      </BottomSheet>
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
          bottom: 50,
          right: 10,
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
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          backgroundColor: 'blue',
          padding: 10,
          borderRadius: 5,
        }}
        onPress={() => setMode(!mode)}
      >
      <Text style={{ color: 'white' }}>{mode ? 'Light Mode': 'Dark Mode'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          backgroundColor: 'blue',
          padding: 10,
          borderRadius: 5,
        }}
        onPress={() => mapRef.current?.animateToRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,     
                latitudeDelta: .01,
                longitudeDelta: .01
            }
        )}
      >
      <Text style={{ color: 'white' }}>My Location</Text>
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