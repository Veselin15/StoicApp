import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, SafeAreaView, ScrollView } from 'react-native';

// Define the shape of our data
interface DailyData {
  stoic_quote: string;
  author: string;
  daily_challenge: string;
}

export default function HomeScreen() {
  const [data, setData] = useState<DailyData | null>(null);
  const [loading, setLoading] = useState(true);

  // Keep your IP address here
  const API_URL = 'http://192.168.1.105:8000/api/today/';

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={{marginTop: 10}}>Loading Wisdom...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.card}>
          <Text style={styles.header}>DAILY STOIC</Text>

          <View style={styles.divider} />

          {/* FIX 1: Use &quot; instead of " */}
          <Text style={styles.quote}>
            &quot;{data?.stoic_quote || "No content available."}&quot;
          </Text>

          <Text style={styles.author}>
            — {data?.author || "Unknown"}
          </Text>

          <View style={styles.challengeBox}>
            {/* FIX 2: Use &apos; instead of ' */}
            <Text style={styles.challengeLabel}>TODAY&apos;S MISSION</Text>
            <Text style={styles.challengeText}>
              {data?.daily_challenge || "Rest today."}
            </Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EAEAEA' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderWidth: 3,
    borderColor: '#000',
    shadowColor: "#000",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 4,
    marginBottom: 10,
    color: '#000',
    textTransform: 'uppercase',
  },
  divider: { height: 3, backgroundColor: '#000', marginVertical: 20 },
  quote: {
    fontSize: 22,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 34,
    color: '#222',
    fontWeight: '500',
  },
  author: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 30,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  challengeBox: { backgroundColor: '#000', padding: 20, marginTop: 10 },
  challengeLabel: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  challengeText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 24,
  },
});