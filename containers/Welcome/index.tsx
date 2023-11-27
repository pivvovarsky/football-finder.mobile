import { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { layout, window } from "../../constants/Layout";
import { colors } from "../../constants/Colors";
import { MapButton } from "../../components/Map/MapButton";
import { Row } from "../../components/Containers/Row";
import { useNavigation } from "@react-navigation/native";
import { NotLoggedNavigationProp } from "../../navigation/NotLogged";
import WelcomeIcon from "../../assets/icons/default.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomMap } from "../../components/Map/CustomMap";
import { LocationCard } from "../../components/Map/LocationCard";
import { useMap } from "../../hooks/context/useMap";
import { StadiumData } from "../../hooks/api/stadiums/getStadiums";

export function Welcome() {
  const navigation = useNavigation<NotLoggedNavigationProp>();
  const insets = useSafeAreaInsets();
  const { isLoadingStadiumsData, stadiumsData } = useMap();
  const [locationDetails, setLocationDetails] = useState<StadiumData | null>(null);

  const updateLocationDetails = (stadium: StadiumData | null) => {
    if (!stadium) {
      setLocationDetails(null);
    } else setLocationDetails(stadium);
  };

  const navigateSignUp = () => {
    navigation.navigate("SignUp");
  };

  const navigateLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 15) }]}>
      {isLoadingStadiumsData ? (
        <ActivityIndicator size={"large"} color={colors.darkGreen} />
      ) : (
        <>
          <CustomMap stadiums={stadiumsData} onMarkerPress={updateLocationDetails} />
          <View style={styles.welcomeContainer}>
            <WelcomeIcon width={300} height={50} />
          </View>

          {!!locationDetails ? (
            <LocationCard
              version="public"
              locationDetails={locationDetails}
              updateLocationDetails={updateLocationDetails}
            />
          ) : (
            <View style={{ marginBottom: Platform.OS === "android" ? 60 : window.width * 0.27 }}>
              <View style={styles.welcomeTextContainer}>
                <Text style={styles.welcomeText} variant="titleLarge">
                  Ready to explore?
                </Text>
              </View>
              <Row style={styles.buttonsContainer}>
                <MapButton onPress={navigateLogin} style={styles.button} text={"Login"} isLoading={false} />
                <MapButton onPress={navigateSignUp} style={styles.button} text={"Sign Up"} isLoading={false} />
              </Row>
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, ...StyleSheet.absoluteFillObject, justifyContent: "space-between" },
  textContainer: {
    textAlign: "center",
    alignItems: "center",
  },
  welcomeContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: layout.screenHorizontalPadding,
    marginTop: Platform.OS === "android" ? 40 : 0,
    borderRadius: 60,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  welcomeTextContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 60,
    marginHorizontal: 15,
  },
  welcomeText: {
    textAlign: "center",
    alignItems: "center",
    paddingHorizontal: layout.screenHorizontalPadding,
    color: colors.darkBlue,
    fontWeight: "700",
  },
  buttonsContainer: {
    width: "100%",
  },
  button: {
    width: window.width * 0.5,
  },
});
