import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ExclamationTriangleIcon, ChartBarIcon, ChevronDownIcon } from 'react-native-heroicons/outline';

export default function IncidentAnalysisScreen({ navigation }) {
  const [timePeriod, setTimePeriod] = useState('Last 30 days');

  const incidentData = [
    { type: 'Theft', count: 45, height: 200 },
    { type: 'Robbery', count: 15, height: 80 },
    { type: 'Burglary', count: 35, height: 150 }
  ];

  const riskPredictions = [
    { location: 'Bulihan', risk: 'High risk', percentage: 85, color: '#EF4444' },
    { location: 'Barasoain', risk: 'Moderate risk', percentage: 60, color: '#F59E0B' },
    { location: 'Sumapa', risk: 'Low risk', percentage: 25, color: '#22C55E' }
  ];

  const handleBackToMap = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Incident Analysis</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Theft Trend Analysis */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Theft Trend analysis</Text>
          <Text style={styles.sectionSubtitle}>
            View incident patterns and predictions based on ML analysis
          </Text>

          <View style={styles.chartContainer}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Incident Types</Text>
              <TouchableOpacity style={styles.dropdown}>
                <Text style={styles.dropdownText}>{timePeriod}</Text>
                <ChevronDownIcon size={16} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.chart}>
              {incidentData.map((item, index) => (
                <View key={index} style={styles.chartBar}>
                  <View style={[styles.bar, { height: item.height }]} />
                  <Text style={styles.barLabel}>{item.type}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Risk Prediction */}
        <View style={styles.section}>
          <View style={styles.riskHeader}>
            <Text style={styles.sectionTitle}>Risk Prediction</Text>
            <Text style={styles.mlLabel}>ML-based forecast</Text>
          </View>

          <View style={styles.riskContainer}>
            {riskPredictions.map((item, index) => (
              <View key={index} style={styles.riskItem}>
                <View style={styles.riskInfo}>
                  <Text style={styles.locationName}>{item.location}</Text>
                  <Text style={styles.riskLevel}>{item.risk}</Text>
                </View>
                <View style={styles.progressBarContainer}>
                  <View 
                    style={[
                      styles.progressBar, 
                      { 
                        width: `${item.percentage}%`, 
                        backgroundColor: item.color 
                      }
                    ]} 
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={handleBackToMap}>
          <ExclamationTriangleIcon size={24} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.navButton, styles.activeNavButton]}>
          <ChartBarIcon size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#EF4444',
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  chartContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 16,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  dropdownText: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 4,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 220,
  },
  chartBar: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 40,
    backgroundColor: '#EF4444',
    borderRadius: 4,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  riskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  mlLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  riskContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 16,
  },
  riskItem: {
    marginBottom: 20,
  },
  riskInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  riskLevel: {
    fontSize: 14,
    color: '#6B7280',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  bottomNav: {
    backgroundColor: '#EF4444',
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 32,
    justifyContent: 'space-around',
  },
  navButton: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeNavButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});
