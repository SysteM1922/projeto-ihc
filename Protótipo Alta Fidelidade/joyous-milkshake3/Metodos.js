import React, { useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const DATA = [
  {
    id: "123",
    title: "Cartao de débito",
    icon: "credit-card"
  },
  {
    id: "abc@gmail.com",
    title: "PayPal",
    icon: "paypal"
  },
  {
    id: "666942000",
    title: "MBWAY",
    icon: "mobile-phone"
  },
];

const Item = ({ item, onPress, borderWidth, textColor }) => (

  <TouchableOpacity onPress={onPress} style={[styles.roundButton, borderWidth]}>
  
    <Text style={[styles.title, textColor]}>{item.title} <FontAwesome name ={item.icon} size={20} ></FontAwesome></Text>
    <Text>{item.id}</Text>
  
  </TouchableOpacity>
);

const App = () => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const  borderWidth = item.id === selectedId ? 2 : 0;
    const color = item.id === selectedId ? '#308F3E' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        borderWidth={{ borderWidth }}
        textColor={{ color }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },

  title: {
    fontSize: 20,
  },
  roundButton: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 0,
    borderColor: '#74b751',
    backgroundColor: 'white',
    borderRadius: 20,
  },
});

export default App;