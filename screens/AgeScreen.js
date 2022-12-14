import React, {useState} from "react"
import { StyleSheet, Text, View, ImageBackground, TextInput} from "react-native"

import backIcon from "../components/icons/BackIcon"
import OffsetMiniButton from '../components/buttons/OffsetMiniButton'
import Tunnel from "../components/buttons/Tunnel"

//! Non utilisé (doit servir pour la selection du tranche d'age)
//! Non fonctionnel

function AgeScreen(props) {

  var retour = backIcon("SearchGames", props)
  var confirmer = OffsetMiniButton("Confirmer", "DiscoverScreen",props)
 
  var tunnel = Tunnel("5")

  return (

    <ImageBackground
      resizeMode="cover"
      style={styles.background}
      source={require('../assets/backgrounds/fond_buddy.png')}>

      {retour}

      <View style={styles.container}>

        <Text style={styles.text}>Tranche d'âge</Text>

      
        
        {confirmer}
 

        {tunnel}

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  container: {

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },

  background: {

    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },

  text: {

    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 125,

    fontWeight: "400",
    fontSize: 26,
    letterSpacing: 0.5,
    color: "#372C60",
    textAlign: "center",

  },

  input: {
    width : 200,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
},
header: {

  marginRight : 300,
  marginTop : 30
  
},

});


export default AgeScreen
