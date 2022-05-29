import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import {Header} from 'react-native-elements'
import dictionary from './database'

// You can import from local files

// or any pure javascript modules available in npm
export default class HomeScreen extends React.Component{
  constructor(){
    super();
    this.state = {
      text: '',
      isSearchPressed: false,
      word: '',
      lexicalCategory: '',
      examples: [],
      definition: ''
    }
  }
  getWord = (word) =>{
    var searchKeyword = word.toLowerCase();
    try{
    var definition = dictionary[searchKeyword]['definition'];
    var lexicalCategory = dictionary[searchKeyword]['lexicalCategory']
      this.setState({
            "word": searchKeyword,
            "definition": definition,
            "lexicalCategory": lexicalCategory
      })
    }
    catch(error){
      this.setState({
        "word": searchKeyword,
        "definition": "Not Found",
        "lexicalCategory": "Not Found"
      })
    }
  }
  render(){
    if (this.state.definition === '' && !this.isSearchPressed){
      return(<View style = {styles.container}>
        <Header
          backgroundColor={'#6600FF'}
          centerComponent={{
            text: 'Pocket Dictionary',
            style: { color: '#FFF', fontSize: 20 },
          }}
        />
        <TextInput
          style = {styles.textInput}
          onChangeText = {text => {
            this.setState({
              text: text,
              isSearchPressed: false,
              word: "",
              examples: [],
              definition: ''
            });
          }}
          value = {this.state.text}
          placeholder = {'Enter your word here...'}
        />
        <TouchableOpacity style = {styles.searchButton} onPress = {() =>{
          this.setState({ isSearchPressed: true });
          this.getWord(this.state.text);
        }}><Text style = {styles.buttonText}>Search</Text></TouchableOpacity>
        </View>
        );
    }
    else if (this.state.definition == ' ' && this.isSearchPressed){
      this.setState({
        word: 'Loading...',
        definition: 'Loading...'
      })
    }
    return(
      <View style = {styles.container}>
        <Header
          backgroundColor={'#6600FF'}
          centerComponent={{
            text: 'Pocket Dictionary',
            style: { color: '#FFF', fontSize: 20 },
          }}
        />
        <TextInput
          style = {styles.textInput}
          onChangeText = {text => {
            this.setState({
              text: text,
              isSearchPressed: false,
              word: "",
              examples: [],
              definition: '',
              lexicalCategory: ''
            });
          }}
          value = {this.state.text}
          placeholder = {'Enter your word here...'}
        />
        <TouchableOpacity style = {styles.searchButton} onPress = {() =>{
          this.setState({ isSearchPressed: true });
          this.getWord(this.state.text);
        }}><Text style = {styles.buttonText}>Search</Text></TouchableOpacity>
        <View>
          <Text style = {styles.label}>
          Word: {" "}
          </Text>
          <Text>
          {this.state.word}
          </Text>
        </View>
        <View>
          <Text style = {styles.label}>
          Definition: {" "}
          </Text>
          <Text>
          {this.state.definition}
          </Text>
        </View>
        <View>
          <Text style = {styles.label}>
          Type: {" "}
          </Text>
          <Text>
          {this.state.lexicalCategory}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#EAEAEA'
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    height: 25,
    width: '75%',
    marginTop: 20,
    marginLeft: 35,
  },
  searchButton:{
    borderRadius: 7.5,
    backgroundColor: 'aqua',
    width: 75,
    height: 30,
    marginLeft: 40,
    marginTop: 10
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
    marginTop: 5,
    fontWeight: 'bold'
  },
  label: {
    color: '#1ED5A0',
    fontWeight: 'bold'
  }
});