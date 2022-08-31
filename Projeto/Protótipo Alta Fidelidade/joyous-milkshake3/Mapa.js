import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

export default function () {
  return (
    <View style={styles.container}>
      <View style={styles.zoomWrapper}>
        <ReactNativeZoomableView
          zoomEnabled={true}
          maxZoom={2}
          minZoom={1}
          zoomStep={0.25}
          initialZoom={1}
          bindToBorders={true}
          onZoomAfter={this.logOutZoomState}>
          <ImageBackground
            source={require('./Images/mapa.png')}
            style={styles.image}
            resizeMode="stretch"
          />
        </ReactNativeZoomableView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  zoomWrapper: {
    flex: 1,
    overflow: 'hidden',
  },
  zoomableView: {
    padding: 10,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
