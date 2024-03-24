import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

//array of categories
const categories = ['Music', 'Sports', 'Animals', 'History', 'Movies'];

const CategorySelection = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleReady = () => {
    if (selectedCategory) {
      // Navigate to the game screen or handle the category selection
      // navigation.navigate('GameScreen', { category: selectedCategory });
    } else {
      // Alert the player to select a category
      alert('Please select a category.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a category</Text>
      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              category === selectedCategory && styles.selectedCategory,
            ]}
            onPress={() => handleCategorySelect(category)}
          >
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.categoryText}>{category}</Text>
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
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  categoryButton: {
    paddingVertical: 30, 
    paddingHorizontal: 30, 
    margin: 10, 
    backgroundColor: '#fff', 
    borderColor: '#CCC', 
    borderWidth: 1,
    width: '40%',
  },
  selectedCategory: {
    borderColor: '#0C1562', 
    borderWidth: 2,
  },
  categoryText: {
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

export default CategorySelection;
