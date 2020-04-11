import React from 'react';
import {View,Text} from 'react-native';

export default function Testing({route}){

    const {user} = route.params;
    return(
        <View>
            <Text>user : {JSON.stringify(user)}
            </Text>
        </View>


        
    )
};