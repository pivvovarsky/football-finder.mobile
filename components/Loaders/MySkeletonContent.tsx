import React, { useEffect, useRef } from "react";

import { Animated, Image, SectionList, StatusBar, StyleSheet, Text, View, ViewProps } from "react-native";

interface SkeletonProps extends ViewProps {
  loading: boolean;
}
export function Skeleton({ loading, style }: SkeletonProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        {
          iterations: -1,
        },
      ).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [loading, fadeAnim]);

  if (!loading) {
    return null;
  }

  return (
    <Animated.View
      style={[
        style,
        styles.square,
        {
          opacity: fadeAnim,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  square: {
    backgroundColor: "gray",
  },
});
