import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import PinIcon from "./components/PinIcon";
import ShieldIcon from "./components/ShieldIcon";

const logoImg = require("./components/logo.png");

export default function Index() {
	return (
		<View style={styles.screen}>
			<View style={styles.topBar}>
				<Image
					source={logoImg}
					style={styles.brandLogo}
					resizeMode="contain"
					accessibilityLabel="ReportIt logo"
				/>
			</View>
			<View style={styles.content}>
				<Text style={styles.heading}>Welcome to ReportIt</Text>
				<Text style={styles.subheading}>
					A Machine Learning-Driven Mobile Application for Dynamic Theft Risk Assessment Using Crowd-Sourced Reports
				</Text>

				<View style={styles.card}>
					<View style={styles.cardIconWrap}>
						<PinIcon size={24} color="#ef4f4f" />
					</View>
					<Text style={styles.cardTitle}>Real-time Risk Assessment</Text>
					<Text style={styles.cardText}>
						View dynamic theft risk maps based on crowd-sourced reports and machine learning analysis.
					</Text>
				</View>

				<View style={styles.card}>
					<View style={styles.cardIconWrap}>
						<ShieldIcon size={24} color="#ef4f4f" />
					</View>
					<Text style={styles.cardTitle}>Community Protection</Text>
					<Text style={styles.cardText}>
						Contribute to community safety by reporting incidents and helping others stay informed.
					</Text>
				</View>

				<Link href={"/login" as any} style={styles.getStarted} accessibilityLabel="Get started">
					<Text style={styles.getStartedText}>Get Started</Text>
				</Link>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "#ffffff",
	},
	topBar: {
		backgroundColor: "#ef4f4f", // red header
		paddingTop: 36,
		paddingBottom: 18,
		paddingHorizontal: 20,
	},
	brandLogo: {
		width: 220,
		height: 60,
		alignSelf: 'center',
	},

	// main content area
	content: {
		flex: 1,
		paddingHorizontal: 20,
		paddingTop: 28,
		alignItems: "center",
	},
	heading: {
		fontSize: 20,
		fontWeight: "700",
		marginBottom: 8,
		textAlign: "center",
	},
	subheading: {
		fontSize: 12,
		color: "#666",
		textAlign: "center",
		marginBottom: 24,
		paddingHorizontal: 8,
	},

	// cards
	card: {
		width: "100%",
		backgroundColor: "#f2f2f2",
		borderRadius: 12,
		paddingVertical: 22,
		paddingHorizontal: 18,
		alignItems: "center",
		marginVertical: 12,
		// shadow (iOS)
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.06,
		shadowRadius: 8,
		// elevation (Android)
		elevation: 2,
	},
	cardIconWrap: {
		backgroundColor: "#fff0f0",
		padding: 10,
		borderRadius: 24,
		marginBottom: 12,
	},
	cardTitle: {
		fontSize: 16,
		fontWeight: "700",
		marginBottom: 8,
		textAlign: "center",
	},
	cardText: {
		fontSize: 13,
		color: "#6b6b6b",
		textAlign: "center",
		paddingHorizontal: 6,
	},

	// button
	getStarted: {
		marginTop: 18,
		backgroundColor: "#ef4f4f",
		paddingVertical: 12,
		paddingHorizontal: 28,
		borderRadius: 8,
	},
	getStartedText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "700",
		textAlign: "center",
	},
});

 