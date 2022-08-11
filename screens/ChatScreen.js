import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput,ScrollView,TouchableOpacity,FlatList,Image} from "react-native"
import { Button, ListItem,  } from 'react-native-elements';
import { connect } from 'react-redux';
import Header from "../components/cards/Header"


import OffsetMiniButton from '../components/buttons/OffsetMiniButton'
import ProfilPicture from "../components/cards/ProfilPicture"



function ChatScreen(props) { 

    let pseudo = "CowBeez";
    const header =  Header("RoomScreen",props) // changer la redirection pour page des conversations
    const [ text, setText] = useState('')
    const [ message, setMessage] = useState([])
    var send = OffsetMiniButton("Envoyer","NO", sendMessage)
    var socket = props.socket
    const [ currentRoom, setRoom] = useState('')
    let count  = [0,1,2,3,4,5]

    let id = props.id;

    useEffect(() => { 
      let data;

      let table = [];
      async function dataLoad () {
         var rawData = await fetch(`http://192.168.10.145:3000/message/messagerie?id=${id}`);
         data = await rawData.json()
         socket.emit('connected', data.message.room )
         setRoom(data.message.room)
       console.log(data.message.content);

         setMessage(data.message.content)
      }  
      dataLoad();

       }, []);

       useEffect(() => {
        socket.on('messageFromBack', (newMessage, userPseudo, date) => {
          
          setMessage([...message,{message : newMessage , pseudo : userPseudo, date : date}]) 
        });
        return()=>{
        socket.off('message')
        }
      }, [message]);
  
    async function sendMessage(){
      var date = new Date();
      socket.emit("message", currentRoom, text, pseudo);
       const data = await fetch('http://192.168.10.129:3000/message/send', {
        method: 'PUT',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `id=${id}&pseudo=${pseudo}&date=${date}&content=${text}`
      })
       setText('')
    }

console.log(message);

function chat(item){

  if(item.pseudo == pseudo){

   return(
    <View style={styles.bubbleUser}>
      <Text>{item.pseudo}</Text>
      <Text>{item.message}</Text>
      <Text>{item.date}</Text>
    </View>
   )
  }else{

    return(
      <View style={styles.bubbleMatch}>
        <Text>{item.pseudo}</Text>
        <Text>{item.message}</Text>
        <Text>{item.date}</Text>
      </View>
    )
    }
}

  return (

    <ImageBackground
      resizeMode="cover"
      style={styles.background}
      source={require('../assets/backgrounds/fond_buddy.png')}>
      {header}
      <View style={styles.chat}>
          <FlatList                            // <= à déjà une ScrollView
            data={message}                    // <= array requis
                // <= Key is used for caching and as the react key to track item re-ordering
            renderItem={({item}) => (          // <= Takes an item from data and renders it into the list
             chat(item)
            )}
          />
     </View>
     <View style={styles.sender}>
     <TextInput
              style={styles.input}
                  onChangeText={(message) => setText(message)}
                  value={text}
                  keyboardType="default"
                  placeholder=""
            />
     <View style={styles.ButtonSender}>
       {send}
       <TouchableOpacity style={styles.icon}><Image source={require('../assets/icons/discord_iconbuddy.png')} /></TouchableOpacity>
     </View>
     </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    height: "100%",
  },
  chat: {
    flex: 1,
    flexWrap: "wrap-reverse",
    marginRight: "-15%",
  },
  bubbleUser: {
    width: "80%",
    backgroundColor: "#DDABFE",
    marginTop: 20,
    marginBottom: 20,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    marginRight:230
  },
  bubbleMatch: {
    width: "80%",
    backgroundColor: "#FFA588",
    marginTop: 20,
    marginBottom: 20,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    marginRight: 10
  },
  sender: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth : 1,
    borderBottomColor: "#372C60",
  },
  input: {
    width : 300,
    height: 60,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    marginTop: 20,
    marginBottom: 24,
},
ButtonSender: {
  flexDirection: "row",
},
icon: {
  marginLeft: 40,
},

});


function mapStateToProps(state) {
  return { socket: state.socket, id : state.room, pseudo :state.pseudo };
}






export default connect(
  mapStateToProps,
  null
)(ChatScreen);




