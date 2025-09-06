import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { Bars3Icon, MagnifyingGlassIcon, ExclamationTriangleIcon, ChartBarIcon } from 'react-native-heroicons/outline';
import { MapPinIcon } from 'react-native-heroicons/solid';
import WebView from 'react-native-webview';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

export default function MapScreen({ onLogout, navigation, userLocation }) {
  const [searchText, setSearchText] = useState('');
  const [currentLocation, setCurrentLocation] = useState(userLocation);
  const [isLocating, setIsLocating] = useState(false);
  const [isAutoTracking, setIsAutoTracking] = useState(true);
  const webViewRef = useRef(null);

  // Update current location when userLocation prop changes
  useEffect(() => {
    if (userLocation && isAutoTracking) {
      setCurrentLocation(userLocation);
      updateMapLocation(userLocation);
    }
  }, [userLocation, isAutoTracking]);

  // Use current location or fallback to user location or Malolos
  const mapCenter = currentLocation || userLocation || { latitude: 14.8432, longitude: 120.8126 };

  // Sample incident data - adjust based on user location area
  const incidents = [
    { id: 1, lat: mapCenter.latitude + 0.002, lng: mapCenter.longitude - 0.002, type: 'theft', severity: 'high' },
    { id: 2, lat: mapCenter.latitude + 0.004, lng: mapCenter.longitude + 0.003, type: 'robbery', severity: 'medium' },
    { id: 3, lat: mapCenter.latitude - 0.003, lng: mapCenter.longitude - 0.004, type: 'theft', severity: 'low' },
  ];

  // Function to update map location
  const updateMapLocation = (location) => {
    if (webViewRef.current && location) {
      const updateScript = `
        map.setView([${location.latitude}, ${location.longitude}], 16);
        
        // Remove existing user marker
        map.eachLayer(function(layer) {
          if (layer instanceof L.Marker && layer.options.isUserMarker) {
            map.removeLayer(layer);
          }
        });
        
        // Add new user marker
        var userIcon = L.divIcon({
          html: '<div style="background: #3B82F6; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>',
          className: 'user-marker',
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });

        L.marker([${location.latitude}, ${location.longitude}], {
          icon: userIcon,
          isUserMarker: true
        }).addTo(map).bindPopup('Your Location');
      `;
      webViewRef.current.postMessage(updateScript);
    }
  };

  // Function to get current location manually
  const getCurrentLocation = async () => {
    setIsLocating(true);
    try {
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const newLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setCurrentLocation(newLocation);
      updateMapLocation(newLocation);
      setIsAutoTracking(true); // Re-enable auto tracking
    } catch (error) {
      console.log('Location error:', error);
      Alert.alert('Location Error', 'Unable to get current location. Please try again.');
    } finally {
      setIsLocating(false);
    }
  };

  // Toggle auto tracking
  const toggleAutoTracking = () => {
    setIsAutoTracking(!isAutoTracking);
  };

  // Generate Leaflet HTML
  const generateMapHTML = () => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
            body { margin: 0; padding: 0; }
            #map { height: 100vh; width: 100vw; }
            .risk-zone-high { 
                background: rgba(239, 68, 68, 0.3); 
                border: 2px solid #EF4444; 
                border-radius: 50%; 
            }
            .risk-zone-medium { 
                background: rgba(245, 158, 11, 0.3); 
                border: 2px solid #F59E0B; 
                border-radius: 50%; 
            }
            .risk-zone-low { 
                background: rgba(34, 197, 94, 0.3); 
                border: 2px solid #22C55E; 
                border-radius: 50%; 
            }
        </style>
    </head>
    <body>
        <div id="map"></div>
        <script>
            // Initialize map centered on user location
            var map = L.map('map').setView([${mapCenter.latitude}, ${mapCenter.longitude}], 16);
            
            // Add OpenStreetMap tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            // Risk zones relative to user location
            var highRiskZone = L.circle([${mapCenter.latitude + 0.002}, ${mapCenter.longitude - 0.002}], {
                color: '#EF4444',
                fillColor: '#EF4444',
                fillOpacity: 0.3,
                radius: 200,
                className: 'risk-zone-high'
            }).addTo(map);

            var mediumRiskZone = L.circle([${mapCenter.latitude + 0.004}, ${mapCenter.longitude + 0.003}], {
                color: '#F59E0B',
                fillColor: '#F59E0B',
                fillOpacity: 0.3,
                radius: 150,
                className: 'risk-zone-medium'
            }).addTo(map);

            var lowRiskZone = L.circle([${mapCenter.latitude - 0.003}, ${mapCenter.longitude - 0.004}], {
                color: '#22C55E',
                fillColor: '#22C55E',
                fillOpacity: 0.3,
                radius: 100,
                className: 'risk-zone-low'
            }).addTo(map);

            // Custom icon for incidents
            var incidentIcon = L.divIcon({
                html: '<div style="background: #EF4444; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center;"><svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 11 6 11s6-5.75 6-11c0-3.314-2.686-6-6-6z"/></svg></div>',
                className: 'incident-marker',
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            });

            // Add incident markers
            ${incidents.map(incident => `
                L.marker([${incident.lat}, ${incident.lng}], {icon: incidentIcon})
                    .addTo(map)
                    .bindPopup('<b>Incident Report</b><br/>Type: ${incident.type}<br/>Severity: ${incident.severity}');
            `).join('')}

            // User location marker
            var userIcon = L.divIcon({
                html: '<div style="background: #3B82F6; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>',
                className: 'user-marker',
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            });

            L.marker([${mapCenter.latitude}, ${mapCenter.longitude}], {
                icon: userIcon,
                isUserMarker: true
            }).addTo(map).bindPopup('Your Location');

            // Listen for messages from React Native
            window.addEventListener('message', function(event) {
              try {
                eval(event.data);
              } catch (e) {
                console.log('Error executing script:', e);
              }
            });
        </script>
    </body>
    </html>
    `;
  };

  const handleAnalysisPress = () => {
    if (navigation) {
      navigation.navigate('IncidentAnalysis');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onLogout}>
          <Bars3Icon size={24} color="white" />
        </TouchableOpacity>
        
        <View style={styles.searchContainer}>
          <MagnifyingGlassIcon size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <WebView
          ref={webViewRef}
          source={{ html: generateMapHTML() }}
          style={styles.map}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          onMessage={(event) => {
            // Handle messages from WebView if needed
          }}
        />
      </View>

      {/* Floating Action Buttons */}
      <View style={styles.fabContainer}>
        <TouchableOpacity 
          style={[
            styles.locationFab, 
            isLocating && styles.locatingFab,
            isAutoTracking && styles.autoTrackingFab
          ]} 
          onPress={getCurrentLocation}
          onLongPress={toggleAutoTracking}
          disabled={isLocating}
        >
          <View style={styles.locationIcon}>
            <View style={[
              styles.locationDot, 
              isLocating && styles.locatingDot,
              isAutoTracking && styles.autoTrackingDot
            ]} />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.warningFab}>
          <ExclamationTriangleIcon size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <ExclamationTriangleIcon size={24} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton} onPress={handleAnalysisPress}>
          <ChartBarIcon size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#EF4444',
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1000,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    marginLeft: 16,
    paddingHorizontal: 16,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  fabContainer: {
    position: 'absolute',
    right: 16,
    bottom: 120,
    zIndex: 1000,
  },
  locationFab: {
    width: 48,
    height: 48,
    backgroundColor: 'white',
    borderRadius: 24,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  locationIcon: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#EF4444',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationDot: {
    width: 8,
    height: 8,
    backgroundColor: '#EF4444',
    borderRadius: 4,
  },
  locatingFab: {
    opacity: 0.7,
  },
  locatingDot: {
    backgroundColor: '#F59E0B',
  },
  autoTrackingFab: {
    borderWidth: 2,
    borderColor: '#22C55E',
  },
  autoTrackingDot: {
    backgroundColor: '#22C55E',
  },
  warningFab: {
    width: 48,
    height: 48,
    backgroundColor: 'white',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#EF4444',
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 32,
    justifyContent: 'space-around',
    zIndex: 1000,
  },
  navButton: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});