import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedSetup, setHasCompletedSetup] = useState(false);

  useEffect(() => {
    checkAppState();
  }, []);

  const checkAppState = async () => {
    try {
      const [onboardingValue, authValue, setupValue] = await Promise.all([
        AsyncStorage.getItem('@has_seen_onboarding'),
        AsyncStorage.getItem('@is_authenticated'),
        AsyncStorage.getItem('@has_completed_setup'),
      ]);

      setHasSeenOnboarding(onboardingValue === 'true');
      setIsAuthenticated(authValue === 'true');
      setHasCompletedSetup(setupValue === 'true');
    } catch (error) {
      console.error('Error checking app state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!hasSeenOnboarding) {
    return <Redirect href="/screens/onboardingScreen" />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/screens/authScreen" />;
  }

  if (!hasCompletedSetup) {
    return <Redirect href="/screens/initialSetupScreen" />;
  }

  return <Redirect href="/(tabs)/home" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
