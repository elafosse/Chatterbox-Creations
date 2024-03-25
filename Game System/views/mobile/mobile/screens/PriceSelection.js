import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

//array of categories
const prices = ['$100', '$200', '$300', '$400', '$500'];

const PriceSelection = ({ navigation }) => {
  const [selectedPrice, setSelectedPrice] = useState(null);

  const handlePriceSelect = (Price) => {
    setSelectedPrice(Price);
  };

  const handleReady = () => {
    if (selectedPrice) {
      // Navigate to the game screen or handle the Price selection
      // navigation.navigate('GameScreen', { Price: selectedPrice });
    } else {
      // Alert the player to select a Price
      alert('Please select a price.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a price</Text>
      <View style={styles.PriceContainer}>
        {prices.map((Price) => (
          <TouchableOpacity
            key={Price}
            style={[
              styles.PriceButton,
              Price === selectedPrice && styles.selectedPrice,
            ]}
            onPress={() => handlePriceSelect(Price)}
          >
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.PriceText}>{Price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.readyButton}
        onPress={handleReady}
      >
        <Text style={styles.readyButtonText}>READY</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0C1562',
  },
  PriceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  PriceButton: {
    paddingVertical: 30, 
    paddingHorizontal: 30, 
    margin: 10, 
    backgroundColor: '#fff', 
    borderColor: '#CCC', 
    borderWidth: 1,
    width: '40%',
  },
  selectedPrice: {
    borderColor: '#0C1562', 
    borderWidth: 2,
  },
  PriceText: {
    fontSize: 25,
    color: 'orange',
    alignItems: 'center',
  },
  readyButton: {
    borderRadius: 25,
    padding: 15,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0C1562',
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 2, 
  },
  readyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PriceSelection;