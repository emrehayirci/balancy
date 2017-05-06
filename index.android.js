/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Picker,
  KeyboardAvoidingView,
  Button,
  FlatList,
} from 'react-native';

const dificultyLevels = [
    {name:'Kötü', level:1},
    {name:'Eh', level:2},
    {name:'Orta', level:3},
    {name:'İyi', level:4},
    {name:'Efsane', level:5}
]

export default class balancy extends Component {
    constructor(){
        super();
        this.state={
            form_nameField: "",
            form_levelField: 3,
            team1:[{name:123, level:1},{name:123, level:1},{name:123, level:1},{name:123, level:1},{name:123, level:1}],
            team2:[{name:123, level:1},{name:123, level:1},{name:123, level:1},{name:123, level:1}],
        }
    }

    teamMemberItem(entry){
        return(
            <View>
                <Text>{entry.index + 1}</Text>
                <Text>{entry.item.name}</Text>                
            </View>
        )
            

    }

    render() {
        return (
            <KeyboardAvoidingView>
                <ScrollView bounces={true} >


                    <View  style={styles.addNewItemContainer}>
                        <TextInput
                            style={{height: 40, flex: 3}}
                            onChangeText={(text) => this.setState({form_nameField : text})}
                            value={this.state.form_nameField} placeholder={"İsim"}
                        />
                        <Picker  style={styles.levelField} selectedValue={this.state.form_levelField} onValueChange={(item) => this.setState({form_levelField: item})}> 
                            {dificultyLevels.map((item)=>{
                                return(
                                    <Picker.Item label={item.name} value={item.level} />
                                )
                            })}
                        </Picker>
                        <Button style = {styles.addButton} title=" + " color="#841584"  />
                    </View>

                    <Text>Oluşturulan Takımlar</Text>
                    <View style={styles.teamsContainer}>
                        <FlatList style={styles.teamStyle} data={this.state.team1} renderItem={this.teamMemberItem}/>
                        <FlatList style={styles.teamStyle} data={this.state.team2} renderItem={this.teamMemberItem}/>
                    </View>
          
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  addNewItemContainer:{
    flexDirection:'row',
    padding:5,
    flex:1,
  },
  teamsContainer:{
      flex:1,
      flexDirection:'row',
  },
  teamStyle:{
    flex:1,
  },
  addButton:{
    flex:0.5,
    padding: 10
  },
  levelField:{
    flex:1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('balancy', () => balancy);
