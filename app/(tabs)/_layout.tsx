import { Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
	// Tabs layout to host tabbed routes. Keep headers off for a simple layout.
	return (
		<Tabs screenOptions={{ headerShown: false }}>
			{/* Child routes like index will be rendered inside this tabs group */}
		</Tabs>
	);
}
