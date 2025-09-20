import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Dimensions, 
  Alert,
  Modal 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Bars3Icon, 
  MagnifyingGlassIcon, 
  ExclamationTriangleIcon, 
  ChartBarIcon,
  MapPinIcon,
  XMarkIcon,
  HomeIcon,
  UserIcon as ProfileIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon
} from 'react-native-heroicons/outline';
import { 
  ExclamationTriangleIcon as ExclamationTriangleSolidIcon,
  ChartBarIcon as ChartBarSolidIcon
} from 'react-native-heroicons/solid';
import WebView from 'react-native-webview';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

export default function MapScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const webViewRef = useRef(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Default location (Malolos, Bulacan based on your image)
  const defaultLocation = { latitude: 14.8432, longitude: 120.8126 };
  const mapCenter = currentLocation || defaultLocation;

  // Risk zones data matching your image
  const riskZones = [
    {
      id: 1,
      lat: 14.8448,
      lng: 120.8115,
      radius: 350,
      color: '#EF4444',
      fillColor: 'rgba(239, 68, 68, 0.25)',
      riskLevel: 'high',
      title: 'High Risk Zone',
      incidents: 15
    },
    {
      id: 2,
      lat: 14.8425,
      lng: 120.8145,
      radius: 200,
      color: '#F59E0B',
      fillColor: 'rgba(245, 158, 11, 0.25)',
      riskLevel: 'medium',
      title: 'Medium Risk Zone',
      incidents: 8
    },
    {
      id: 3,
      lat: 14.8410,
      lng: 120.8105,
      radius: 180,
      color: '#22C55E',
      fillColor: 'rgba(34, 197, 94, 0.25)',
      riskLevel: 'low',
      title: 'Low Risk Zone',
      incidents: 2
    }
  ];

  // Incident markers
  const incidents = [
    {
      id: 1,
      lat: 14.8445,
      lng: 120.8118,
      type: 'theft',
      severity: 'high',
      time: '2 hours ago',
      icon: '🚨'
    },
    {
      id: 2,
      lat: 14.8420,
      lng: 120.8140,
      type: 'robbery',
      severity: 'medium',
      time: '5 hours ago',
      icon: '⚠️'
    },
    {
      id: 3,
      lat: 14.8415,
      lng: 120.8110,
      type: 'suspicious',
      severity: 'low',
      time: '1 day ago',
      icon: '👁️'
    }
  ];

  const getCurrentLocation = async () => {
    setIsLocating(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Permission to access location was denied');
        setIsLocating(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.log('Location error:', error);
    } finally {
      setIsLocating(false);
    }
  };

  const generateMapHTML = () => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
            body { 
                margin: 0; 
                padding: 0; 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            #map { 
                height: 100vh; 
                width: 100vw; 
            }
            .custom-div-icon {
                background: transparent;
                border: none;
            }
            .risk-marker {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                color: white;
                font-weight: bold;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                border: 3px solid white;
            }
            .risk-high { background: #EF4444; }
            .risk-medium { background: #F59E0B; }
            .risk-low { background: #22C55E; }
            .user-location {
                width: 20px;
                height: 20px;
                background: #3B82F6;
                border: 3px solid white;
                border-radius: 50%;
                box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            }
            .leaflet-popup-content-wrapper {
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            }
            .leaflet-popup-content {
                margin: 12px;
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div id="map"></div>
        <script>
            // Initialize map
            var map = L.map('map', {
                zoomControl: false,
                attributionControl: false
            }).setView([${mapCenter.latitude}, ${mapCenter.longitude}], 16);
            
            // Add OpenStreetMap tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '',
                maxZoom: 19
            }).addTo(map);

            // Add risk zones
            ${riskZones.map(zone => `
            var riskZone${zone.id} = L.circle([${zone.lat}, ${zone.lng}], {
                color: '${zone.color}',
                fillColor: '${zone.fillColor}',
                fillOpacity: 0.6,
                radius: ${zone.radius},
                weight: 2
            }).addTo(map);
            
            riskZone${zone.id}.bindPopup(\`
                <div style="text-align: center;">
                    <strong>${zone.title}</strong><br>
                    <span style="color: ${zone.color};">●</span> ${zone.riskLevel.toUpperCase()} RISK<br>
                    ${zone.incidents} incidents this week
                </div>
            \`);
            `).join('')}

            // Add incident markers
            ${incidents.map(incident => {
              const color = incident.severity === 'high' ? '#EF4444' : 
                           incident.severity === 'medium' ? '#F59E0B' : '#22C55E';
              return `
              var incidentIcon${incident.id} = L.divIcon({
                  html: '<div class="risk-marker risk-${incident.severity}">${incident.icon}</div>',
                  className: 'custom-div-icon',
                  iconSize: [30, 30],
                  iconAnchor: [15, 15]
              });
              
              L.marker([${incident.lat}, ${incident.lng}], { 
                  icon: incidentIcon${incident.id} 
              }).addTo(map)
                .bindPopup(\`
                    <div style="text-align: center; min-width: 120px;">
                        <strong style="color: ${color};">${incident.type.toUpperCase()}</strong><br>
                        <span style="color: #666; font-size: 12px;">${incident.time}</span><br>
                        <span style="color: ${color}; font-size: 12px;">●</span> ${incident.severity} priority
                    </div>
                \`);
              `;
            }).join('')}

            // Add user location if available
            ${currentLocation ? `
            var userIcon = L.divIcon({
                html: '<div class="user-location"></div>',
                className: 'custom-div-icon',
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            });
            
            L.marker([${currentLocation.latitude}, ${currentLocation.longitude}], { 
                icon: userIcon 
            }).addTo(map)
              .bindPopup('<div style="text-align: center;"><strong>Your Location</strong></div>');
            ` : ''}

            // Disable scroll zoom initially
            map.scrollWheelZoom.disable();
            
            // Enable zoom on click
            map.on('focus', function() { map.scrollWheelZoom.enable(); });
            map.on('blur', function() { map.scrollWheelZoom.disable(); });
        </script>
    </body>
    </html>
    `;
  };

  const handleSearch = () => {
    if (searchText.trim()) {
      Alert.alert('Search', `Searching for: ${searchText}`);
    }
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleMenuItemPress = (item) => {
    setIsMenuVisible(false);
    switch (item) {
      case 'home':
        navigation.navigate('Welcome');
        break;
      case 'profile':
        Alert.alert('Profile', 'Profile feature coming soon');
        break;
      case 'settings':
        Alert.alert('Settings', 'Settings feature coming soon');
        break;
      case 'logout':
        Alert.alert('Logout', 'Are you sure you want to logout?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Logout', onPress: () => navigation.navigate('Welcome') }
        ]);
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      {/* Header */}
      <View className="bg-primary-500 flex-row items-center justify-between px-4 py-4" style={{ backgroundColor: '#EF4444', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 16 }}>
        <TouchableOpacity 
          className="p-2" 
          style={{ padding: 8 }}
          onPress={toggleMenu}
        >
          <Bars3Icon size={24} color="white" />
        </TouchableOpacity>
        
        <View className="flex-1" style={{ flex: 1 }} />
        
        <View className="w-6" style={{ width: 24 }} />
      </View>

      {/* Search Bar */}
      <View className="px-4 py-3 bg-white" style={{ paddingHorizontal: 16, paddingVertical: 12, backgroundColor: 'white' }}>
        <View className="flex-row items-center bg-white rounded-full px-4 py-3 border border-gray-200" style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 25, paddingHorizontal: 16, paddingVertical: 12, borderWidth: 1, borderColor: '#E5E7EB' }}>
          <MagnifyingGlassIcon size={20} color="#9CA3AF" />
          <TextInput
            className="flex-1 ml-3 text-base text-gray-700"
            style={{ flex: 1, marginLeft: 12, fontSize: 16, color: '#374151' }}
            placeholder="Search..."
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* Map */}
      <View className="flex-1 mb-20">
        <WebView
          ref={webViewRef}
          source={{ html: generateMapHTML() }}
          className="flex-1"
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={false}
          scrollEnabled={false}
          onError={(error) => console.log('WebView error:', error)}
        />
      </View>

      {/* Bottom Action Buttons */}
      <View className="absolute bottom-0 left-0 right-0 bg-primary-500 flex-row justify-around py-4 px-5 pb-6" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#EF4444', flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 16, paddingHorizontal: 20, paddingBottom: 24 }}>
        <TouchableOpacity 
          className="justify-center items-center"
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={() => Alert.alert('Report', 'Report incident feature')}
        >
          <ExclamationTriangleSolidIcon size={28} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="justify-center items-center"
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={() => navigation.navigate('IncidentAnalysis')}
        >
          <ChartBarSolidIcon size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Floating Action Buttons */}
      <TouchableOpacity 
        className="absolute bottom-32 right-5 w-12 h-12 rounded-full bg-white justify-center items-center"
        style={{ position: 'absolute', bottom: 128, right: 20, width: 48, height: 48, borderRadius: 24, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }}
        onPress={getCurrentLocation}
        disabled={isLocating}
      >
        <MapPinIcon size={20} color="#EF4444" />
      </TouchableOpacity>

      <TouchableOpacity 
        className="absolute bottom-20 right-5 w-12 h-12 rounded-full bg-white justify-center items-center"
        style={{ position: 'absolute', bottom: 80, right: 20, width: 48, height: 48, borderRadius: 24, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }}
        onPress={() => Alert.alert('Alert', 'Emergency alert feature')}
      >
        <ExclamationTriangleIcon size={20} color="#EF4444" />
      </TouchableOpacity>

      {/* Hamburger Menu Modal */}
      <Modal
        visible={isMenuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsMenuVisible(false)}
      >
        <TouchableOpacity 
          className="flex-1 bg-black/50 justify-start items-start"
          activeOpacity={1}
          onPress={() => setIsMenuVisible(false)}
        >
          <View className="bg-white w-70 h-full pt-12.5 shadow-2xl">
            <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-200">
              <Text className="text-lg font-bold text-gray-800">Menu</Text>
              <TouchableOpacity onPress={() => setIsMenuVisible(false)}>
                <XMarkIcon size={24} color="#374151" />
              </TouchableOpacity>
            </View>
            
            <View className="pt-4">
              <TouchableOpacity 
                className="flex-row items-center px-5 py-4"
                onPress={() => handleMenuItemPress('home')}
              >
                <HomeIcon size={20} color="#6B7280" />
                <Text className="text-base text-gray-700 ml-3 font-medium">Home</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                className="flex-row items-center px-5 py-4"
                onPress={() => handleMenuItemPress('profile')}
              >
                <ProfileIcon size={20} color="#6B7280" />
                <Text className="text-base text-gray-700 ml-3 font-medium">Profile</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                className="flex-row items-center px-5 py-4"
                onPress={() => handleMenuItemPress('settings')}
              >
                <Cog6ToothIcon size={20} color="#6B7280" />
                <Text className="text-base text-gray-700 ml-3 font-medium">Settings</Text>
              </TouchableOpacity>
              
              <View className="h-px bg-gray-200 my-2 mx-5" />
              
              <TouchableOpacity 
                className="flex-row items-center px-5 py-4"
                onPress={() => handleMenuItemPress('logout')}
              >
                <ArrowLeftOnRectangleIcon size={20} color="#EF4444" />
                <Text className="text-base text-primary-500 ml-3 font-medium">Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}
