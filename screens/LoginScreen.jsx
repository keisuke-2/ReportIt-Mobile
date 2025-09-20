import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { EyeIcon, EyeSlashIcon, ArrowLeftIcon, ShieldCheckIcon } from 'react-native-heroicons/outline';
import authService from '../services/authService';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('kelianagir1@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    try {
      const result = await authService.loginUser(email, password);
      if (result.success) {
        navigation.navigate('Map');
      } else {
        Alert.alert('Error', result.error || 'Login failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-primary-500 pt-12 pb-6 px-4">
        <TouchableOpacity 
          className="flex-row items-center mb-8" 
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftIcon size={24} color="white" />
          <Text className="text-white text-lg font-medium ml-2">Back</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View className="flex-1 px-6 pt-12">
        {/* Icon */}
        <View className="items-center mb-8">
          <View className="bg-red-100 p-4 rounded-full">
            <ShieldCheckIcon size={48} color="#EF4444" />
          </View>
        </View>

        {/* Title */}
        <Text className="text-2xl font-bold text-gray-900 text-center mb-2">
          Login to ReportIt
        </Text>
        <Text className="text-gray-500 text-center mb-8">
          Enter your credentials to access your account
        </Text>

        {/* Email Input */}
        <View className="mb-5">
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

        {/* Password Input */}
        <View className="mb-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-700 text-base font-medium">Password</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text className="text-primary-500 text-sm font-medium">Forgot Password?</Text>
            </TouchableOpacity>
          </View>
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

        {/* Remember Me */}
        <TouchableOpacity 
          className="flex-row items-center mb-8"
          onPress={() => setRememberMe(!rememberMe)}
        >
          <View className={`w-5 h-5 rounded border-2 border-gray-400 mr-3 items-center justify-center ${rememberMe ? 'bg-primary-500 border-primary-500' : 'bg-white'}`}>
            {rememberMe && <Text className="text-white text-xs">✓</Text>}
          </View>
          <Text className="text-gray-600">Remember me</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity 
          className="bg-primary-500 rounded-xl py-4 mb-6"
          onPress={handleLogin}
        >
          <Text className="text-white text-center text-lg font-semibold">Login</Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View className="flex-row justify-center">
          <Text className="text-gray-500">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text className="text-primary-500 font-medium">Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}