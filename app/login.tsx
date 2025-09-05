import { Link, useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from "react";
import {
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import EyeIcon from "./components/EyeIcon";
import EyeOffIcon from "./components/EyeOffIcon";
import ShieldIcon from "./components/ShieldIcon";

export default function Login() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [remember, setRemember] = useState(true);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const TOKEN_KEY = 'firebaseIdToken';
	const REFRESH_KEY = 'firebaseRefreshToken';

	useEffect(() => {
		// On mount, check for an existing token and auto-redirect if present.
		(async () => {
			try {
				const token = await SecureStore.getItemAsync(TOKEN_KEY);
				if (token) {
					// token exists -> assume user is logged in locally
					router.replace('/(tabs)' as any);
				}
			} catch (e) {
				// ignore secure store read errors for now
			}
		})();
	}, []);

	const API_BASE = Platform.OS === 'android' ? 'http://10.0.2.2:8001' : 'http://127.0.0.1:8001';

	async function handleLogin() {
		setError(null);
		if (!email || !password) {
			setError('Email and password are required.');
			return;
		}
		setLoading(true);
		try {
			const resp = await fetch(`${API_BASE}/api/login/`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			});
			const data = await resp.json();
			if (!resp.ok) {
				const message = data?.error || data?.detail || JSON.stringify(data);
				setError(String(message));
			} else {
				// success: data contains idToken and other Firebase info
				const idToken = data?.idToken || data?.id_token || data?.token;
				const refreshToken = data?.refreshToken || '';
				try {
					if (remember && idToken) {
						await SecureStore.setItemAsync(TOKEN_KEY, idToken);
						if (refreshToken) await SecureStore.setItemAsync(REFRESH_KEY, refreshToken);
					} else {
						// remove any stored tokens if user didn't opt to remember
						await SecureStore.deleteItemAsync(TOKEN_KEY);
						await SecureStore.deleteItemAsync(REFRESH_KEY);
					}
				} catch (e) {
					// non-fatal: still allow navigation even if SecureStore fails
				}
				// navigate into the app (replace so user can't go back to login)
				router.replace('/(tabs)' as any);
			}
		} catch (e: any) {
			setError(e?.message || 'Network error');
		} finally {
			setLoading(false);
		}
	}

	return (
		<View style={styles.screen}>
			<View style={styles.topBar}>
				<TouchableOpacity onPress={() => router.back()} style={styles.backBtn} accessibilityRole="button">
					<Text style={styles.backText}>← Back</Text>
				</TouchableOpacity>
			</View>
			<ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
				<ShieldIcon size={52} color="#ef4f4f" />
				<Text style={styles.title}>Login to ReportIt</Text>
				<Text style={styles.subtitle}>Enter your credentials to access your account</Text>

				<View style={styles.field}>
					<Text style={styles.label}>Email</Text>
					<TextInput
						value={email}
						onChangeText={setEmail}
						style={styles.input}
						placeholder="you@example.com"
						keyboardType="email-address"
						autoCapitalize="none"
					/>
				</View>

					<View style={styles.field}>
						<View style={styles.fieldHeader}>
							<Text style={styles.label}>Password</Text>
							<Link href={"/forgot-password" as any} style={styles.forgot}>Forgot Password?</Link>
						</View>
					<View style={styles.passwordRow}>
						<TextInput
							value={password}
							onChangeText={setPassword}
							style={[styles.input, { flex: 1, marginRight: 8 }]}
							placeholder=""
							secureTextEntry={!showPassword}
						/>
						<TouchableOpacity onPress={() => setShowPassword((s) => !s)} style={styles.eyeBtn} accessibilityRole="button">
							{showPassword ? <EyeOffIcon size={20} color="#333" /> : <EyeIcon size={20} color="#333" />}
						</TouchableOpacity>
					</View>
				</View>

				<TouchableOpacity style={styles.rememberRow} onPress={() => setRemember((r) => !r)} accessibilityRole="button">
					<View style={[styles.checkbox, remember && styles.checkboxChecked]}>
						{remember && <Text style={styles.check}>✓</Text>}
					</View>
					<Text style={styles.rememberText}>Remember me</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.loginBtn} onPress={handleLogin} accessibilityRole="button" disabled={loading}>
					<Text style={styles.loginBtnText}>{loading ? 'Logging in...' : 'Login'}</Text>
				</TouchableOpacity>

				{error ? <Text style={{ color: '#d9534f', marginTop: 10 }}>{error}</Text> : null}

					<View style={styles.signUpRow}>
						<Text style={styles.noAccount}>Don't have an account? </Text>
						<Link href={"/signup" as any} style={styles.signUpLink}>Sign up</Link>
					</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: { flex: 1, backgroundColor: '#fff' },
	topBar: { backgroundColor: '#ef4f4f', paddingTop: 36, paddingBottom: 18, paddingHorizontal: 16 },
	backBtn: { alignSelf: 'flex-start' },
	backText: { color: '#fff', fontWeight: '600' },
	content: { alignItems: 'center', paddingHorizontal: 20, paddingTop: 28, paddingBottom: 40 },
	title: { fontSize: 20, fontWeight: '700', marginTop: 18, marginBottom: 6 },
	subtitle: { fontSize: 13, color: '#666', textAlign: 'center', marginBottom: 18, paddingHorizontal: 6 },
	field: { width: '100%', marginTop: 8 },
	fieldHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
	label: { fontSize: 13, marginBottom: 6, color: '#333' },
	input: { backgroundColor: '#fff', borderColor: '#e6e6e6', borderWidth: 1, borderRadius: 8, paddingVertical: 12, paddingHorizontal: 12, fontSize: 14 },
	forgot: { color: '#ef4f4f', fontSize: 12 },
	passwordRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
	eyeBtn: { padding: 8, justifyContent: 'center', alignItems: 'center' },
	eye: { fontSize: 18 },
	rememberRow: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginTop: 12 },
	checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: 1, borderColor: '#333', marginRight: 8, justifyContent: 'center', alignItems: 'center' },
	checkboxChecked: { backgroundColor: '#ef4f4f', borderColor: '#ef4f4f' },
	check: { color: '#fff', fontWeight: '700' },
	rememberText: { color: '#333' },
	loginBtn: { marginTop: 18, backgroundColor: '#ef4f4f', paddingVertical: 12, paddingHorizontal: 28, borderRadius: 8, width: '100%' , alignItems: 'center'},
	loginBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
	signUpRow: { flexDirection: 'row', marginTop: 16 },
	noAccount: { color: '#666' },
	signUpLink: { color: '#ef4f4f' },
});
