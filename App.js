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

    itext = self.state.set;
    if(itext.length>0){
      id = Math.max(...self.state.data.map((data) => data.id))+1;
      axios.post('https://jsonplaceholder.typicode.com/todos',{
        userId: 1,
        id: id,
        title: itext,
        completed: false      
      })
      .then(function(response){
        texti = self.state.data.concat({userId:11,id:id,title:itext,completed:false});
        self.setState({data:texti});
        self.setState({set:''})
        console.log(response);
      })
      .catch(function(error){
        console.log(error);
      });
    } else {
      alert('Please input your to do.')
    }  
  }

  set(text){
    this.setState({set:text});
  }    

  delete(i,id){
    const self = this;
    index = self.state.data.indexOf(i);
    // axios.delete('https://jsonplaceholder.typicode.com/todos')
    // .then(function(response){
      data = self.state.data.slice();
      data.splice(index,1);
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
        data={this.state.data.sort((a, b) => b.id-a.id)}
        renderItem={
          ({item, index}) =>
          <ListItem onLongPress={()=>this.delete(item,item.id)}>
            <Text>{item.title}</Text>
          </ListItem>
        }
      />
      </Card>
      </Container>
    )
  }
}