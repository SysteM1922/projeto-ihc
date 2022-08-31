import React from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { data } from './DataBase';
import Constants from 'expo-constants';
import Mapa from './Mapa';
import * as ScreenOrientation from 'expo-screen-orientation';
import Compra from './Compra';
import Cartoes from './Cartoes';
import Pagamentos from './Pagamentos';

const cartoes = [
  {
    title: 'Cartão 1',
    trajeto: 'Aveiro-Ovar',
    nr: 2,
  },
  {
    title: 'Cartão 2',
    trajeto: 'Salreu-Espinho',
    nr: 4,
  },
  {
    title: 'Cartão Joel',
    trajeto: 'Cacia-Silvalde',
    nr: 10,
  },
];

export function getCards(){
  return cartoes;
}

export function validar(index) {
  cartoes.map((item, idx) => {
    if (idx === index) {
      if (item.nr != 0) item.nr -= 1;
      if (item.nr === 0) item.trajeto = 'Nenhum';
    }
  });
}

export function mudar(title, index) {
  cartoes.map((item, idx) => {
    if (idx === index) {
      item.title = title;
    }
  });
}

export function addCartao(ttle) {
  cartoes.push({
    title: 'Cartão ' + (cartoes.length + 1),
    trajeto: 'Nenhum',
    nr: 0,
  });
}

export function getTitle(index) {
  var ret = '';
  cartoes.map((item, idx) => {
    if (idx === index) {
      ret = item.title;
    }
  });
  return ret;
}

ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

function CartoesViagens() {
  return (
    <View style={styles.container2}>
      <Cartoes data={cartoes} />
    </View>
  );
}



const Drawer = createDrawerNavigator();

export default function () {
  return (
    <NavigationContainer>
      <View style={styles.statusBar}>
        <StatusBar translucent barStyle="dark-content" />
      </View>
      <Drawer.Navigator
        initialRouteName="App"
        drawerStyle={{
          backgroundColor: '#313131',
          paddingVertical: 20,
        }}
        drawerContentOptions={{
          activeBackgroundColor: '#fff',
          inactiveTintColor: '#fff',
        }}>
        <Drawer.Screen
          name="Cartões de Viagem"
          component={Cartoes}
          options={{
            headerTintColor: '#FFF',
            headerStyle: {
              backgroundColor: '#74b751',
            },
            drawerLabel: ({ focused }) => (
              <Text style={{ color: focused ? '#74b751' : '#000000' }}>
                Cartões de Viagem
              </Text>
            ),
            drawerIcon: ({ focused }) => (
              <MaterialIcons
                color={focused ? '#74b751' : '#000000'}
                name="account-balance-wallet"
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Horários / Comprar Viagens"
          component={Compra}
          options={{
            headerTintColor: '#FFF',
            headerStyle: {
              backgroundColor: '#74b751',
            },
            drawerLabel: ({ focused }) => (
              <Text style={{ color: focused ? '#74b751' : '#000000' }}>
                Horários / Comprar Viagens
              </Text>
            ),
            drawerIcon: ({ focused }) => (
              <FontAwesome
                color={focused ? '#74b751' : '#000000'}
                name="ticket"
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Mapa"
          component={Mapa}
          options={{
            headerTintColor: '#FFF',
            headerStyle: {
              backgroundColor: '#74b751',
            },
            drawerLabel: ({ focused }) => (
              <Text style={{ color: focused ? '#74b751' : '#000000' }}>
                Mapa
              </Text>
            ),
            drawerIcon: ({ focused }) => (
              <FontAwesome color={focused ? '#74b751' : '#000000'} name="map" />
            ),
          }}
        />
        <Drawer.Screen
          name="Métodos de Pagamento"
          component={Pagamentos}
          options={{
            headerTintColor: '#FFF',
            headerStyle: {
              backgroundColor: '#74b751',
            },
            drawerLabel: ({ focused }) => (
              <Text style={{ color: focused ? '#74b751' : '#000000' }}>
                Métodos de Pagamento
              </Text>
            ),
            drawerIcon: ({ focused }) => (
              <FontAwesome
                color={focused ? '#74b751' : '#000000'}
                name="credit-card"
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
  container2: {
    flex: 1,
  },
});
