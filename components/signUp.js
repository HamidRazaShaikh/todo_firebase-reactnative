import React from 'react';
import auth from '@react-native-firebase/auth';
import {ActivityIndicator ,StyleSheet, Text, TextInput, View, Button, Alert} from 'react-native';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      auth : '',
      loading : false
    };
  }

  componentDidMount (){
    

    auth().onAuthStateChanged((user)=>{
      this.setState({auth : user.email})
      console.log(user)

    })



  }

  handleSignUp = () => {
    if (this.state.email !== '' && this.state.password !== '') {
      
      auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => this.props.navigation.navigate('Testing' , { user : this.state.auth}))
        .catch((error) => console.log(error));

        console.log(this.state.auth)
        this.setState({loading : true})

        
       
        

      this.setState({email: '', password: ''});
    } else {
      Alert.alert('Oops!', 'Please fill in the respective fields.');
    }
  };

  handleLogin = () => {
    this.props.navigation.navigate('Login');
    
  };
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={{color: '#e93766', fontSize: 40}}>Sign Up</Text>

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
        <Button title="Sign Up" color="#e93766" onPress={this.handleSignUp} />
        <View>
          <Text>
            {' '}
            Already have an account?{' '}
            <Text
              onPress={this.handleLogin}
              style={{color: '#e93766', fontSize: 18}}>
              {' '}
              Login{' '}
            </Text>
          </Text>
          {/* {this.state.loading ? <ActivityIndicator size="large" color="#0000ff" /> : null} */}
        </View>
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
