"use strict";
import PersistentRotatingCard from './src/components/PersistentRotatingCard';
import ResettableRotatingCard from './src/components/ResettableRotatingCard';

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResettableRotatingCard = exports.PersistentRotatingCard = void 0;
const react_native_1 = require("react-native");
const PersistentRotatingCard_tsx_1 = __importDefault(require("./src/components/PersistentRotatingCard.tsx"));
exports.PersistentRotatingCard = PersistentRotatingCard_tsx_1.default;
const ResettableRotatingCard_tsx_1 = __importDefault(require("./src/components/ResettableRotatingCard.tsx"));
exports.ResettableRotatingCard = ResettableRotatingCard_tsx_1.default;
const LINKING_ERROR = `The package 'react-native-rotate-card' doesn't seem to be linked. Make sure: \n\n` +
    react_native_1.Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
    '- You rebuilt the app after installing the package\n' +
    '- You are not using Expo Go\n';
// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;
const RotateCardModule = isTurboModuleEnabled
    ? require('./NativeRotateCard').default
    : react_native_1.NativeModules.RotateCard;
const RotateCard = RotateCardModule
    ? RotateCardModule
    : new Proxy({}, {
        get() {
            throw new Error(LINKING_ERROR);
        },
    });
export {PersistentRotatingCard,ResettableRotatingCard};
