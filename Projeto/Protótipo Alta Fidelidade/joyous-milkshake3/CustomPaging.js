import * as React from 'react';
import { StyleSheet} from 'react-native';
import { Pagination } from 'react-native-snap-carousel';

export default function CustomPaging({ data, activeSlide }) {
  const settings = {
    dotsLength: data.length,
    activeDotIndex: activeSlide,
    dotStyle: styles.dotStyle,
    inactiveDotStyle: styles.inactiveDotStyle,
    inactiveDotOpacity: 0.4,
    inactiveDotScale: 0.6,
  };
  return <Pagination {...settings} />;
}
const styles = StyleSheet.create({
  inactiveDotStyle: {
    borderWidth: 1,
  },
})