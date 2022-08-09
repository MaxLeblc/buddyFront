import React from "react";
import {StyleSheet, View, ImageBackground, Image} from "react-native";

import OffsetButton from "../components/buttons/OffsetButton";

export default function Homescreen(props) {

  var inscription = OffsetButton("Inscription", "BirthdayScreen", inscription)
  var connexion = OffsetButton("Connexion", "ChatScreen", connexion) //SignInScreen

  function inscription(redirection){
    props.navigation.navigate(redirection); 
  }
  function connexion(redirection){
    props.navigation.navigate(redirection); 
  }

  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.background}
      source={require("../assets/backgrounds/dégradé_buddy.png")}
    >
      <Image
        style={styles.logo}
        source={require("../assets/logo/logo_buddy.png")}
      />

      <View style={styles.container}>
        {inscription}
        {connexion}
      </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  background: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    flex: 1,
    resizeMode: "contain",
    width: "50%",
    marginTop: 100,
  },

  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

});
