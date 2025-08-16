import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View className="bg-brand p-6 rounded-xl">
        <Text className="text-white text-xl font-bold">Hello NativeWind 👋</Text>
      </View>
    </View>
  );
}
