import { NativeModules, Platform } from 'react-native';
import PersistentRotatingCard from './src/components/PersistentRotatingCard';
import ResettableRotatingCard from './src/components/ResettableRotatingCard';


const LINKING_ERROR =
  `The package 'react-native-rotate-card' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const RotateCardModule = isTurboModuleEnabled
  ? require('./NativeRotateCard').default
  : NativeModules.RotateCard;

const RotateCard = RotateCardModule
  ? RotateCardModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export {PersistentRotatingCard,ResettableRotatingCard};
