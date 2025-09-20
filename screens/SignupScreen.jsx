import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { EyeIcon, EyeSlashIcon, ArrowLeftIcon, ShieldCheckIcon } from 'react-native-heroicons/outline';
import authService from '../services/authService';

export default function SignupScreen({ navigation }) {
  const [firstName, setFirstName] = useState('Kelian');
  const [lastName, setLastName] = useState('Aguilar');
  const [username, setUsername] = useState('Kelian1');
  const [email, setEmail] = useState('kelianagir1@gmail.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSignup = async () => {
    if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!agreeToTerms) {
      Alert.alert('Error', 'Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    try {
      const result = await authService.registerUser(email, password, firstName, lastName, username, 'User', '');
      if (result.success) {
        Alert.alert('Success', 'Account created successfully!', [
          { text: 'OK', onPress: () => navigation.navigate('Map') }
        ]);
      } else {
        Alert.alert('Error', result.error || 'Registration failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="bg-primary-500 pt-12 pb-6 px-4">
        <TouchableOpacity 
          className="flex-row items-center mb-8" 
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftIcon size={24} color="white" />
          <Text className="text-white text-lg font-medium ml-2">Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6 pt-8">
        <View className="items-center mb-6">
          <View className="bg-red-100 p-4 rounded-full">
            <ShieldCheckIcon size={48} color="#EF4444" />
          </View>
        </View>

        <Text className="text-2xl font-bold text-gray-900 text-center mb-2">
          Create Account
        </Text>
        <Text className="text-gray-500 text-center mb-8">
          Join ReportIt to help keep your community safe
        </Text>

        <View className="mb-4">
          <Text className="text-gray-700 text-base font-medium mb-2">First Name</Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3.5 text-base bg-white text-gray-700"
            placeholder="Kelian"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 text-base font-medium mb-2">Last Name</Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3.5 text-base bg-white text-gray-700"
            placeholder="Aguilar"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 text-base font-medium mb-2">Username</Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3.5 text-base bg-white text-gray-700"
            placeholder="Kelian1"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 text-base font-medium mb-2">Email</Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3.5 text-base bg-white text-gray-700"
            placeholder="kelianagir1@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 text-base font-medium mb-2">Password</Text>
          <View className="relative">
            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-3.5 pr-12 text-base bg-white text-gray-700"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3.5"
            >
              {showPassword ? (
                <EyeSlashIcon size={22} color="#6B7280" />
              ) : (
                <EyeIcon size={22} color="#6B7280" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-gray-700 text-base font-medium mb-2">Confirm Password</Text>
          <View className="relative">
            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-3.5 pr-12 text-base bg-white text-gray-700"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-3.5"
            >
              {showConfirmPassword ? (
                <EyeSlashIcon size={22} color="#6B7280" />
              ) : (
                <EyeIcon size={22} color="#6B7280" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          className="flex-row items-start mb-6"
          onPress={() => setAgreeToTerms(!agreeToTerms)}
        >
          <View className={`w-5 h-5 rounded border-2 border-gray-400 mr-3 mt-1 items-center justify-center ${agreeToTerms ? 'bg-primary-500 border-primary-500' : 'bg-white'}`}>
            {agreeToTerms && <Text className="text-white text-xs">✓</Text>}
          </View>
          <Text className="text-gray-600 flex-1">
            I Agree to the{' '}
            <Text className="text-primary-500 font-medium">Terms of Service</Text>
            {' '}and{' '}
            <Text className="text-primary-500 font-medium">Privacy Policy</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-primary-500 rounded-xl py-4 mb-6"
          onPress={handleSignup}
        >
          <Text className="text-white text-center text-lg font-semibold">Create Account</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mb-8">
          <Text className="text-gray-500">Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-primary-500 font-medium">Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
