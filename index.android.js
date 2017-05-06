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
  TouchableOpacity,
} from 'react-native';

const dificultyLevels = [
    {name:'Beter', level:1},
    {name:'Kötü', level:2},
    {name:'Eh', level:3},
    {name:'Orta', level:4},
    {name:'İyi gibi', level:5},
    {name:'İyi', level:6},
    {name:'Daha iyi', level:7},
    {name:'Güzel', level:8},
    {name:'Deneyimli', level:9},
    {name:'Efsane', level:10}
]
export default class balancy extends Component {
    constructor(){
        super();
        this.state={
            form_nameField: "",
            form_levelField: 3,
            team1sum:0,
            team2sum:0,
            all:[{name:'a', level:1},{name:'b', level:2},{name:'c', level:3},{name:'d', level:4},{name:'f', level:5}],
            team1:[{name:'Bu Takım Boş', level:0}],
            team2:[{name:'Bu Takım da Boş', level:0}/*{name:123, level:1},{name:123, level:1},{name:123, level:1},{name:123, level:1}*/],
        }
    }
    teamMemberItem(entry){
        const teamBackgroundColors = ['#e8e8e8','#c7ffb7','#d6ffb7','#e7f9b3','#f6f9b3','#f9f2b3','#f9e7b3','#f9d8b3','#f9c5b3','#f9b3b3','#ff8e8e']
        return(
            <View style={[styles.teamItemStyle,{backgroundColor:teamBackgroundColors[entry.item.level]}]}>
                <Text >{entry.item.name}</Text>                
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
        this.setState({team1:team1 , team2:team2 , team1sum:team1sum, team2sum:team2sum});
    }
    render() {
        return (
            <KeyboardAvoidingView>
                <ScrollView  bounces={true} >

                    <View  style={styles.addNewItemContainer}>
                        <TextInput
                            style={{height: 40, flex: 2}}
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
                        <TouchableOpacity onPress={this.addNewItem.bind(this)}>
                            <View style = {styles.addButton} >
                                <Text style={{color:'#212121', textAlign:'center'}} fontSize={20}>+</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <Text style={{fontSize:20, textAlign:'center',}}>Oluşturulan Takımlar</Text>
                    
                    <View style={styles.teamPointResultsContainer}>
                        <View style={[styles.teamHeaderStyle,{backgroundColor:'#ccfff9'}]}>
                            <Text>1.Takım</Text>
                        </View>
                        <View style={[styles.teamHeaderStyle,{backgroundColor:'#fcccff'}]}>
                            <Text>2.Takım</Text>
                        </View>
                    </View>
                    
                    <View style={styles.teamsContainer}>
                        <FlatList style={styles.teamStyle} data={this.state.team1} renderItem={this.teamMemberItem} keyExtractor={(item, index) => item.name + ':' + index}/>
                        <FlatList style={styles.teamStyle} data={this.state.team2} renderItem={this.teamMemberItem} keyExtractor={(item, index) => item.name + ':' + index}/>
                    </View>
                    
                    <Text style={{fontSize:12, textAlign:'center',}}>Toplam Güç</Text>
                    
                    <View style={styles.teamPointResultsContainer}>
                        <View style={[styles.teamFooterStyle,{backgroundColor:'#ccfff9'}]}>
                            <Text>{this.state.team1sum}</Text>
                        </View>
                        <View style={[styles.teamFooterStyle,{backgroundColor:'#fcccff'}]}>
                            <Text>{this.state.team2sum}</Text>
                        </View>
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
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:5,
        margin:5,
    },
    teamHeaderStyle:{
        flex:1,
        borderTopLeftRadius:16,
        borderTopRightRadius:16,
        borderBottomLeftRadius:8,
        borderBottomRightRadius:8,
        paddingHorizontal:5,
        paddingVertical:8,
        margin:5,
        alignItems:'center',
    },
    teamHeaderTextStyle:{
        fontSize:16,
    },
    teamPointResultsContainer:{
        flex:1,
        flexDirection:'row'
    },
    teamFooterStyle:{
        flex:1,
        borderTopLeftRadius:8,
        borderTopRightRadius:8,
        borderBottomLeftRadius:16,
        borderBottomRightRadius:16,
        paddingHorizontal:5,
        paddingVertical:8,
        margin:5,
        alignItems:'center',
    },
    addButton:{
        backgroundColor: '#388E3C',
        padding: 10,
        width:50,
        height:50,
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center',

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
