import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MapPinIcon, ShieldCheckIcon } from 'react-native-heroicons/outline';

export default function WelcomeScreen({ navigation }) {
  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  return (
    <View className="flex-1 bg-white" style={{ flex: 1, backgroundColor: 'white' }}>
      <View className="bg-primary-500 pt-12 pb-6 px-6" style={{ backgroundColor: '#EF4444', paddingTop: 48, paddingBottom: 24, paddingHorizontal: 24 }}>
        <View className="flex-row items-center justify-center" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <View className="bg-white/20 p-2 rounded-full mr-3" style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 20, marginRight: 12 }}>
            <ShieldCheckIcon size={28} color="white" />
          </View>
          <Text className="text-white text-3xl font-bold" style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}>ReportIt</Text>
        </View>
        <Text className="text-white/90 text-center mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginTop: 8, fontSize: 14 }}>Community Safety Platform</Text>
      </View>

      <ScrollView className="flex-1" style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 40, paddingBottom: 40 }}>
        <View className="items-center mb-8" style={{ alignItems: 'center', marginBottom: 32 }}>
          <Text className="text-3xl font-bold text-gray-900 text-center mb-3" style={{ fontSize: 28, fontWeight: 'bold', color: '#111827', textAlign: 'center', marginBottom: 12 }}>
            Welcome to ReportIt
          </Text>
          <View className="w-16 h-1 bg-primary-500 rounded-full mb-6" style={{ width: 64, height: 4, backgroundColor: '#EF4444', borderRadius: 20, marginBottom: 24 }}></View>
          
          <Text className="text-base text-gray-600 text-center leading-6 px-4" style={{ fontSize: 16, color: '#6B7280', textAlign: 'center', lineHeight: 24, paddingHorizontal: 16 }}>
            A Machine Learning-Driven Mobile Application for Dynamic{'\n'}
            Theft Risk Assessment Using Crowd-Sourced Reports
          </Text>
        </View>

        <View className="mb-12" style={{ marginBottom: 48 }}>
          <View className="bg-white rounded-2xl p-6 mb-6 items-center shadow-sm border border-gray-100" style={{ backgroundColor: 'white', borderRadius: 16, padding: 24, marginBottom: 24, alignItems: 'center', borderWidth: 1, borderColor: '#F3F4F6' }}>
            <View className="bg-red-100 w-16 h-16 rounded-2xl justify-center items-center mb-5" style={{ backgroundColor: '#FEE2E2', width: 64, height: 64, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
              <MapPinIcon size={28} color="#EF4444" />
            </View>
            
            <Text className="text-xl font-bold text-gray-900 text-center mb-3" style={{ fontSize: 20, fontWeight: 'bold', color: '#111827', textAlign: 'center', marginBottom: 12 }}>
              Real-time Risk Assessment
            </Text>
            
            <Text className="text-sm text-gray-600 text-center leading-6" style={{ fontSize: 14, color: '#6B7280', textAlign: 'center', lineHeight: 20 }}>
              View dynamic theft risk maps based on crowd-sourced reports and machine learning analysis.
            </Text>
          </View>

          <View className="bg-white rounded-2xl p-6 items-center shadow-sm border border-gray-100" style={{ backgroundColor: 'white', borderRadius: 16, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: '#F3F4F6' }}>
            <View className="bg-red-100 w-16 h-16 rounded-2xl justify-center items-center mb-5" style={{ backgroundColor: '#FEE2E2', width: 64, height: 64, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
              <ShieldCheckIcon size={28} color="#EF4444" />
            </View>
            
            <Text className="text-xl font-bold text-gray-900 text-center mb-3" style={{ fontSize: 20, fontWeight: 'bold', color: '#111827', textAlign: 'center', marginBottom: 12 }}>
              Community Protection
            </Text>
            
            <Text className="text-sm text-gray-600 text-center leading-6" style={{ fontSize: 14, color: '#6B7280', textAlign: 'center', lineHeight: 20 }}>
              Contribute to community safety by reporting incidents and helping others stay informed.
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          className="bg-primary-500 rounded-2xl py-4 px-8 items-center" 
          style={{ backgroundColor: '#EF4444', borderRadius: 16, paddingVertical: 16, paddingHorizontal: 32, alignItems: 'center' }}
          onPress={handleGetStarted}
        >
          <Text className="text-white text-lg font-bold" style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Get Started</Text>
        </TouchableOpacity>
        
        <View className="mt-6 flex-row justify-center items-center" style={{ marginTop: 24, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View className="flex-1 h-px bg-gray-200" style={{ flex: 1, height: 1, backgroundColor: '#E5E7EB' }}></View>
          <Text className="mx-4 text-gray-400 text-xs" style={{ marginHorizontal: 16, color: '#9CA3AF', fontSize: 12 }}>SECURE & RELIABLE</Text>
          <View className="flex-1 h-px bg-gray-200" style={{ flex: 1, height: 1, backgroundColor: '#E5E7EB' }}></View>
        </View>
      </ScrollView>
    </View>
  );
}
