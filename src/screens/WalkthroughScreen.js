import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function WalkthroughScreen() {
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const hotspots = [
    {
      id: 1,
      x: 150,
      y: 200,
      title: 'Living Room',
      description: 'Spacious living area with modern furnishings and large windows.',
      features: ['25 sqm', 'Floor-to-ceiling windows', 'Smart lighting'],
    },
    {
      id: 2,
      x: 250,
      y: 150,
      title: 'Kitchen',
      description: 'Fully equipped modern kitchen with premium appliances.',
      features: ['Stainless steel appliances', 'Granite countertops', 'Island seating'],
    },
    {
      id: 3,
      x: 200,
      y: 300,
      title: 'Master Bedroom',
      description: 'Comfortable master bedroom with ensuite bathroom.',
      features: ['King-size bed', 'Walk-in closet', 'City view'],
    },
  ];

  const handleHotspotPress = (hotspot) => {
    setSelectedHotspot(hotspot);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Property Walkthrough</Text>
      <Text style={styles.subtitle}>Tap on the hotspots to explore different areas</Text>

      <View style={styles.floorplanContainer}>
        {/* Placeholder for 3D model/floorplan */}
        <View style={styles.floorplan}>
          <Text style={styles.floorplanText}>3D Model Placeholder</Text>
          <Text style={styles.floorplanSubtext}>Interactive Floor Plan</Text>

          {/* Hotspots */}
          {hotspots.map((hotspot) => (
            <TouchableOpacity
              key={hotspot.id}
              style={[
                styles.hotspot,
                { left: hotspot.x, top: hotspot.y },
              ]}
              onPress={() => handleHotspotPress(hotspot)}
            >
              <View style={styles.hotspotDot} />
              <View style={styles.hotspotPulse} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlButtonText}>Rotate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlButtonText}>Zoom</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlButtonText}>Measurements</Text>
        </TouchableOpacity>
      </View>

      {/* Hotspot Detail Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedHotspot && (
              <>
                <Text style={styles.modalTitle}>{selectedHotspot.title}</Text>
                <Text style={styles.modalDescription}>
                  {selectedHotspot.description}
                </Text>
                
                <Text style={styles.featuresTitle}>Features:</Text>
                {selectedHotspot.features.map((feature, index) => (
                  <Text key={index} style={styles.feature}>
                    • {feature}
                  </Text>
                ))}

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  floorplanContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  floorplan: {
    flex: 1,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  floorplanText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9ca3af',
  },
  floorplanSubtext: {
    fontSize: 16,
    color: '#9ca3af',
    marginTop: 5,
  },
  hotspot: {
    position: 'absolute',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hotspotDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#d8ad28',
    zIndex: 2,
  },
  hotspotPulse: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(216, 173, 40, 0.3)',
    zIndex: 1,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  controlButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  controlButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
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
    width: width * 0.9,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    lineHeight: 22,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  feature: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  closeButton: {
    backgroundColor: '#d8ad28',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
