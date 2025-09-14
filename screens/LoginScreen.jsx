import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { EyeIcon, EyeSlashIcon } from 'react-native-heroicons/outline';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    Alert.alert('Login', 'Login functionality to be implemented');
  };

  return (
    <View className="flex-1 bg-white">
      <View className="bg-red-400 pt-16 pb-8 px-6">
        <Text className="text-white text-3xl font-bold text-center">
          Welcome Back
        </Text>
        <Text className="text-white text-center mt-2 opacity-90">
          Sign in to your account
        </Text>
      </View>

      <View className="flex-1 px-6 pt-8">
        <View className="mb-6">
          <Text className="text-gray-700 text-base font-medium mb-2">
            Email
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 text-base"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 text-base font-medium mb-2">
            Password
          </Text>
          <View className="relative">
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 text-base pr-12"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
            >
              {showPassword ? (
                <EyeSlashIcon size={24} color="#6B7280" />
              ) : (
                <EyeIcon size={24} color="#6B7280" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row justify-end mb-8">
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text className="text-red-400 font-medium">Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          className="bg-red-400 rounded-lg py-4 mb-6"
        >
          <Text className="text-white text-center text-lg font-semibold">
            Sign In
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center">
          <Text className="text-gray-600">Don't have an account? </Text>
          <TouchableOpacity>
            <Text className="text-red-400 font-medium">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}