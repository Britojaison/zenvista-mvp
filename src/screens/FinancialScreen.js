import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';

export default function FinancialScreen() {
  const [invoices, setInvoices] = useState([
    {
      id: 1,
      type: 'Rent',
      amount: 2500,
      dueDate: '2024-09-30',
      status: 'pending',
      description: 'Monthly rent payment',
    },
    {
      id: 2,
      type: 'Utilities',
      amount: 150,
      dueDate: '2024-09-25',
      status: 'pending',
      description: 'Electricity and water',
    },
    {
      id: 3,
      type: 'Parking',
      amount: 100,
      dueDate: '2024-09-30',
      status: 'pending',
      description: 'Parking space rental',
    },
    {
      id: 4,
      type: 'Maintenance',
      amount: 75,
      dueDate: '2024-08-30',
      status: 'paid',
      description: 'Air conditioning service',
    },
  ]);

  const [paymentHistory] = useState([
    { id: 1, date: '2024-08-30', amount: 75, type: 'Maintenance' },
    { id: 2, date: '2024-08-01', amount: 2500, type: 'Rent' },
    { id: 3, date: '2024-08-01', amount: 130, type: 'Utilities' },
  ]);

  const payInvoice = (invoiceId) => {
    Alert.alert(
      'Confirm Payment',
      'Are you sure you want to pay this invoice?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Pay',
          onPress: () => {
            setInvoices(invoices.map(invoice => 
              invoice.id === invoiceId 
                ? { ...invoice, status: 'paid' }
                : invoice
            ));
            Alert.alert('Success', 'Payment processed successfully!');
          },
        },
      ]
    );
  };

  const getTotalOutstanding = () => {
    return invoices
      .filter(invoice => invoice.status === 'pending')
      .reduce((total, invoice) => total + invoice.amount, 0);
  };

  const getStatusColor = (status) => {
    return status === 'paid' ? '#10b981' : '#f59e0b';
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Rent': return require('../icons/house.png');
      case 'Utilities': return require('../icons/bill.png');
      case 'Parking': return require('../icons/rental.png');
      case 'Maintenance': return require('../icons/maintenance.png');
      default: return require('../icons/payments.png');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Financial Management</Text>

      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Total Outstanding</Text>
        <Text style={styles.summaryAmount}>${getTotalOutstanding()}</Text>
        <Text style={styles.summarySubtext}>
          {invoices.filter(i => i.status === 'pending').length} pending payments
        </Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionCard}>
            <Image source={require('../icons/wallet.png')} style={styles.actionIcon} />
            <Text style={styles.actionText}>Pay All</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionCard}>
            <Image source={require('../icons/bar-chart.png')} style={styles.actionIcon} />
            <Text style={styles.actionText}>View Reports</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionCard}>
            <Image source={require('../icons/automatic-payment.png')} style={styles.actionIcon} />
            <Text style={styles.actionText}>Auto Pay</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionCard}>
            <Image source={require('../icons/invoice.png')} style={styles.actionIcon} />
            <Text style={styles.actionText}>Email Invoice</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Pending Invoices */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pending Invoices</Text>
        {invoices
          .filter(invoice => invoice.status === 'pending')
          .map((invoice) => (
            <View key={invoice.id} style={styles.invoiceCard}>
              <View style={styles.invoiceHeader}>
                <View style={styles.invoiceInfo}>
                  <Image source={getTypeIcon(invoice.type)} style={styles.invoiceIcon} />
                  <View>
                    <Text style={styles.invoiceType}>{invoice.type}</Text>
                    <Text style={styles.invoiceDescription}>{invoice.description}</Text>
                  </View>
                </View>
                <Text style={styles.invoiceAmount}>${invoice.amount}</Text>
              </View>
              
              <View style={styles.invoiceFooter}>
                <Text style={styles.dueDate}>Due: {invoice.dueDate}</Text>
                <TouchableOpacity
                  style={styles.payButton}
                  onPress={() => payInvoice(invoice.id)}
                >
                  <Text style={styles.payButtonText}>Pay Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </View>

      {/* Payment History */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment History</Text>
        {[...paymentHistory, ...invoices.filter(i => i.status === 'paid')]
          .sort((a, b) => new Date(b.date || b.dueDate) - new Date(a.date || a.dueDate))
          .map((payment, index) => (
            <View key={`history-${index}`} style={styles.historyCard}>
              <View style={styles.historyInfo}>
                <Image source={getTypeIcon(payment.type)} style={styles.historyIcon} />
                <View>
                  <Text style={styles.historyType}>{payment.type}</Text>
                  <Text style={styles.historyDate}>
                    {payment.date || payment.dueDate}
                  </Text>
                </View>
              </View>
              <View style={styles.historyAmount}>
                <Text style={styles.historyAmountText}>-${payment.amount}</Text>
                <View style={[styles.historyStatus, { backgroundColor: '#10b981' }]}>
                  <Text style={styles.historyStatusText}>Paid</Text>
                </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    padding: 20,
    paddingBottom: 10,
  },
  summaryCard: {
    backgroundColor: '#d8ad28',
    margin: 20,
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 16,
    color: '#dbeafe',
    marginBottom: 5,
  },
  summaryAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  summarySubtext: {
    fontSize: 14,
    color: '#dbeafe',
    marginTop: 5,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '48%',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  actionIcon: {
    width: 24,
    height: 24,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  invoiceCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  invoiceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  invoiceIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
    resizeMode: 'contain',
  },
  invoiceType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  invoiceDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  invoiceAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d8ad28',
  },
  invoiceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dueDate: {
    fontSize: 14,
    color: '#f59e0b',
    fontWeight: '500',
  },
  payButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  payButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  historyCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  historyIcon: {
    width: 20,
    height: 20,
    marginRight: 15,
    resizeMode: 'contain',
  },
  historyType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  historyDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  historyAmount: {
    alignItems: 'flex-end',
  },
  historyAmountText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  historyStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  historyStatusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
});
