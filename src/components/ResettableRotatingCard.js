import React from 'react';
import {
  Dimensions,StyleSheet,TouchableOpacity
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

interface ResettableRotatingCardProps {
  children: React.ReactNode;
  style?: any;
  perspective?: number;
}

const ResettableRotatingCard: React.FC<ResettableRotatingCardProps> = ({
  children,
  style,
  perspective,
}) => {
  const rotateXValue = useSharedValue(0);
  const rotateYValue = useSharedValue(0);

  const handleCardSelect = () => {
    rotateXValue.value = withTiming(0);
    rotateYValue.value = withTiming(0);
  };

  const gestureHandlerResettable = useAnimatedGestureHandler({
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
    onEnd: () => {
      rotateXValue.value = withTiming(0);
      rotateYValue.value = withTiming(0);
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
      <PanGestureHandler onGestureEvent={gestureHandlerResettable}>
        <Animated.View style={[StyleSheet.absoluteFill, cardStyle]}>
          <TouchableOpacity activeOpacity={1} onPress={handleCardSelect}>
            {children}
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default ResettableRotatingCard;
