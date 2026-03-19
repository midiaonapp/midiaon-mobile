import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
export default function HomeScreen({ route, navigation }: any) {
  return <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><Text> 22 Bem vindo, {route.params.userName}</Text><TouchableOpacity onPress={() => navigation.replace('Login')}><Text>Sair</Text></TouchableOpacity></View>;
}
