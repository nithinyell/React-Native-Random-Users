/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  FlatList,
  Button,
  Image,
} from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const App: () => React$Node = () => {

  const Stack = createStackNavigator();

  function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{padding: 20, fontWeight: 'bold', fontSize: 22}}>Hello User</Text>
        <Button title={"Log In"} onPress={() => {
          navigation.navigate("Users")
        }} ></Button>
      </View>
    );
  }

  function DetailsScreen({ navigation }) {
    
    const [userData, setUserData] = useState([])

    useEffect(() => {
      console.warn(
        getUsers().then((results) => {
          setUserData(results)
        }),
      );
    }, []);

    function getUsers() {
      return fetch('https://randomuser.me/api/?results=25')
        .then((response) => response.json())
        .then((json) => {
          return json.results;
        })
        .catch((error) => {
          console.error(error);
        });
    }

    return(
        <FlatList
        data={userData}
        renderItem={({ item }) => 
        <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 5, borderBottomColor: 'tomato', borderBottomWidth: 0.5, alignItems: 'center'}}>
            <Image source={{uri: item.picture.large}} style={{width: 75, height: 75, borderRadius: 75/2}}></Image>
            <Text style={{marginLeft: 15, fontWeight: '900', fontSize: 16}}>{item.name.first} {item.name.last}</Text>
          </View>
        }
        keyExtractor={(item, index) => index.toString()}
      />
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Users" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
