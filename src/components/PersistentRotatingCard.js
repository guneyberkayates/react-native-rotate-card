import React from 'react';
import {
  Dimensions,StyleSheet
} from 'react-native';
import Animated, { Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';

const { height: HEIGHT, width: WIDTH } = Dimensions.get('window');

interface PersistentRotatingCardProps {
  children: React.ReactNode;
  style?: any;
  perspective?: number;
}

const PersistentRotatingCard: React.FC<PersistentRotatingCardProps> = ({
  children,
  style,
  perspective,
}) => {
  const rotateXValue = useSharedValue(0);
  const rotateYValue = useSharedValue(0);

  const gestureHandlerPersistent = useAnimatedGestureHandler({
    onStart: () => {
      rotateXValue.value = withTiming(0);
      rotateYValue.value = withTiming(0);
    },
    onActive: (event, context) => {
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
    <GestureHandlerRootView style={StyleSheet.absoluteFill}>
      <PanGestureHandler onGestureEvent={gestureHandlerPersistent}>
        <Animated.View style={[StyleSheet.absoluteFill, cardStyle]}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default PersistentRotatingCard;
