#ifdef __cplusplus
#import "react-native-rotate-card.h"
#endif

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNRotateCardSpec.h"

@interface RotateCard : NSObject <NativeRotateCardSpec>
#else
#import <React/RCTBridgeModule.h>

@interface RotateCard : NSObject <RCTBridgeModule>
#endif

@end
