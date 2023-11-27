import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export const StarsRating = () => {
  const [rating, setRating] = useState(0);

  const handleStarPress = (selectedRating: number) => {
    setRating(selectedRating);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ocena: {rating}</Text>
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleStarPress(star)} activeOpacity={0.7}>
            <Text style={[styles.star, star <= rating ? styles.selectedStar : null]}>★</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  starContainer: {
    flexDirection: "row",
  },
  star: {
    fontSize: 30,
    color: "#888",
    marginRight: 5,
  },
  selectedStar: {
    color: "#ffcc00", // Kolor gwiazdek po zaznaczeniu
  },
});
