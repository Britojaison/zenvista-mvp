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

export default function AmenitiesScreen() {
  const [reservations, setReservations] = useState([]);

  const amenities = [
    { id: 1, name: 'Swimming Pool', icon: require('../icons/swimming pool.png'), slots: generateTimeSlots() },
    { id: 2, name: 'Gym', icon: require('../icons/gym.png'), slots: generateTimeSlots() },
    { id: 3, name: 'BBQ Area', icon: require('../icons/bbq.png'), slots: generateTimeSlots() },
    { id: 4, name: 'Tennis Court', icon: require('../icons/tennis.png'), slots: generateTimeSlots() },
  ];

  const [selectedAmenity, setSelectedAmenity] = useState(amenities[0]);

  function generateTimeSlots() {
    const slots = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const daySlots = [];
      for (let hour = 9; hour <= 21; hour += 2) {
        daySlots.push({
          id: `${date.toDateString()}-${hour}`,
          time: `${hour}:00 - ${hour + 2}:00`,
          date: date.toDateString(),
          available: Math.random() > 0.3, // 70% chance of being available
        });
      }
      slots.push(...daySlots);
    }
    
    return slots;
  }

  const bookSlot = (amenityId, slot) => {
    if (!slot.available) {
      Alert.alert('Error', 'This slot is not available');
      return;
    }

    // Check if already booked
    const alreadyBooked = reservations.find(
      r => r.amenityId === amenityId && r.slotId === slot.id
    );

    if (alreadyBooked) {
      Alert.alert('Error', 'You have already booked this slot');
      return;
    }

    const newReservation = {
      id: Date.now(),
      amenityId,
      slotId: slot.id,
      amenityName: selectedAmenity.name,
      time: slot.time,
      date: slot.date,
    };

    setReservations([...reservations, newReservation]);
    
    // Update slot availability
    const updatedAmenities = amenities.map(amenity => {
      if (amenity.id === amenityId) {
        const updatedSlots = amenity.slots.map(s => 
          s.id === slot.id ? { ...s, available: false } : s
        );
        return { ...amenity, slots: updatedSlots };
      }
      return amenity;
    });

    Alert.alert('Success', 'Amenity booked successfully!');
  };

  const groupSlotsByDate = (slots) => {
    const grouped = {};
    slots.forEach(slot => {
      if (!grouped[slot.date]) {
        grouped[slot.date] = [];
      }
      grouped[slot.date].push(slot);
    });
    return grouped;
  };

  const groupedSlots = groupSlotsByDate(selectedAmenity.slots);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Amenities Booking</Text>

      {/* Amenity Selector */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.amenitySelector}>
        {amenities.map((amenity) => (
          <TouchableOpacity
            key={amenity.id}
            style={[
              styles.amenityCard,
              selectedAmenity.id === amenity.id && styles.selectedAmenityCard,
            ]}
            onPress={() => setSelectedAmenity(amenity)}
          >
            <Image source={amenity.icon} style={styles.amenityIcon} />
            <Text style={[
              styles.amenityName,
              selectedAmenity.id === amenity.id && styles.selectedAmenityName,
            ]}>
              {amenity.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Available Slots */}
      <View style={styles.slotsSection}>
        <Text style={styles.sectionTitle}>Available Slots</Text>
        
        {Object.entries(groupedSlots).map(([date, slots]) => (
          <View key={date} style={styles.dateSection}>
            <Text style={styles.dateTitle}>{date}</Text>
            <View style={styles.slotsGrid}>
              {slots.map((slot) => (
                <TouchableOpacity
                  key={slot.id}
                  style={[
                    styles.slotCard,
                    !slot.available && styles.unavailableSlot,
                  ]}
                  onPress={() => bookSlot(selectedAmenity.id, slot)}
                  disabled={!slot.available}
                >
                  <Text style={[
                    styles.slotTime,
                    !slot.available && styles.unavailableSlotText,
                  ]}>
                    {slot.time}
                  </Text>
                  <Text style={[
                    styles.slotStatus,
                    !slot.available && styles.unavailableSlotText,
                  ]}>
                    {slot.available ? 'Available' : 'Booked'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* My Reservations */}
      {reservations.length > 0 && (
        <View style={styles.reservationsSection}>
          <Text style={styles.sectionTitle}>My Reservations</Text>
          {reservations.map((reservation) => (
            <View key={reservation.id} style={styles.reservationCard}>
              <Text style={styles.reservationAmenity}>{reservation.amenityName}</Text>
              <Text style={styles.reservationDetails}>
                {reservation.date} • {reservation.time}
              </Text>
            </View>
          ))}
        </View>
      )}
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
  amenitySelector: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  amenityCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    marginRight: 15,
    alignItems: 'center',
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  selectedAmenityCard: {
    backgroundColor: '#d8ad28',
  },
  amenityIcon: {
    width: 24,
    height: 24,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  amenityName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  selectedAmenityName: {
    color: 'white',
  },
  slotsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  dateSection: {
    marginBottom: 20,
  },
  dateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 10,
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  slotCard: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    width: '48%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  unavailableSlot: {
    backgroundColor: '#f3f4f6',
    borderColor: '#d1d5db',
  },
  slotTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  slotStatus: {
    fontSize: 12,
    color: '#10b981',
    marginTop: 2,
  },
  unavailableSlotText: {
    color: '#9ca3af',
  },
  reservationsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  reservationCard: {
    backgroundColor: '#d8ad28',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  reservationAmenity: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  reservationDetails: {
    fontSize: 14,
    color: '#dbeafe',
    marginTop: 2,
  },
});
