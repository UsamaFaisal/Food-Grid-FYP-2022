import React from 'react';
import { View, Image, StyleSheet,Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
const { width, height } = Dimensions.get('window');
const images = [
  require('../assets/food.jpg'),
  require('../assets/food.jpg'),
  require('../assets/food.jpg'),
  require('../assets/food.jpg'),
];

const HomeCarousel = () => {
  const renderItem = ({ item }) => (
    <View >
      <Image source={item} style={styles.image}/>
    </View>
  );
  return (
    <Carousel
      data={images}
      renderItem={renderItem}
      sliderWidth={width}
      itemWidth={width * 0.8}
      layout={'default'}
      loop={true}
      autoplay={true}
      sliderHeight={height * 0.5}
    />
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  image: {
    width: '100%',
    height: '100%',
    //resizeMode: 'cover',
  },
});

export default HomeCarousel;
