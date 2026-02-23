import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';

export default function MaintenanceScreen() {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      title: 'AC not cooling properly',
      description: 'The air conditioning unit in the bedroom is not cooling effectively.',
      status: 'Open',
      date: '2024-09-15',
      priority: 'High',
    },
    {
      id: 2,
      title: 'Leaky faucet in kitchen',
      description: 'Kitchen faucet has been dripping for the past few days.',
      status: 'In Progress',
      date: '2024-09-12',
      priority: 'Medium',
    },
    {
      id: 3,
      title: 'Broken light fixture',
      description: 'Light fixture in the hallway needs replacement.',
      status: 'Closed',
      date: '2024-09-08',
      priority: 'Low',
    },
  ]);

  const [vendors] = useState([
    {
      id: 1,
      name: 'QuickFix HVAC',
      category: 'HVAC',
      rating: 4.8,
      phone: '+1 (555) 123-4567',
      description: 'Professional air conditioning and heating services.',
    },
    {
      id: 2,
      name: 'Premier Plumbing',
      category: 'Plumbing',
      rating: 4.9,
      phone: '+1 (555) 987-6543',
      description: 'Expert plumbing repairs and installations.',
    },
    {
      id: 3,
      name: 'Bright Lights Electric',
      category: 'Electrical',
      rating: 4.7,
      phone: '+1 (555) 456-7890',
      description: 'Licensed electricians for all electrical needs.',
    },
  ]);

  const [activeTab, setActiveTab] = useState('tickets');
  const [modalVisible, setModalVisible] = useState(false);
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    priority: 'Medium',
  });

  const createTicket = () => {
    if (!newTicket.title.trim() || !newTicket.description.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const ticket = {
      id: tickets.length + 1,
      title: newTicket.title,
      description: newTicket.description,
      status: 'Open',
      date: new Date().toISOString().split('T')[0],
      priority: newTicket.priority,
    };

    setTickets([ticket, ...tickets]);
    setNewTicket({ title: '', description: '', priority: 'Medium' });
    setModalVisible(false);
    Alert.alert('Success', 'Maintenance ticket created successfully!');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return '#ef4444';
      case 'In Progress': return '#f59e0b';
      case 'Closed': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const contactVendor = (vendor) => {
    Alert.alert(
      'Contact Vendor',
      `Call ${vendor.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call',
          onPress: () => Alert.alert('Calling', `Dialing ${vendor.phone}...`),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Maintenance & Service</Text>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'tickets' && styles.activeTab]}
          onPress={() => setActiveTab('tickets')}
        >
          <Text style={[styles.tabText, activeTab === 'tickets' && styles.activeTabText]}>
            My Tickets
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'vendors' && styles.activeTab]}
          onPress={() => setActiveTab('vendors')}
        >
          <Text style={[styles.tabText, activeTab === 'vendors' && styles.activeTabText]}>
            Vendors
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'tickets' ? (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Maintenance Tickets</Text>
              <TouchableOpacity
                style={styles.createButton}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.createButtonText}>+ New</Text>
              </TouchableOpacity>
            </View>

            {tickets.map((ticket) => (
              <View key={ticket.id} style={styles.ticketCard}>
                <View style={styles.ticketHeader}>
                  <Text style={styles.ticketTitle}>{ticket.title}</Text>
                  <View style={styles.ticketBadges}>
                    <View style={[styles.badge, { backgroundColor: getPriorityColor(ticket.priority) }]}>
                      <Text style={styles.badgeText}>{ticket.priority}</Text>
                    </View>
                    <View style={[styles.badge, { backgroundColor: getStatusColor(ticket.status) }]}>
                      <Text style={styles.badgeText}>{ticket.status}</Text>
                    </View>
                  </View>
                </View>
                
                <Text style={styles.ticketDescription}>{ticket.description}</Text>
                
                <View style={styles.ticketFooter}>
                  <Text style={styles.ticketDate}>Created: {ticket.date}</Text>
                  <TouchableOpacity style={styles.ticketAction}>
                    <Text style={styles.ticketActionText}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Service Providers</Text>
            
            {vendors.map((vendor) => (
              <View key={vendor.id} style={styles.vendorCard}>
                <View style={styles.vendorHeader}>
                  <View style={styles.vendorInfo}>
                    <Text style={styles.vendorName}>{vendor.name}</Text>
                    <Text style={styles.vendorCategory}>{vendor.category}</Text>
                  </View>
                  <View style={styles.vendorRating}>
                    <Text style={styles.ratingText}>{vendor.rating}</Text>
                  </View>
                </View>
                
                <Text style={styles.vendorDescription}>{vendor.description}</Text>
                
                <View style={styles.vendorActions}>
                  <TouchableOpacity
                    style={styles.contactButton}
                    onPress={() => contactVendor(vendor)}
                  >
                    <Text style={styles.contactButtonText}>Contact</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.bookButton}>
                    <Text style={styles.bookButtonText}>Book Service</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Create Ticket Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create Maintenance Ticket</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Issue title"
              value={newTicket.title}
              onChangeText={(text) => setNewTicket({ ...newTicket, title: text })}
            />
            
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe the issue in detail..."
              value={newTicket.description}
              onChangeText={(text) => setNewTicket({ ...newTicket, description: text })}
              multiline
              numberOfLines={4}
            />
            
            <Text style={styles.priorityLabel}>Priority:</Text>
            <View style={styles.prioritySelector}>
              {['Low', 'Medium', 'High'].map((priority) => (
                <TouchableOpacity
                  key={priority}
                  style={[
                    styles.priorityOption,
                    newTicket.priority === priority && styles.selectedPriority,
                  ]}
                  onPress={() => setNewTicket({ ...newTicket, priority })}
                >
                  <Text style={[
                    styles.priorityText,
                    newTicket.priority === priority && styles.selectedPriorityText,
                  ]}>
                    {priority}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={createTicket}>
                <Text style={styles.submitButtonText}>Create Ticket</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

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
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#e5e7eb',
    borderRadius: 10,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#d8ad28',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  createButton: {
    backgroundColor: '#d8ad28',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  createButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  ticketCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  ticketBadges: {
    flexDirection: 'row',
    gap: 5,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  ticketDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 10,
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
  ticketAction: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  ticketActionText: {
    fontSize: 12,
    color: '#d8ad28',
    fontWeight: '500',
  },
  vendorCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  vendorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  vendorInfo: {
    flex: 1,
  },
  vendorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  vendorCategory: {
    fontSize: 14,
    color: '#d8ad28',
    marginTop: 2,
  },
  vendorRating: {
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 12,
    color: '#16a34a',
    fontWeight: '600',
  },
  vendorDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  vendorActions: {
    flexDirection: 'row',
    gap: 10,
  },
  contactButton: {
    flex: 1,
    backgroundColor: '#d8ad28',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  contactButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  bookButton: {
    flex: 1,
    backgroundColor: '#10b981',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    margin: 20,
    padding: 25,
    borderRadius: 15,
    width: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  priorityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  prioritySelector: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  priorityOption: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginRight: 5,
  },
  selectedPriority: {
    backgroundColor: '#d8ad28',
    borderColor: '#d8ad28',
  },
  priorityText: {
    fontSize: 14,
    color: '#666',
  },
  selectedPriorityText: {
    color: 'white',
    fontWeight: '600',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#d8ad28',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
