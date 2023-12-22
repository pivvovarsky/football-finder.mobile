import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Row } from "../Containers/Row";

export const StarsRating = () => {
  const [rating, setRating] = useState(0);

  const handleStarPress = (selectedRating: number) => {
    setRating(selectedRating);
  };

  return (
    <View style={styles.container}>
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
    marginVertical: 20,
  },
  text: {
    marginBottom: 10,
  },
  starContainer: {
    flexDirection: "row",
  },
  star: {
    fontSize: 20,
    color: "#888",
    marginRight: 5,
  },
  selectedStar: {
    color: "#ffcc00", // Kolor gwiazdek po zaznaczeniu
  },
});
