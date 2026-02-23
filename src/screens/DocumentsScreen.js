import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

export default function DocumentsScreen() {
  const [profile] = useState({
    name: 'Brito',
    email: 'brito@example.com',
    phone: '+1 (555) 123-4567',
    unit: 'Unit 205',
  });

  const [documents, setDocuments] = useState([
    { id: 1, name: 'Lease Agreement.pdf', status: 'Approved', date: '2024-01-15' },
    { id: 2, name: 'ID Document.jpg', status: 'Pending', date: '2024-02-01' },
  ]);

  const handleUploadDocument = () => {
    Alert.alert(
      'Upload Document',
      'Select document type',
      [
        { text: 'Camera', onPress: () => simulateUpload('camera') },
        { text: 'Gallery', onPress: () => simulateUpload('gallery') },
        { text: 'Files', onPress: () => simulateUpload('files') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const simulateUpload = (source) => {
    const newDoc = {
      id: documents.length + 1,
      name: `Document_${Date.now()}.${source === 'camera' ? 'jpg' : 'pdf'}`,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
    };
    setDocuments([...documents, newDoc]);
    Alert.alert('Success', 'Document uploaded successfully!');
  };

  const getStatusColor = (status) => {
    return status === 'Approved' ? '#10b981' : '#f59e0b';
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Information</Text>
        <View style={styles.profileCard}>
          <View style={styles.profileRow}>
            <Text style={styles.profileLabel}>Name:</Text>
            <Text style={styles.profileValue}>{profile.name}</Text>
          </View>
          <View style={styles.profileRow}>
            <Text style={styles.profileLabel}>Email:</Text>
            <Text style={styles.profileValue}>{profile.email}</Text>
          </View>
          <View style={styles.profileRow}>
            <Text style={styles.profileLabel}>Phone:</Text>
            <Text style={styles.profileValue}>{profile.phone}</Text>
          </View>
          <View style={styles.profileRow}>
            <Text style={styles.profileLabel}>Unit:</Text>
            <Text style={styles.profileValue}>{profile.unit}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Documents</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={handleUploadDocument}>
            <Text style={styles.uploadButtonText}>+ Upload</Text>
          </TouchableOpacity>
        </View>

        {documents.map((doc) => (
          <View key={doc.id} style={styles.documentCard}>
            <View style={styles.documentInfo}>
              <Text style={styles.documentName}>{doc.name}</Text>
              <Text style={styles.documentDate}>Uploaded: {doc.date}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(doc.status) }]}>
              <Text style={styles.statusText}>{doc.status}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  profileLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  profileValue: {
    fontSize: 16,
    color: '#333',
  },
  uploadButton: {
    backgroundColor: '#d8ad28',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  documentCard: {
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
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  documentDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});
