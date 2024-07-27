import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const PromotionsCarousel = ({ promotionsData }) => {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / 350); // Increased width to 390
    setCurrentIndex(currentIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = currentIndex === promotionsData.length - 1 ? 0 : currentIndex + 1;
      scrollRef.current.scrollTo({ x: nextIndex * 350, animated: true }); // Increased width to 390
      setCurrentIndex(nextIndex);
    }, 5000); // Interval in milliseconds (5 seconds)

    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderCarouselItem = ({ item }) => {
    let startValue = { x: 0, y: 0 };
    let endValue = { x: 1, y: 1 };

    if (item.id === 1) {
      startValue = { x: 0, y: 1 };
      endValue = { x: 1, y: 1 };
    } else if (item.id === 2) {
      startValue = { x: 1, y: 1 };
      endValue = { x: 1, y: 0 };
    } else if (item.id === 3) {
      startValue = { x: 1, y: 0 };
      endValue = { x: 1, y: 1 };
    }

    return (
      <LinearGradient
        colors={["rgba(30, 40, 255, 0.9)", "rgba(21, 210, 210, 0.5)"]}
        start={startValue} // Start from top-left corner
        end={endValue} // End at bottom-right corner
        style={styles.carouselItem}
      >
        <View style={styles.promotionContent}>
          <Text style={styles.offerText}>{item.title}</Text>
          <Text style={styles.offerDetails}>{item.offer}</Text>
          <Text style={styles.offerDetails}>{item.discount}</Text>
          <Image
            style={styles.carouselImage}
            source={item.image}
          />
        </View>
      </LinearGradient>
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {[...promotionsData, ...promotionsData].map((item, index) => (
          <View key={index} style={styles.carouselItem}>
            {renderCarouselItem({ item })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 20,
  },
  carouselItem: {
    width: 350,
    height: 200,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-evenly', 
    padding: 20,
    marginLeft: 1,
  },
  carouselImage: {
    width: 175,
    height: 109,
    marginTop: -60,
    marginLeft: 150,
  },
  promotionContent: {
    alignItems: 'flex-start',
  },
  offerText: {
    fontSize: 26,
    marginTop:10,
    marginLeft:5,
    marginBottom: 20,
    color: '#fff',
    fontWeight: '500',
  },
  offerDetails: {
    fontSize: 18,
    marginLeft:5,
    color: '#fff',
    marginTop: 5,
    marginBottom: 10,
  },
});

export default PromotionsCarousel;
