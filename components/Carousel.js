import React ,{useState} from 'react';
import { View, Image, StyleSheet,Dimensions } from 'react-native';
import Carousel ,{ Pagination } from 'react-native-snap-carousel';
const { width, height } = Dimensions.get('window');
const images = [
  require('../assets/slideimg3.jpg'),
  require('../assets/slideimg4.jpg'),
  require('../assets/slideimg5.jpg'),
  require('../assets/food.jpg'),
];

const HomeCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const renderItem = ({ item }) => (
    <View >
      <Image source={item} style={styles.image}/>
    </View>
  );
  return (
    <View>
    <Carousel
      data={images}
      renderItem={renderItem}
      sliderWidth={width}
      itemWidth={width}
      layout={'default'}
      loop={true}
      autoplay={true}
      sliderHeight={height * 0.5}
      onSnapToItem={(index) => setActiveIndex(index)}
    />
    <Pagination
        dotsLength={images.length}
        activeDotIndex={activeIndex}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.dotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
      </View>
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
  paginationContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    paddingVertical: 8,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
});

export default HomeCarousel;
