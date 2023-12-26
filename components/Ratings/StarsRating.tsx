import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Row } from "../Containers/Row";
import { usePutStadiumRating } from "../../hooks/usePutRating";
import { fonts } from "../../constants/Fonts";
interface StartsRatingProps {
  stadiumId: string;
}
export const StarsRating = ({ stadiumId }: StartsRatingProps) => {
  const { rating, handleStarPress } = usePutStadiumRating(stadiumId);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your opinion of the stadium</Text>
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
    marginBottom: 20,
  },
  text: {
    fontFamily: fonts.medium,
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
    color: "#ffcc00",
  },
});
