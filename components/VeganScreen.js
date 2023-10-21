import React, { useState } from 'react';// Importér nødvendige React-funktioner og hooks
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';// Importér nødvendige komponenter fra React Native
import { veganRestaurants } from '../db';// Importér data fra db.js
import StarRating from 'react-native-star-rating';// Importér StarRating-komponenten fra react-native-star-rating

export default function VeganScreen() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);// State til at spore den valgte butik
  const [showRatingModal, setShowRatingModal] = useState(false);// State til at styre synligheden af bedømmelsesmodalen
  const [selectedRating, setSelectedRating] = useState(0);// State til at vise den valgte bedømmelse
 // Funktion til at vise bedømmelsesmodalen
  const showRating = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setSelectedRating(restaurant.rating);
    setShowRatingModal(true);
  };
// Funktion til at skjule bedømmelsesmodalen
  const hideRating = () => {
    setShowRatingModal(false);
  };
// JSX-komponenten
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Veganske Restauranter i København</Text>
      {veganRestaurants.map((restaurant) => (
        <View key={restaurant.id} style={styles.restaurant}>
          <Text style={styles.restaurantAddress}>{restaurant.address}</Text>
          <TouchableOpacity
            style={styles.ratingButton}
            onPress={() => showRating(restaurant)}
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
  restaurant: {
    margin: 10,
    alignItems: 'center',
  },
  restaurantAddress: {
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
    restaurantImage: {
      width: 100, 
      height: 100,
      borderRadius: 10,
  },
});
  
