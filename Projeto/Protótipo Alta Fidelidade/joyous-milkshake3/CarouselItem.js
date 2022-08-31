import * as React from 'react';
import { ParallaxImage } from 'react-native-snap-carousel';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Platform,
  Button,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export default function CarouselItem({ item, index }, parallaxProps) {
  return (
    <SafeAreaView style={styles.item}>
      <View style={styles.image}>
        <View style={styles.container}>
          <Text style={styles.title}>{item.title}</Text>
        </View>

        <ParallaxImage
          containerStyle={styles.imageContainer}
          source={require('./Images/Meteo.png')}
          style={styles.image}
          {...parallaxProps}
        />

        <Text style={styles.image2}>
          {'Trajeto:\n' +
            item.trajeto +
            '\n\nNº de Viagens\nRestantes: ' +
            item.nr}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: screenWidth * 1.3,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 20,

    marginBottom: Platform.select({ ios: 0, android: 1 }),
  },
  title: {
    fontSize: screenWidth / 14,
    fontWeight: 'bold',
    color: '#34623F',
    //color: '#1E2F23',
    // F6511D
    // FFB400
    // 86BBD8
    // F6AE2D
  },
  container: {
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
  image2: {
    fontSize: screenWidth / 13,
    color: 'white',
    fontWeight: 'bold',
    paddingTop: 10,
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
    marginTop: screenWidth / 8,
    marginLeft: screenWidth / 15,
  },
});
