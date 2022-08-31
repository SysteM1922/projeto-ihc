import React from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity,Button, Alert } from 'react-native';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Metodos from './Metodos'


const showAlert = () =>
  Alert.alert(
    "",
    "Pretende Efetuar o Pagamento?",
    [
      {
        text: "Cancelar",
         style: 'destructive',
        onPress: () => Alert.alert("Pagamento Cancelado"),
      
      },
       {
        style: 'cancel',
        text: "Sim",
        onPress: () => Alert.alert("Pagamento Efetuado"),
      
      },
    ],
  );


export default function () {
  return (
    <View style={styles.container}>
        <Text style={styles.textTitle}>Dados de Pagamento</Text>
      <Metodos></Metodos>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  textTitle: {
    fontSize: 40,
    color: 'grey',
    padding: 20,
   
  },
});
