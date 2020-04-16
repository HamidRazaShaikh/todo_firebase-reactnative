import React, {useState, useEffect} from 'react';
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

export default function Testing({route}) {
  const [todo, settodo] = useState('');
  const [todoData, settodoData] = useState([]);
  const {user} = route.params;

  useEffect(() => {
    firestore()
      .collection(JSON.stringify(user))
      .onSnapshot(querySnapshot => {
        const todo = [];
        querySnapshot.forEach(doc => {
          todo.push({
            todo: doc.data().todo.todo,
            key: doc.id,
          });
        });
        
        settodoData(todo)


      });
  });

  function handleAddTodo() {
    firestore()
      .collection(JSON.stringify(user))
      .add({
        todo: todo,
      })
      .then(() => {
        console.log('document written');
      });
    // console.log(todoData);
  }

  return (
    <View>
      <TextInput
        style={styles.input}
        value={todo}
        onChangeText={todo => settodo({todo})}
        placeholder={'type your todo.....'}
      />

      <View>
        <Button title={'add todo'} color="#e93766" onPress={handleAddTodo} />

        <FlatList
          data={todoData}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.opacity}
              onPress={() => this.opacityTouch(item)}>
              <Text style={styles.listText}>{item.todo}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
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
