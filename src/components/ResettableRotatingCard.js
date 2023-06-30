"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const { height: HEIGHT, width: WIDTH } = react_native_1.Dimensions.get('window');
const ResettableRotatingCard = ({ children, style, perspective, }) => {
    const rotateXValue = (0, react_native_reanimated_1.useSharedValue)(0);
    const rotateYValue = (0, react_native_reanimated_1.useSharedValue)(0);
    const handleCardSelect = () => {
        rotateXValue.value = (0, react_native_reanimated_1.withTiming)(0);
        rotateYValue.value = (0, react_native_reanimated_1.withTiming)(0);
    };
    const gestureHandlerResettable = (0, react_native_reanimated_1.useAnimatedGestureHandler)({
        onStart: () => {
            rotateXValue.value = (0, react_native_reanimated_1.withTiming)(0);
            rotateYValue.value = (0, react_native_reanimated_1.withTiming)(0);
        },
        onActive: (event, context) => {
            rotateXValue.value = (0, react_native_reanimated_1.withSpring)((0, react_native_reanimated_1.interpolate)(event.translationY, [0, HEIGHT], [10, -10], {
                extrapolateLeft: react_native_reanimated_1.Extrapolate.CLAMP,
                extrapolateRight: react_native_reanimated_1.Extrapolate.CLAMP,
            }));
            rotateYValue.value = (0, react_native_reanimated_1.withSpring)((0, react_native_reanimated_1.interpolate)(event.translationX, [0, WIDTH], [-10, 10], {
                extrapolateLeft: react_native_reanimated_1.Extrapolate.CLAMP,
                extrapolateRight: react_native_reanimated_1.Extrapolate.CLAMP,
            }));
        },
        onEnd: () => {
            rotateXValue.value = (0, react_native_reanimated_1.withTiming)(0);
            rotateYValue.value = (0, react_native_reanimated_1.withTiming)(0);
        },
    });
    const rStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
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
    return (react_1.default.createElement(react_native_gesture_handler_1.GestureHandlerRootView, { style: react_native_1.StyleSheet.absoluteFill },
        react_1.default.createElement(react_native_gesture_handler_1.PanGestureHandler, { onGestureEvent: gestureHandlerResettable },
            react_1.default.createElement(react_native_reanimated_1.default.View, { style: [react_native_1.StyleSheet.absoluteFill, cardStyle] },
                react_1.default.createElement(react_native_1.TouchableOpacity, { activeOpacity: 1, onPress: handleCardSelect }, children)))));
};
exports.default = ResettableRotatingCard;
