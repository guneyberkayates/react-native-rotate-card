import React from 'react';
import { View, TouchableOpacity, Dimensions, Text } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const PersistentRotatingCard = ({ children, style, perspective }) => {
  const rotateXValue = useSharedValue(0);
  const rotateYValue = useSharedValue(0);

  const gestureHandlerPersistent = useAnimatedGestureHandler({
    onStart: () => {
      rotateXValue.value = withTiming(0);
      rotateYValue.value = withTiming(0);
    },
    onActive: (event) => {
      rotateXValue.value = withSpring(
        interpolate(event.translationY, [0, HEIGHT], [10, -10], {
          extrapolateLeft: Extrapolate.CLAMP,
          extrapolateRight: Extrapolate.CLAMP,
        })
      );
      rotateYValue.value = withSpring(
        interpolate(event.translationX, [0, WIDTH], [-10, 10], {
          extrapolateLeft: Extrapolate.CLAMP,
          extrapolateRight: Extrapolate.CLAMP,
        })
      );
    },
  });

  const rStyle = useAnimatedStyle(() => {
    const rotateX = `${rotateXValue.value}deg`;
    const rotateY = `${rotateYValue.value}deg`;

    return {
      transform: [
        { perspective: perspective || 500 },
        { rotateX },
        { rotateY },
      ],
    };
  });

  const cardStyle = [rStyle, style];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={gestureHandlerPersistent}>
        <Animated.View style={cardStyle}>{children}</Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default PersistentRotatingCard;
