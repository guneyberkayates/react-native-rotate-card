#include <jni.h>
#include "react-native-rotate-card.h"

extern "C"
JNIEXPORT jint JNICALL
Java_com_rotatecard_RotateCardModule_nativeMultiply(JNIEnv *env, jclass type, jdouble a, jdouble b) {
    return rotatecard::multiply(a, b);
}
