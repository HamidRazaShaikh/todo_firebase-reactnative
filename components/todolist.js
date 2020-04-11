import React from 'react';
import firestore from '@react-native-firebase/firestore';


import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';



export default class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todo: '',
      todoData: [],
      edit: false,
      index: null,
    };
  }









  addTodo = () => {
    

    
    firestore()
      .collection('Users')
      .add({
       todo: this.state.todo,
        
      })
      .then(() => {
        console.log('todo added');
      });
  };

  opacityTouch = (item) => {
    console.log(item);
    return Alert.alert('Choose what to do?', 'Please select an option.', [
      {
        text: 'Edit',
        onPress: () => {
          this.editTodo(item);
        },
      },
      {text: 'Delete', onPress: () => this.deletetodo(item)},
    ]);
  };

  deletetodo = ({key}) => {
    var conso = this.state.todoData.filter((item) => item.key !== key);
    this.setState({todoData: conso});
  };

  editTodo = ({key}, i) => {
    this.setState({edit: true});
    var conso = this.state.todoData.filter((item) => item.key === key);
    this.setState({todo: conso[0].todo});
    var ind = this.state.todoData.findIndex((item) => item.key === key);
    console.log(ind);
    this.setState({index: ind});
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="blue" barStyle="light-content" />

        <View style={styles.inputView}>
          
          <TextInput
            style={styles.input}
            value={this.state.todo}
            onChangeText={(todo) => this.setState({todo})}
            placeholder={'type your todo.....'}
          />
        </View>
        <View>
          <Button
            title={this.state.edit ? 'add edited todo' : 'add todo'}
            color="#e93766"
            onPress={this.addTodo}
          />
        </View>

        <FlatList
          data={this.state.todoData}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.opacity}
              onPress={() => this.opacityTouch(item)}>
              <Text style={styles.listText}>{item.todo}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.key}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
  },
  inputView: {},
  input: {
    fontSize: 20,
    fontStyle: 'italic',
  },
  listText: {
    fontSize: 20,
    color: '#e93766',
    padding: 10,
  },
  list: {},
  opacity: {
    borderBottomWidth: 1,
    margin: 3,
  },
});
