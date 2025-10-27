import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Pressable,
  ImageSourcePropType,
} from 'react-native';

const { width } = Dimensions.get('window');

export interface OnboardingSlide {
  id: string;
  image: ImageSourcePropType;
  text: string;
  buttonText: string;
}

interface OnboardingProps {
  slides: OnboardingSlide[];
  onComplete: () => void;
  primaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
}

export default function Onboarding({
  slides,
  onComplete,
  primaryColor = '#007AFF',
  backgroundColor = '#fff',
  textColor = '#333',
}: OnboardingProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      });
    }
  };

  const handleSlidePress = (event: any) => {
    const touchX = event.nativeEvent.locationX;
    const halfWidth = width / 2;

    if (touchX < halfWidth) {
      handlePrevious();
    } else {
      handleNext();
    }
  };

  const renderSlide = ({ item }: { item: OnboardingSlide }) => (
    <Pressable style={styles.slide} onPress={handleSlidePress}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={[styles.text, { color: textColor }]}>{item.text}</Text>
    </Pressable>
  );

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index
                  ? [styles.activeDot, { backgroundColor: primaryColor }]
                  : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: primaryColor }]}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>
            {slides[currentIndex].buttonText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  image: {
    width: width * 0.7,
    height: width * 0.7,
    marginBottom: 40,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 20,
  },
  footer: {
    paddingVertical: 40,
    paddingHorizontal: 30,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    width: 30,
  },
  inactiveDot: {
    backgroundColor: '#D1D5DB',
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
