import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function GateScreen() {
  const [guestName, setGuestName] = useState('');
  const [qrData, setQrData] = useState(null);
  const [entryLogs, setEntryLogs] = useState([
    { id: 1, name: 'John Smith', time: '2024-09-15 14:30', type: 'Guest' },
    { id: 2, name: 'Jane Doe', time: '2024-09-15 12:15', type: 'Delivery' },
    { id: 3, name: 'Mike Johnson', time: '2024-09-14 18:45', type: 'Guest' },
    { id: 4, name: 'Sarah Wilson', time: '2024-09-14 16:20', type: 'Visitor' },
  ]);

  const generateGuestQR = () => {
    if (!guestName.trim()) {
      Alert.alert('Error', 'Please enter guest name');
      return;
    }

    const qrCode = {
      guestName: guestName.trim(),
      unit: 'Unit 205',
      validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      code: Math.random().toString(36).substring(2, 15),
    };

    setQrData(JSON.stringify(qrCode));
    
    // Add to entry logs (simulate future entry)
    const newLog = {
      id: entryLogs.length + 1,
      name: guestName.trim(),
      time: new Date().toLocaleString(),
      type: 'Guest QR Generated',
    };
    
    setEntryLogs([newLog, ...entryLogs]);
    setGuestName('');
    
    Alert.alert('Success', 'Guest QR code generated successfully!');
  };

  const simulateEntry = (logEntry) => {
    Alert.alert(
      'Entry Details',
      `Name: ${logEntry.name}\nTime: ${logEntry.time}\nType: ${logEntry.type}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Smart Gate & Access Control</Text>

      {/* QR Code Generation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Generate Guest QR Code</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Enter guest name"
          value={guestName}
          onChangeText={setGuestName}
          autoCapitalize="words"
        />
        
        <TouchableOpacity style={styles.generateButton} onPress={generateGuestQR}>
          <Text style={styles.generateButtonText}>Generate QR Code</Text>
        </TouchableOpacity>

        {qrData && (
          <View style={styles.qrContainer}>
            <Text style={styles.qrTitle}>Guest Access QR Code</Text>
            <View style={styles.qrCodeWrapper}>
              <QRCode
                value={qrData}
                size={200}
                color="#d8ad28"
                backgroundColor="white"
              />
            </View>
            <Text style={styles.qrNote}>
              Show this QR code to your guest for entry access
            </Text>
            <Text style={styles.qrExpiry}>
              Valid for 24 hours
            </Text>
          </View>
        )}
      </View>

      {/* Access Control */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionCard}>
            <Image source={require('../icons/unlocked.png')} style={styles.actionIcon} />
            <Text style={styles.actionText}>Open Gate</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionCard}>
            <Image source={require('../icons/phone-call.png')} style={styles.actionIcon} />
            <Text style={styles.actionText}>Call Security</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionCard}>
            <Image source={require('../icons/verify.png')} style={styles.actionIcon} />
            <Text style={styles.actionText}>Register Vehicle</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionCard}>
            <Image source={require('../icons/time.png')} style={styles.actionIcon} />
            <Text style={styles.actionText}>Schedule Access</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Entry Logs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Entry Logs</Text>
        
        {entryLogs.map((log) => (
          <TouchableOpacity
            key={log.id}
            style={styles.logEntry}
            onPress={() => simulateEntry(log)}
          >
            <View style={styles.logInfo}>
              <Text style={styles.logName}>{log.name}</Text>
              <Text style={styles.logTime}>{log.time}</Text>
            </View>
            <View style={[styles.logType, getTypeStyle(log.type)]}>
              <Text style={styles.logTypeText}>{log.type}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const getTypeStyle = (type) => {
  switch (type) {
    case 'Guest':
      return { backgroundColor: '#10b981' };
    case 'Delivery':
      return { backgroundColor: '#f59e0b' };
    case 'Visitor':
      return { backgroundColor: '#8b5cf6' };
    case 'Guest QR Generated':
      return { backgroundColor: '#d8ad28' };
    default:
      return { backgroundColor: '#6b7280' };
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    padding: 20,
    paddingBottom: 10,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 15,
  },
  generateButton: {
    backgroundColor: '#d8ad28',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  generateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  qrContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  qrTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  qrCodeWrapper: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  qrNote: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 15,
  },
  qrExpiry: {
    fontSize: 12,
    color: '#f59e0b',
    marginTop: 5,
    fontWeight: '500',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '48%',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  actionIcon: {
    width: 30,
    height: 30,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  logEntry: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  logInfo: {
    flex: 1,
  },
  logName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  logTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  logType: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  logTypeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});
