import React from 'react';
import auth from '@react-native-firebase/auth';
import {StyleSheet, Text, TextInput, View, Button, Alert} from 'react-native';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount (){

    auth().onAuthStateChanged((user)=>{
      this.setState({auth : user.email})

    })

  }

  handleLogin = () => {
    if (this.state.email !== '' && this.state.password !== '') {
      auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => this.props.navigation.navigate('Testing' , { user : this.state.auth}))
        .catch((error) => console.log(error));
      this.setState({email: '', password: ''});
    } else {
      Alert.alert('Oops!', 'Please fill in the respective fields.');
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={{color: '#e93766', fontSize: 40}}>Login</Text>

        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />
        <Button title="Login" color="#e93766" onPress={this.handleLogin} />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    fontSize: 20,
    width: '90%',
    borderColor: '#9b9b9b',
    borderBottomWidth: 1,
    marginTop: 8,
    marginVertical: 15,
  },
});
