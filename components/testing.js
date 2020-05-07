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
  SnapshotViewIOS,
} from 'react-native';

export default function Testing({route}) {
  const [todo, settodo] = useState('');
  const [todoData, settodoData] = useState([]);
  const [Edit, setEdit] = useState(false);
  const [id, setid] = useState('');
  const {user} = route.params;
  const ref = firestore().collection(JSON.stringify(user));

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const todo = [];
      querySnapshot.forEach(doc => {
        todo.push({
          todo: doc.data().todo.todo,
          key: doc.id,
          time: doc.data().time,
        });
      });

      settodoData(todo);
    });
  });

  async function handleAddTodo() {
    if (Edit === false && todo !== '') {
      await ref
        .add({
          todo: todo,
          time: firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          console.log('document written');
        });
      settodo('');
      // console.log(todoData);
    } else if ( Edit === true && todo !== '') {
      await ref
        .doc(id)
        .update({
          todo: todo,
          time: firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          console.log('document written');
        });
      settodo('');
      setEdit(false);
      settodoData([]);
    }

    else  {
       Alert.alert('Oops!?', 'Please enter some todo...')

    
  }
  }
  opacityTouch = item => {
    return Alert.alert('Choose what to do?', 'Please select an option.', [
      {
        text: 'Edit',
        onPress: () => setEdit(true) & settodo(item.todo) & setid(item.key),
      },
      {
        text: 'Delete',
        onPress: () =>
          ref
            .doc(item.key)
            .delete()
            .then(() => console.log('deleted')),
      },
    ]);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        value={todo}
        onChangeText={todo => settodo({todo})}
        placeholder={'type your todo.....'}
      />

      <View>
        <Button
          title={Edit ? 'Update' : 'add todo'}
          color="#e93766"
          onPress={handleAddTodo}
        />

        <FlatList
          data={todoData}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.opacity}
              onPress={() => opacityTouch(item)}>
              <Text style={styles.listText}>{item.todo}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.key}
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
  timeText: {
    fontSize: 10,
    color: 'red',
    padding: 10,
  },
});
