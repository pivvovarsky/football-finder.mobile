import Geolocation from "@react-native-community/geolocation";
import { useEffect, useState } from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Icon, Text } from "react-native-paper";
import { layout, window } from "../../constants/Layout";
import { colors } from "../../constants/Colors";
import { MapButton } from "../../components/Map/MapButton";
import { Row } from "../../components/Containers/Row";
import { useNavigation } from "@react-navigation/native";
import { NotLoggedNavigationProp } from "../../navigation/NotLogged";
import WelcomeIcon from "../../assets/icons/default.svg";

export function Welcome() {
  const navigation = useNavigation<NotLoggedNavigationProp>();

  const [position, setPosition] = useState({
    latitude: 50.19293799535422,
    latitudeDelta: 0.0421,
    longitude: 18.974965056422143,
    longitudeDelta: 0.0421, //to change
  });

  const navigateSignUp = () => {
    navigation.navigate("SignUp");
  };

  const navigateLogin = () => {
    navigation.navigate("Login");
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (pos) => {
        const crd = pos.coords;
        setPosition({
          latitude: crd.latitude,
          longitude: crd.longitude,
          latitudeDelta: 0.0421,
          longitudeDelta: 0.0421,
        });
      },
      () => {},
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  }, []);

  //   <MapView region={this.state.region} onRegionChange={this.onRegionChange}>
  //   {this.state.markers.map((marker, index) => (
  //     <Marker
  //       key={index}
  //       coordinate={marker.latlng}
  //       title={marker.title}
  //       description={marker.description}
  //     />
  //   ))}
  // </MapView>;
  return (
    <View style={styles.map}>
      <MapView
        // remove if not using Google Maps
        provider={PROVIDER_GOOGLE}
        region={position}
        style={styles.map}
        loadingBackgroundColor={colors.white}
        initialRegion={position}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        loadingEnabled={true}
      >
        <Marker
          isPreselected={true}
          title="Yor are here"
          description="Let's look for some football game!"
          coordinate={position}
        />
      </MapView>
      <View style={{ marginTop: 10 }}>
        <Text style={styles.welcomeHeader} variant="titleLarge">
          Welcome to
        </Text>
        <View style={styles.welcomeHeader}>
          <WelcomeIcon width={300} height={50} />
        </View>
      </View>
      <View>
        <Text style={styles.welcomeText} variant="titleLarge">
          Ready to explore?
        </Text>
        <Row style={styles.buttonsContainer}>
          <MapButton
            onPress={navigateLogin}
            style={styles.button}
            text={"Login"}
            isLoading={false}
          />
          <MapButton
            onPress={navigateSignUp}
            style={styles.button}
            text={"Sign Up"}
            isLoading={false}
          />
        </Row>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
  },
  welcomeHeader: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    textAlign: "center",
    alignItems: "center",
    paddingHorizontal: layout.screenHorizontalPadding,
    color: colors.darkBlue,
    fontWeight: "700",
    marginHorizontal: 15,
  },
  welcomeText: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    textAlign: "center",
    alignItems: "center",
    paddingHorizontal: layout.screenHorizontalPadding,
    color: colors.darkBlue,
    fontWeight: "700",
    marginHorizontal: 15,
  },
  buttonsContainer: {
    width: "100%",
    marginBottom: window.height * 0.15,
  },
  button: {
    width: window.width * 0.5,
  },
});