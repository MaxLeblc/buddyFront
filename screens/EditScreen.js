import {
    StyleSheet,
    Text,
    View,
    Title,
    Button,
    ImageBackground,
    Image,
    SafeAreaView,
    ScrollView,
    Pressable,
    Icon
  } from "react-native";
  
  import React, { useState, useEffect } from "react";
  import ProfilPicture from "../components/cards/ProfilPicture";
  import Header2 from "../components/cards/Header2";
  import Edit from "../components/cards/Edit";
  import AsyncStorage from '@react-native-async-storage/async-storage';

//! Pas utilisé pour le MVP (doit permettre d'editer la pp de profil)


  export default function ProfilScreen(props) {
    
    const [avatar, setAvatar] = useState(require("../assets/avatars/avatarDefault.png"))

    var ProfilPic = ProfilPicture(avatar);
    var header = Header2("DiscoverScreen","ChatScreen",props)
    var edit = Edit("EditPictureScreen", onPress)

    function onPress(redirection){
        props.navigation.navigate(redirection); 
    }

      
    const [dataPseudo, setDataPseudo] = useState("..");
    const [dataPlatform, setDataPlatform] = useState([]);
    const [dataGames, setDataGames] = useState([]);
  
    var token = ""

  //* récupération du token du users pour pouvoir utiliser la comparaison de match
  
  AsyncStorage.getItem("users", function(error, data) {
    console.log("data", data);
    token = data
   });
   
   useEffect(() => {
    async function loadData() {
      
    var rawDataMyProfil = await fetch(
      "http://192.168.1.21:3000/users/getmyprofil",
      { method: "PUT",
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `token=${token}`,
      })
      
      var dataMyProfil = await rawDataMyProfil.json();
      setMyProfil(dataMyProfil)

    }
    loadData(); 

  }, []);
  
    var test = dataPlatform.map((plateforme, i) => {
      return <Text key={i} style={styles.text2}>{plateforme.plateforme}</Text>;
    });
  
    var image = dataGames.map ((image, j ) => {
      return   <Image key={j}
                source={{
                  uri: image.image,
                }}
                style={styles.image}
              ></Image>
           
    });
  
  
    return (
  
      <ImageBackground
        resizeMode="cover"
        style={styles.background}
        source={require("../assets/backgrounds/fond_buddy.png")}>
  
        {header}
    
        <View style={styles.container}>
          {ProfilPic}
          {edit}
  
          <View style={styles.containerText}>
            <Text style={styles.text1}>{dataPseudo}</Text>
            <View style={styles.plateforme}>{test}</View>
            <Text style={styles.text3}>
              Salut c'est Matth, j'aime les nachos et jouer de l'harmonica Alsacien... (c'est faux).
             
            </Text>
          </View>
  
          {/* View pour les images de mood --> les mettre en ligne  */}
          <View style={styles.emoji}>
            <Image source={require("../assets/emojis/chill.png")}></Image>
            <Image source={require("../assets/emojis/civilise.png")}></Image>
            <Image source={require("../assets/emojis/competitif.png")}></Image>
            <Image source={require("../assets/emojis/normal.png")}></Image>
            <Image source={require("../assets/emojis/rageux.png")}></Image>
          </View>
  
          {/* View pour les images de jeux / les mettre en lignes --> envisager un caroussel */}
          <ScrollView style={styles.scroll} horizontal={true}>
            {image}
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
  
  const styles = StyleSheet.create({
  
    background: {
  
      height: "100%",
    },
  
    container: {
      
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  
    containerText: {
  
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",

    },
  
    text1: {
      fontWeight: "bold",
      fontSize: 26,
      letterSpacing: 0.5,
      color: "#372C60",

    },
  
    text2: {
      fontWeight: "200",
      fontSize: 16,
      letterSpacing: 0.5,
      color: "#372C60",
   
    },
  
    text3: {
      fontWeight: "400",
      fontSize: 18,
      fontStyle: "italic",
      letterSpacing: 0.5,
      color: "#372C60",
     
      textAlign: "center",
      marginLeft: 40,
      marginRight: 40,
    },
  
    emoji: {
  
      flexDirection: "row",
      marginTop: 150,
      marginBottom:50,
    },
  
    scroll: {
      marginRight: 10,
      marginLeft: 20,
    },
  
    GameName: {
      paddingLeft: 15,
      marginTop: 15,
      marginBottom: 15,
      paddingBottom: 15,
      fontSize: 16,
      borderBottomColor: "#f194ff",
      borderBottomWidth: 1,
      height: 60,
    },
    image:{
      height:100,
      width:100,
      marginRight: 20,
      marginLeft: 20,
    },
    plateforme:{
      flexDirection:"row",
   
      width: 300,
      justifyContent: "space-evenly"
    }
  
  });
  