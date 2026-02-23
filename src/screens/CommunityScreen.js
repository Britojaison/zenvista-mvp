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

export default function CommunityScreen() {
  const [announcements] = useState([
    {
      id: 1,
      title: 'Pool Maintenance Notice',
      content: 'The swimming pool will be closed for maintenance on September 20-21.',
      date: '2024-09-15',
      type: 'maintenance',
      author: 'Building Management',
    },
    {
      id: 2,
      title: 'Community BBQ Event',
      content: 'Join us for a community BBQ on Saturday at the rooftop garden. Food and drinks provided!',
      date: '2024-09-14',
      type: 'event',
      author: 'Community Committee',
    },
    {
      id: 3,
      title: 'New Security Measures',
      content: 'Enhanced security protocols have been implemented. Please carry your access cards at all times.',
      date: '2024-09-10',
      type: 'security',
      author: 'Security Team',
    },
    {
      id: 4,
      title: 'Welcome New Residents!',
      content: 'Please join us in welcoming our new neighbors in units 301 and 405.',
      date: '2024-09-08',
      type: 'general',
      author: 'Building Management',
    },
  ]);

  const [events] = useState([
    {
      id: 1,
      title: 'Yoga Class',
      date: '2024-09-20',
      time: '07:00 AM',
      location: 'Rooftop Garden',
      description: 'Weekly morning yoga session for all residents.',
      attendees: 12,
    },
    {
      id: 2,
      title: 'Board Game Night',
      date: '2024-09-22',
      time: '07:00 PM',
      location: 'Community Room',
      description: 'Fun evening of board games and socializing.',
      attendees: 8,
    },
    {
      id: 3,
      title: 'Building Clean-up Day',
      date: '2024-09-25',
      time: '09:00 AM',
      location: 'Common Areas',
      description: 'Community volunteer day to beautify our shared spaces.',
      attendees: 15,
    },
    {
      id: 4,
      title: 'Monthly Residents Meeting',
      date: '2024-09-30',
      time: '06:00 PM',
      location: 'Community Room',
      description: 'Discuss building matters and upcoming improvements.',
      attendees: 25,
    },
  ]);

  const [activeTab, setActiveTab] = useState('announcements');

  const getAnnouncementIcon = (type) => {
    // Removed icons from announcements as requested
    return null;
  };

  const getAnnouncementColor = (type) => {
    switch (type) {
      case 'maintenance': return '#f59e0b';
      case 'event': return '#10b981';
      case 'security': return '#ef4444';
      default: return '#d8ad28';
    }
  };

  const joinEvent = (eventId) => {
    Alert.alert(
      'Join Event',
      'Would you like to join this event?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Join',
          onPress: () => Alert.alert('Success', 'You have been added to the event!'),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Community & Events</Text>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'announcements' && styles.activeTab]}
          onPress={() => setActiveTab('announcements')}
        >
          <Text style={[styles.tabText, activeTab === 'announcements' && styles.activeTabText]}>
            Announcements
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'events' && styles.activeTab]}
          onPress={() => setActiveTab('events')}
        >
          <Text style={[styles.tabText, activeTab === 'events' && styles.activeTabText]}>
            Events
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'announcements' ? (
          <View style={styles.section}>
            {announcements.map((announcement) => (
              <View key={announcement.id} style={styles.announcementCard}>
                <View style={styles.announcementHeader}>
                  <View style={styles.announcementTitleRow}>
                    <Text style={styles.announcementTitle}>{announcement.title}</Text>
                  </View>
                  <View style={[
                    styles.announcementType,
                    { backgroundColor: getAnnouncementColor(announcement.type) }
                  ]}>
                    <Text style={styles.announcementTypeText}>
                      {announcement.type.toUpperCase()}
                    </Text>
                  </View>
                </View>
                
                <Text style={styles.announcementContent}>{announcement.content}</Text>
                
                <View style={styles.announcementFooter}>
                  <Text style={styles.announcementAuthor}>By {announcement.author}</Text>
                  <Text style={styles.announcementDate}>{announcement.date}</Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.section}>
            {events.map((event) => (
              <View key={event.id} style={styles.eventCard}>
                <View style={styles.eventHeader}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <TouchableOpacity
                    style={styles.joinButton}
                    onPress={() => joinEvent(event.id)}
                  >
                    <Text style={styles.joinButtonText}>Join</Text>
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.eventDescription}>{event.description}</Text>
                
                <View style={styles.eventDetails}>
                  <View style={styles.eventDetailRow}>
                    <Image source={require('../icons/calendar.png')} style={styles.eventDetailIcon} />
                    <Text style={styles.eventDetailText}>{event.date} at {event.time}</Text>
                  </View>
                  <View style={styles.eventDetailRow}>
                    <Image source={require('../icons/location.png')} style={styles.eventDetailIcon} />
                    <Text style={styles.eventDetailText}>{event.location}</Text>
                  </View>
                  <View style={styles.eventDetailRow}>
                    <Image source={require('../icons/audience.png')} style={styles.eventDetailIcon} />
                    <Text style={styles.eventDetailText}>{event.attendees} attending</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
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
  announcementCard: {
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
  announcementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  announcementTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  announcementType: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  announcementTypeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  announcementContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 10,
  },
  announcementFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  announcementAuthor: {
    fontSize: 12,
    color: '#d8ad28',
    fontWeight: '500',
  },
  announcementDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
  eventCard: {
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
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  joinButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  joinButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  eventDetails: {
    gap: 8,
  },
  eventDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventDetailIcon: {
    width: 16,
    height: 16,
    marginRight: 10,
    resizeMode: 'contain',
  },
  eventDetailText: {
    fontSize: 14,
    color: '#555',
  },
});
