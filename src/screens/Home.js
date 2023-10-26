import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, ImageBackground, StyleSheet, Text, View } from "react-native";
import Swiper from "react-native-swiper";
import MainNavigator from "../navigate/MainNavigator";
import { SafeAreaView } from "react-native-safe-area-context";

const WelcomeSlide = () => {
  const navigation = useNavigation();
  const goToRegister = () => {
    navigation.navigate("Registro");
  };
  const goToLogin = () => {
    navigation.navigate("Login");
  };
  // const goToAxios = () => {
  //   navigation.navigate("Axios");
  // };
  // const goToAxiosPokemon = () => {
  //   navigation.navigate("AxiosPokemon");
  // };
  // const goToAxiosMovies = () => {
  //   navigation.navigate("AxiosMovies");
  // };

  const goToImagePicker = () => {
    navigation.navigate("ImagePicker");
  };

  const goToPost = () => {
    navigation.navigate("Posts");
  }

  const Slide1 = () => {
    return (
      <View>
        <ImageBackground
          source={require("./images/Cohete.jpg")}
          style={styles.imgBackground}
        ></ImageBackground>
      </View>
    );
  };
  const Slide2 = () => {
    return (
      <View>
        <ImageBackground
          source={require("./images/Compu.jpg")}
          style={styles.imgBackground}
        ></ImageBackground>
      </View>
    );
  };
  const Slide3 = () => {
    return (
      <View>
        <ImageBackground
          source={require("./images/Tablet.jpg")}
          style={styles.imgBackground}
        ></ImageBackground>
      </View>
    );
  };
  const Slide4 = () => {
    return (
      <View>
        <Button title="Registrarse" onPress={goToRegister} />
        <Button title="Iniciar sesión" onPress={goToLogin} />
        <Button title="Posts" onPress={goToPost} />
        <Button title="ImagePicker" onPress={goToImagePicker} />
        
      </View>
    );
  };

  return (
    <Swiper>
      <Slide1 />
      <Slide2 />
      <Slide3 />
      <Slide4 />
    </Swiper>
  );
};
const styles = StyleSheet.create({
  imgBackground: {
    width: "100%",
    height: "90%",
  },
});
export default WelcomeSlide;
