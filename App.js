import React from 'react';
import { FlatList } from 'react-native';
import { Container, ListItem, Button, Text, Right, CardItem, Body, Input, Card } from 'native-base';

export default class App extends React.Component {
  // constructor(){
  //   super();
  //   this.state={set:'',data:[]};
  // }

  // addTask=()=>{
  //   set = this.state.set;
  //   if(set.length>0){
  //     data = this.state.data.concat([set]);
  //     this.setState({data:data});
  //     this.setState({set:''})
  //   } else{
  //     alert('Please input your to do.')
  //   }
  // }

  // set(text){
  //   this.setState({set:text});
  // }

  // delete(i){
  //   data = this.state.data.slice();
  //   data.splice(i,1);
  //   this.setState({data:data});
  // }

  render() {
    return(
      <Container>
      <Card>
      <CardItem>
        <Body>
          <Input
          onChangeText={(text)=>this.set(text)}
          value={this.state.set}
          placeholder='Type Here. . .'/>
        </Body>
        <Right>
          <Button
          onPress={this.addTask}>
            <Text>Input</Text>
          </Button>
        </Right>
      </CardItem>
      </Card>
      <Card>
      <FlatList
        data={this.state.data}
        renderItem={
          ({item, index}) =>
          <ListItem onLongPress={()=>this.delete(index)}>
            <Text>{item}</Text>
          </ListItem>
        }
      />
      </Card>
      </Container>
    )
  }
}