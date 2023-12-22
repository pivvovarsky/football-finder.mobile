import { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { layout, window } from "../../constants/Layout";
import { colors } from "../../constants/Colors";
import { MapButton } from "../../components/Public/MapButton";
import { Row } from "../../components/Containers/Row";
import { useNavigation } from "@react-navigation/native";
import { NotLoggedNavigationProp } from "../../navigation/NotLogged";
import WelcomeIcon from "../../assets/icons/logo.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomMap } from "../../components/Map/CustomMap";
import { LocationCard } from "../../components/Map/LocationCard";
import { useMap } from "../../hooks/context/useMap";
import { StadiumData } from "../../hooks/api/stadiums/getStadiums";
import { fonts } from "../../constants/Fonts";

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
        <ActivityIndicator size={"large"} />
      ) : (
        <>
          <CustomMap stadiums={stadiumsData} onMarkerPress={updateLocationDetails} />
          <View style={styles.welcomeContainer}>
            <Text style={styles.title}>Football</Text>
            <WelcomeIcon width={70} height={50} />
            <Text style={styles.title}>Finder</Text>
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
  title: {
    fontFamily: fonts.medium,
    color: colors.white,
    fontSize: window.width * 0.1,
    textAlign: "center",
    alignItems: "center",
  },
  welcomeContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 5,
    marginHorizontal: layout.screenHorizontalPadding,
    marginTop: Platform.OS === "android" ? 40 : 0,
    borderRadius: 60,
    backgroundColor: "rgba(238, 222, 200, 0.9)",
    borderWidth: 3,
    borderColor: colors.brown,
  },
  welcomeTextContainer: {
    marginHorizontal: layout.publicScreenHorizontalPadding,
    borderRadius: 60,
    padding: 15,
    backgroundColor: "rgba(238, 222, 200, 1)",
    borderWidth: 3,
    borderColor: colors.brown,
  },
  welcomeText: {
    textAlign: "center",
    alignItems: "center",
    paddingHorizontal: layout.screenHorizontalPadding,
    fontFamily: fonts.medium,
    color: colors.white,
  },
  buttonsContainer: {
    width: "100%",
    justifyContent: "space-around",
  },
  button: {
    width: window.width * 0.45,
  },
});
