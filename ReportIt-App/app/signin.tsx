"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"


export default function SignIn() {
  const navigation = useNavigation()
  const [email, setEmail] = useState("kelianagirl@gmail.com")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleBack = () => {
    navigation.goBack()
  }

  const handleLogin = () => {
    // Handle login logic here
    console.log("Login pressed")
  }

  const handleSignUp = () => {
    // Handle sign up navigation
    console.log("Sign up pressed")
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-primary px-6 py-4">
        <TouchableOpacity onPress={handleBack} className="flex-row items-center">
          <Text className="text-white text-lg mr-2">←</Text>
          <Text className="text-white text-lg font-medium">Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6">
        {/* Logo and Title */}
        <View className="items-center mt-8 mb-8">
          <ShieldIcon size={48} color="#EF4444" />
          <Text className="text-2xl font-bold text-gray-900 mt-4 mb-2">Login to ReportIt</Text>
          <Text className="text-gray-600 text-center">Enter your credentials to access your account</Text>
        </View>

        {/* Form */}
        <View className="space-y-6">
          {/* Email Input */}
          <View>
            <Text className="text-gray-900 font-medium mb-2">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              className="border border-gray-300 rounded-xl px-4 py-3 text-gray-900"
            />
          </View>

          {/* Password Input */}
          <View>
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-gray-900 font-medium">Password</Text>
              <TouchableOpacity>
                <Text className="text-primary text-sm">Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <View className="relative">
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                className="border border-gray-300 rounded-xl px-4 py-3 pr-12 text-gray-900"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="absolute right-4 top-3">
                <EyeIcon size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Remember Me */}
          <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} className="flex-row items-center">
            <View
              className={`w-5 h-5 rounded border-2 mr-3 items-center justify-center ${
                rememberMe ? "bg-primary border-primary" : "border-gray-300"
              }`}
            >
              {rememberMe && <Text className="text-white text-xs">✓</Text>}
            </View>
            <Text className="text-gray-700">Remember me</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity onPress={handleLogin} className="bg-primary rounded-xl py-4 mt-8" activeOpacity={0.8}>
            <Text className="text-white text-lg font-semibold text-center">Login</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View className="flex-row justify-center items-center mt-6">
            <Text className="text-gray-600">Don't have an account? </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text className="text-primary font-medium">Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
