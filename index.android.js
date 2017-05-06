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
  TouchableHighlight,
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
            all:[{name:'a', level:1},{name:'b', level:2},{name:'c', level:3},{name:'d', level:4},{name:'f', level:5}],
            team1:[],
            team2:[{name:123, level:1},{name:123, level:1},{name:123, level:1},{name:123, level:1}],
        }
    }
    teamMemberItem(entry){
        return(
            <View style={styles.teamItemStyle}>
                <Text>{entry.index + 1}</Text>
                <Text>{entry.item.name}</Text>                
            </View>
        )
    }
    addNewItem(){
        console.log(this.state)
        var item = {};
        if(!this.state.form_nameField){
            alert("İsim girmeyi unuttunuz!")
            return;
        }
        item.name = this.state.form_nameField;
        item.level = this.state.form_levelField;
        var _all = this.state.all;
        _all.push(item);
        _all = _all.sort((a,b)=>{return(b.level-a.level)});//ascending order
        this.setState({all:_all});
        this.calculateTeams(_all);
    }
    calculateTeams(all){
        team1 = [];
        team2 = [];
        team1sum = 0;
        team2sum = 0;
        all.forEach((item) => {
            console.log(item);
            if(team1.length < team2.length){
                team1.push(item);
                team1sum += item.level;
            }
            else if(team1.length > team2.length){
                team2.push(item);
                team2sum += item.level;
            }
            else{
                if(team1sum > team2sum){
                    team2.push(item);
                    team2sum += item.level;
                }
                else{
                    team1.push(item);
                    team1sum += item.level;
                }
            }
        })
        this.setState({team1:team1})
        this.setState({team2:team2})
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
                        <TouchableHighlight onPress={this.addNewItem.bind(this)}>
                            <View style = {styles.addButton} >
                                <Text>+</Text>
                            </View>
                        </TouchableHighlight>
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
  addNewItemContainer:{
    flexDirection:'row',
    flex:1,
    padding:5,
    margin:5,
    backgroundColor:'#C8E6C9',
    borderRadius:7,

  },
  teamsContainer:{
      flex:1,
      flexDirection:'row',
  },
  teamStyle:{
    flex:1,
  },
  teamItemStyle:{
      flexDirection:'row',
  },
  addButton:{
    flex:0.5,
    backgroundColor: '#388E3C',
    padding: 10,
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
