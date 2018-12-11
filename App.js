import React from 'react';
import { FlatList } from 'react-native';
import { Container, ListItem, Button, Text, Right, CardItem, Body, Input, Card } from 'native-base';
import axios from 'axios';

export default class App extends React.Component {
  constructor(){
    super();
    this.state={set:'',data:[]};
  }

  componentDidMount(){
    const self = this;
    axios.get('https://jsonplaceholder.typicode.com/todos')
    .then(function(response){
      self.setState({data: response.data});
      console.log(response);
    })
    .catch(function(error){
      console.log(error);
    });  
  }

  addTask=()=>{
    const self = this;
    // axios.post('https://jsonplaceholder.typicode.com/todos')
    // .then(function(response){
      itext = self.state.set;
      if(itext.length>0){
        texti = self.state.data.concat([itext]);
        self.setState({data:texti});
        self.setState({set:''})
      } else{
        alert('Please input your to do.')
      }  
    //   console.log(response);
    // })
    // .catch(function(error){
    //   console.log(error);
    // });
  }

  set(text){
    this.setState({set:text});
  }    

  delete(i){
    const self = this;
    // axios.delete('https://jsonplaceholder.typicode.com/todos')
    // .then(function(response){
      data = self.state.data.slice();
      data.splice(i,1);
      self.setState({data:data});
    //   console.log(response);
    // })
    // .catch(function(error){
    //   console.log(error);
    // });  
  }

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
      keyExtractor={(item, index)=>index.toString()}
        inverted={true}
        data={this.state.data}
        renderItem={
          ({item, index}) =>
          <ListItem onLongPress={()=>this.delete(index)}>
            <Text>{item.title}</Text>
          </ListItem>
        }
      />
      </Card>
      </Container>
    )
  }
}