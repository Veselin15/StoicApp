import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, ActivityIndicator, SafeAreaView, ScrollView,
  TouchableOpacity, Modal, TextInput, Alert
} from 'react-native';
import { useStreak } from '@/hooks/useStreak';

interface DailyData {
  stoic_quote: string;
  author: string;
  daily_challenge: string;
}

export default function HomeScreen() {
  const [data, setData] = useState<DailyData | null>(null);
  const [loading, setLoading] = useState(true);
  const streak = useStreak();

  // Modal State
  const [modalVisible, setModalVisible] = useState(false);
  const [journalText, setJournalText] = useState('');

  // ⚠️ YOUR IP HERE
  const BASE_URL = 'http://192.168.1.105:8000/api';

  useEffect(() => {
    fetch(`${BASE_URL}/today/`)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const saveJournal = async () => {
    try {
      const response = await fetch(`${BASE_URL}/journal/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: journalText,
        }),
      });

      if (response.ok) {
        Alert.alert("Success", "Reflection saved to the eternal record.");
        setJournalText('');
        setModalVisible(false);
      } else {
        Alert.alert("Error", "Failed to save reflection.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Could not connect to server.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.card}>
          <View style={styles.streakBadge}>
            <Text style={styles.streakText}>🔥 {streak} DAY{streak !== 1 ? 'S' : ''}</Text>
          </View>

          <Text style={styles.header}>DAILY STOIC</Text>
          <View style={styles.divider} />
          <Text style={styles.quote}>&quot;{data?.stoic_quote}&quot;</Text>
          <Text style={styles.author}>— {data?.author}</Text>

          <View style={styles.challengeBox}>
            <Text style={styles.challengeLabel}>TODAY&apos;S MISSION</Text>
            <Text style={styles.challengeText}>{data?.daily_challenge}</Text>
          </View>

          {/* NEW: REFLECT BUTTON */}
          <TouchableOpacity
            style={styles.reflectButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.reflectButtonText}>EVENING REFLECTION</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* JOURNAL MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>EVENING REFLECTION</Text>
            <Text style={styles.modalSubtitle}>Did you act with virtue today?</Text>

            <TextInput
              style={styles.input}
              multiline
              numberOfLines={4}
              placeholder="Write your thoughts..."
              value={journalText}
              onChangeText={setJournalText}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>CANCEL</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={saveJournal}
              >
                <Text style={[styles.buttonText, {color: '#FFF'}]}>SAVE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ... Keep existing styles ...
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
    position: 'relative',
  },
  streakBadge: {
    position: 'absolute', top: 10, right: 10, backgroundColor: '#000',
    paddingVertical: 4, paddingHorizontal: 8, borderRadius: 4,
  },
  streakText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },
  header: {
    fontSize: 28, fontWeight: '900', textAlign: 'center', letterSpacing: 4,
    marginBottom: 10, marginTop: 10, color: '#000', textTransform: 'uppercase',
  },
  divider: { height: 3, backgroundColor: '#000', marginVertical: 20 },
  quote: {
    fontSize: 22, fontStyle: 'italic', textAlign: 'center', marginBottom: 25,
    lineHeight: 34, color: '#222', fontWeight: '500',
  },
  author: {
    fontSize: 16, fontWeight: 'bold', textAlign: 'right', marginBottom: 30,
    textTransform: 'uppercase', letterSpacing: 1,
  },
  challengeBox: { backgroundColor: '#000', padding: 20, marginTop: 10, marginBottom: 20 },
  challengeLabel: {
    color: '#FFF', fontSize: 12, fontWeight: '900', marginBottom: 8,
    textAlign: 'center', letterSpacing: 2, textTransform: 'uppercase',
  },
  challengeText: {
    color: '#FFF', fontSize: 18, textAlign: 'center', fontWeight: '600', lineHeight: 24,
  },

  // NEW BUTTON STYLES
  reflectButton: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#000',
    padding: 15,
    marginTop: 10,
  },
  reflectButtonText: {
    textAlign: 'center',
    fontWeight: '900',
    letterSpacing: 2,
  },

  // MODAL STYLES
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#FFF',
    padding: 20,
    borderWidth: 3,
    borderColor: '#000',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  modalTitle: {
    fontSize: 20, fontWeight: '900', textAlign: 'center', marginBottom: 5,
  },
  modalSubtitle: {
    fontSize: 14, textAlign: 'center', marginBottom: 20, fontStyle: 'italic',
  },
  input: {
    borderWidth: 2, borderColor: '#000', padding: 10, height: 100,
    marginBottom: 20, textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row', justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1, padding: 15, borderWidth: 2, borderColor: '#000',
    marginHorizontal: 5,
  },
  cancelButton: { backgroundColor: '#FFF' },
  saveButton: { backgroundColor: '#000' },
  buttonText: {
    textAlign: 'center', fontWeight: 'bold', letterSpacing: 1,
  }
});