/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Image, ScrollView} from 'react-native';
import {Container, Content, Card, CardItem, Thumbnail, Text, Button, Left, Body, Header, Item, Input, Icon} from 'native-base';
import axios from 'axios';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component {

  constructor(){
    super();
    this.state = {
      resto: [],
      
    }
  }

  componentDidMount(){
    var url ='https://developers.zomato.com/api/v2.1/search?q=kebab';

    var config ={
      headers:{'user-key':'6ff1cfa18e834e1de8af7b7920acb0a1'}
    }

    axios.get(url, config)
      .then((x) => {
        this.setState({
          resto: x.data.restaurants
        })
      })
  }
  
  
  render() {


   

      const data = this.state.resto.map((item, index) => {
        var gambar = item.restaurant.location.thumb

        return(
        
            <Card style={{flex:0}} key={index}>

              <CardItem>
                <Left>
                  <Thumbnail source={require('./kucing.jpg')}/>
                  
                  <Body>
                    <Text> {item.restaurant.name} </Text>
                    <Text note> {item.restaurant.location.city} </Text>
                    <Text> {item.restaurant.average_cost_for_two} </Text>
                  </Body>
                </Left>
              </CardItem>

              <CardItem>
                <Body>
                  <Image 
                    source={{uri: '{gambar}'}}
                    style={{height: 200, width: 370, flex: 1}}
                    />
                </Body>
              </CardItem>

              <CardItem>
                <Left>
                  <Button transparent textStyle={{color: '#87838B'}}>
                    <Icon name="thumbs-up"/>
                    <Text> {item.restaurant.location.address} </Text>
                  </Button>
                </Left>
              </CardItem>
            </Card>
        

        )

      })


    return (

      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="search"/>
            <Input 
              placeholder="Cari...."
              onChangeText={(inputUser) => this.setState({inputUser})}
              value={this.state.inputUser}
            />
          </Item>
        </Header>

        <Header>
          <Button 
            transparent 
            textStyle={{color: '#87838B'}}
          
          >
            <Text> LIHAT DAFTAR RESTO </Text>
          </Button>
        </Header>

        <ScrollView>
          <Content>
            {data}
          </Content>
      
        </ScrollView>

      </Container>


    );
  }
}