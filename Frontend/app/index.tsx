import { Text, View, Animated, StyleSheet, Dimensions, Platform } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { restoreAuthFromStorage } from '@/store/authSlice';

const { width, height } = Dimensions.get('window');

const index = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const iconRotate = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const slideUp = useRef(new Animated.Value(50)).current;
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Icon rotation animation
    Animated.timing(iconRotate, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Main entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(slideUp, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse animation for the icon
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const minDisplay = new Promise<void>(resolve => setTimeout(resolve, 3500));
    const sessionRestore = dispatch(restoreAuthFromStorage());

    Promise.all([minDisplay, sessionRestore]).then(([, result]: any) => {
      if (result?.payload) {
        router.replace("/(main)/home");
      } else {
        router.replace("/welcome");
      }
    });

    return () => sessionRestore.abort();
  }, []);

  const spin = iconRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#10b981', '#059669', '#047857']}
        style={styles.gradient}
      >
        {/* Animated Background Circles - Fixed overflow */}
        <View style={styles.circlesContainer}>
          <Animated.View 
            style={[
              styles.backgroundCircle, 
              styles.circle1,
              { opacity: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.08]
              }) }
            ]} 
          />
          <Animated.View 
            style={[
              styles.backgroundCircle, 
              styles.circle2,
              { opacity: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.06]
              }) }
            ]} 
          />
          <Animated.View 
            style={[
              styles.backgroundCircle, 
              styles.circle3,
              { opacity: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.05]
              }) }
            ]} 
          />
        </View>

        {/* Main Content */}
        <Animated.View 
          style={[
            styles.content,
            { 
              opacity: fadeAnim, 
              transform: [
                { scale: scaleAnim },
                { translateY: slideUp }
              ] 
            }
          ]}
        >
          {/* Icon Container with Glow */}
          <Animated.View 
            style={[
              styles.iconContainer,
              { 
                transform: [
                  { rotate: spin },
                  { scale: pulseAnim }
                ] 
              }
            ]}
          >
            <View style={styles.iconGlow}>
              <Ionicons name="medical" size={100} color="#FFFFFF" />
            </View>
          </Animated.View>

          {/* Brand Name */}
          <Animated.View 
            style={[
              styles.textContainer,
              { opacity: fadeAnim }
            ]}
          >
            <Text style={styles.brandName}>MedRemind</Text>
            <View style={styles.taglineContainer}>
              <View style={styles.divider} />
              <Text style={styles.tagline}>Your Health Companion</Text>
              <View style={styles.divider} />
            </View>
          </Animated.View>

          {/* Loading Indicator */}
          <Animated.View 
            style={[
              styles.loadingContainer,
              { opacity: fadeAnim }
            ]}
          >
            <View style={styles.loadingBar}>
              <Animated.View 
                style={[
                  styles.loadingFill,
                  { 
                   transform: [
                      {
                        scaleX: fadeAnim
                      }
                    ]
                  }
                ]} 
              />
            </View>
          </Animated.View>
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Background Circles Container - Prevents overflow
  circlesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },

  // Background Circles - Adjusted to stay within bounds
  backgroundCircle: {
    position: 'absolute',
    borderRadius: 9999,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  circle1: {
    width: width * 0.9,
    height: width * 0.9,
    top: -width * 0.3,
    right: -width * 0.2,
  },
  circle2: {
    width: width * 0.7,
    height: width * 0.7,
    bottom: -width * 0.25,
    left: -width * 0.15,
  },
  circle3: {
    width: width * 0.4,
    height: width * 0.4,
    top: height * 0.35,
    left: -width * 0.1,
  },

  // Main Content
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },

  // Icon Container
  iconContainer: {
    marginBottom: 30,
  },
  iconGlow: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 0 20px rgba(255, 255, 255, 0.4)' }
      : { shadowColor: '#FFFFFF', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.4, shadowRadius: 20, elevation: 10 }),
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },

  // Text Container
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  brandName: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: 3,
    marginBottom: 16,
    ...(Platform.OS === 'web'
      ? { textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }
      : { textShadowColor: 'rgba(0, 0, 0, 0.2)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 8 }),
  },
  taglineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tagline: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  divider: {
    width: 24,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },

  // Loading Indicator
  loadingContainer: {
    marginTop: 20,
  },
  loadingBar: {
    width: 200,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  loadingFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 0 8px rgba(255, 255, 255, 0.6)' }
      : { shadowColor: '#FFFFFF', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.6, shadowRadius: 8 }),
  },
});

export default index;