import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { MapPinIcon, ShieldCheckIcon } from 'react-native-heroicons/outline';

export default function WelcomeScreen({ navigation }) {
  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <ShieldCheckIcon size={32} color="white" />
          <Text style={styles.headerTitle}>ReportIt</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.welcomeTitle}>
          Welcome to ReportIt
        </Text>

        <Text style={styles.welcomeSubtitle}>
          A Machine Learning-Driven Mobile Application for Dynamic{'\n'}
          Theft Risk Assessment Using Crowd-Sourced Reports
        </Text>

        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <View style={styles.cardIconContainer}>
              <View style={styles.iconBackground}>
                <MapPinIcon size={32} color="#EF4444" />
              </View>
            </View>
            
            <Text style={styles.cardTitle}>
              Real-time Risk Assessment
            </Text>
            
            <Text style={styles.cardDescription}>
              View dynamic theft risk maps based on{'\n'}
              crowd-sourced reports and machine{'\n'}
              learning analysis.
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardIconContainer}>
              <View style={styles.iconBackground}>
                <ShieldCheckIcon size={32} color="#EF4444" />
              </View>
            </View>
            
            <Text style={styles.cardTitle}>
              Community Protection
            </Text>
            
            <Text style={styles.cardDescription}>
              Contribute to community safety by{'\n'}
              reporting incidents and helping others{'\n'}
              stay informed.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleGetStarted}
          style={styles.getStartedButton}
        >
          <Text style={styles.buttonText}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#EF4444',
    paddingTop: 64,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollContent: {
    paddingTop: 32,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 16,
  },
  welcomeSubtitle: {
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 48,
  },
  cardsContainer: {
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  cardIconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  iconBackground: {
    backgroundColor: '#FEE2E2',
    padding: 16,
    borderRadius: 50,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 12,
  },
  cardDescription: {
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  getStartedButton: {
    backgroundColor: '#EF4444',
    borderRadius: 16,
    paddingVertical: 16,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
});