import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MapPinIcon, ShieldCheckIcon } from 'react-native-heroicons/outline';

export default function WelcomeScreen({ navigation }) {
  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  return (
    <View className="flex-1 bg-white">
      <View className="bg-red-400 pt-16 pb-8 px-6">
        <View className="flex-row items-center justify-center">
          <ShieldCheckIcon size={32} color="white" />
          <Text className="text-white text-2xl font-bold ml-3">ReportIt</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-8">
        <Text className="text-2xl font-bold text-gray-900 text-center mb-4">
          Welcome to ReportIt
        </Text>

        <Text className="text-gray-600 text-center mb-12 leading-6">
          A Machine Learning-Driven Mobile Application for Dynamic{'\n'}
          Theft Risk Assessment Using Crowd-Sourced Reports
        </Text>

        <View className="space-y-6">
          <View className="bg-gray-100 rounded-2xl p-6">
            <View className="items-center mb-4">
              <View className="bg-red-100 p-4 rounded-full">
                <MapPinIcon size={32} color="#EF4444" />
              </View>
            </View>
            
            <Text className="text-xl font-bold text-gray-900 text-center mb-3">
              Real-time Risk Assessment
            </Text>
            
            <Text className="text-gray-600 text-center leading-6">
              View dynamic theft risk maps based on{'\n'}
              crowd-sourced reports and machine{'\n'}
              learning analysis.
            </Text>
          </View>

          <View className="bg-gray-100 rounded-2xl p-6">
            <View className="items-center mb-4">
              <View className="bg-red-100 p-4 rounded-full">
                <ShieldCheckIcon size={32} color="#EF4444" />
              </View>
            </View>
            
            <Text className="text-xl font-bold text-gray-900 text-center mb-3">
              Community Protection
            </Text>
            
            <Text className="text-gray-600 text-center leading-6">
              Contribute to community safety by{'\n'}
              reporting incidents and helping others{'\n'}
              stay informed.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View className="px-6 pb-8">
        <TouchableOpacity
          onPress={handleGetStarted}
          className="bg-red-400 rounded-2xl py-4"
        >
          <Text className="text-white text-center text-lg font-semibold">
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}