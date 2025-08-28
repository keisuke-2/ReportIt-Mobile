import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import ShieldIcon from "../images/ShieldIcon"

// Fallback simple emoji icons to avoid svg dependency/type issues in this environment.
function LocationIcon({ size = 24 }: { size?: number }) {
  return <Text style={{ fontSize: size }}>📍</Text>
}


export default function Index() {
  const navigation = useNavigation()

  const handleGetStarted = () => {
    navigation.navigate("SignIn" as never)
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-primary px-6 py-8 rounded-b-3xl">
        <View className="flex-row items-center">
          <ShieldIcon size={32} color="white" />
          <Text className="text-white text-2xl font-bold ml-3">ReportIt</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-6">
        {/* Welcome Section */}
        <View className="items-center mt-8 mb-8">
          <Text className="text-2xl font-bold text-gray-900 mb-4">Welcome to ReportIt</Text>
          <Text className="text-gray-600 text-center leading-6">
            A Machine Learning-Driven Mobile Application for Dynamic Theft Risk Assessment Using Crowd-Sourced Reports
          </Text>
        </View>

        {/* Feature Cards */}
        <View className="space-y-6">
          {/* Real-time Risk Assessment Card */}
          <View className="bg-gray-100 rounded-2xl p-6 items-center">
            <View className="bg-white rounded-full p-4 mb-4">
              <LocationIcon size={32} />
            </View>
            <Text className="text-xl font-bold text-gray-900 mb-3">Real-time Risk Assessment</Text>
            <Text className="text-gray-600 text-center leading-6">
              View dynamic theft risk maps based on crowd-sourced reports and machine learning analysis.
            </Text>
          </View>

          {/* Community Protection Card */}
          <View className="bg-gray-100 rounded-2xl p-6 items-center">
            <View className="bg-white rounded-full p-4 mb-4">
              <ShieldIcon size={32} color="#EF4444" />
            </View>
            <Text className="text-xl font-bold text-gray-900 mb-3">Community Protection</Text>
            <Text className="text-gray-600 text-center leading-6">
              Contribute to community safety by reporting incidents and helping others stay informed.
            </Text>
          </View>
        </View>

        {/* Get Started Button */}
        <View className="mt-12 mb-8">
          <TouchableOpacity onPress={handleGetStarted} className="bg-primary rounded-xl py-4 px-8" activeOpacity={0.8}>
            <Text className="text-white text-lg font-semibold text-center">Get Started</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
