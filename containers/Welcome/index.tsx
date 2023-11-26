import Geolocation from "@react-native-community/geolocation";
import { useEffect, useState } from "react";
import { Image, ImageSourcePropType, PermissionsAndroid, Platform, StyleSheet, View } from "react-native";
import MapView, { MapMarkerProps, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { ActivityIndicator, Icon, Text } from "react-native-paper";
import { layout, window } from "../../constants/Layout";
import { colors } from "../../constants/Colors";
import { MapButton } from "../../components/Map/MapButton";
import { Row } from "../../components/Containers/Row";
import { useNavigation } from "@react-navigation/native";
import { NotLoggedNavigationProp } from "../../navigation/NotLogged";
import WelcomeIcon from "../../assets/icons/default.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Map } from "./components/Map";
import { StadiumData, useGetStadiums } from "../../hooks/api/stadiums/getStadiums";
import { MarkerProps } from "react-native-svg";
import { ResourcesLoader } from "../../components/Loaders/ResourcesLoader";

export function Welcome() {
  const navigation = useNavigation<NotLoggedNavigationProp>();
  const { data: stadiums, isLoading } = useGetStadiums();
  const [stadiumsData, setStadiumsData] = useState<StadiumData[]>([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!!stadiums?.data) {
      setStadiumsData(stadiums.data);
    }
  }, [stadiums?.data]);

  const navigateSignUp = () => {
    navigation.navigate("SignUp");
  };

  const navigateLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 15) }]}>
      {isLoading ? (
        <ActivityIndicator size={"large"} color={colors.darkGreen} />
      ) : (
        <>
          <Map stadiums={stadiumsData} />
          <View style={styles.welcomeContainer}>
            <WelcomeIcon width={300} height={50} />
          </View>
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
