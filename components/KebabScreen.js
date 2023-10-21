import React, { useState } from 'react'; // Importér nødvendige React-funktioner og hooks
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'; // Importér nødvendige komponenter fra React Native
import { kebabShops } from '../db'; // Importér data fra db.js
import StarRating from 'react-native-star-rating'; // Importér StarRating-komponenten fra react-native-star-rating

export default function KebabScreen() {
  const [selectedShop, setSelectedShop] = useState(null); // State til at spore den valgte butik
  const [showRatingModal, setShowRatingModal] = useState(false); // State til at styre synligheden af bedømmelsesmodalen
  const [selectedRating, setSelectedRating] = useState(0); // State til at vise den valgte bedømmelse

  // Funktion til at vise bedømmelsesmodalen
  const showRating = (shop) => {
    setSelectedShop(shop);
    setSelectedRating(shop.rating);
    setShowRatingModal(true);
  };

  // Funktion til at skjule bedømmelsesmodalen
  const hideRating = () => {
    setShowRatingModal(false);
  };

  // JSX-komponenten
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Liste over kebabbutikker i København</Text>
      {kebabShops.map((shop) => (
        <View key={shop.id} style={styles.shop}>
          <Text style={styles.shopAddress}>{shop.address}</Text>
          <TouchableOpacity
            style={styles.ratingButton}
            onPress={() => showRating(shop)}
          >
            <Text style={styles.ratingButtonText}>Rating</Text>
          </TouchableOpacity>
        </View>
      ))}
      <Modal
        visible={showRatingModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.ratingModal}>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={selectedRating}
            fullStarColor={'gold'}
            starSize={30}
          />
          <TouchableOpacity onPress={hideRating}>
            <Text style={styles.closeText}>Luk</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  shop: {
    margin: 10,
    alignItems: 'center',
  },
  shopAddress: {
    fontSize: 16,
  },
  ratingButton: {
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 5,
  },
  ratingButtonText: {
    color: 'white',
  },
  ratingModal: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});
