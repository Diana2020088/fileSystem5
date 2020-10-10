import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ImageBackground } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher'; // its just suitable with android (using android simulator on this project )

const Separator = () => (
  <View style={styles.separator} />
);
const image = require('./back.jpg');

export default function App() {

  const [data, setData] = React.useState('Keeping memories!');
  let [content, setContent] = React.useState(''); 

  const saveContent = async () => {      // --> the function is going to be executed every time whe press button to save
    const directory = FileSystem.documentDirectory + 'fileApp.txt'; // --> create a new file
    await FileSystem.writeAsStringAsync(directory, content, { encoding: 'utf8'})
    const reading = await FileSystem.readAsStringAsync(directory, { encoding: 'utf8'}) // --> to read the text that has been wrotten
    //console.log(directory); //--> the console print the path where the file was created 
    //console.log(reading)  // --> the console print tue result once we run the project (npm start) 
    //setData(reading);  // --> is goiing to read (phone) what we have written in file which is store in the directory 

    setData(reading)
    
    //--> in order to open the file in another app, "expo install expo-intent-launcher" has to be install
    FileSystem.getContentUriAsync(directory).then(cUri => {
      console.log(cUri);
      IntentLauncher.startActivityAsync('android.intent.action.VIEW', {  
        data: cUri,
        flags: 1, 
      });
    }); 
    
    // <--

  }

  return (
    
  <ImageBackground source={image} style={styles.image}>
    <View style={styles.container}>
    <Text style={styles.title}>{data}</Text> 
    <StatusBar style="auto"/>
    <Separator/>

    <TextInput
    style={styles.textInput}
    onChangeText={content => setContent(content)}
    value={content}/>
    <Separator/>

    <Button onPress={saveContent} title = "save" color='green'/>
    </View>
  </ImageBackground>
 
  );
}

//--> From line 63 to 96 contains the style of the APP

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
    color: 'black',
    fontSize: 20,
    letterSpacing: 2,
    textDecorationColor:'#fff',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textInput:{
    height: 60, 
    borderColor: 'gray', 
    borderWidth: 1, 
    width: 225,
    fontSize: 20,
    fontFamily: 'Roboto',
    letterSpacing: 1,
  },
  image: {
    width:'100%',
    height:'100%',
  },

});
