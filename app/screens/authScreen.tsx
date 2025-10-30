import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import { scaleWidth, scaleHeight, scaleFontSize, scaleModerate } from '../../utils/responsive';

export default function AuthScreen() {
  const router = useRouter();

  const handleSignUp = () => {
    router.push('/screens/signupScreen');
  };

  const handleSignIn = () => {
    router.push('/screens/loginScreen');
  };

  const handleTermsPress = () => {
    Linking.openURL('https://example.com/terms');
  };

  const handlePrivacyPress = () => {
    Linking.openURL('https://example.com/privacy');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Crie sua conta</Text>
        <Text style={styles.subtitle}>
          Dê o primeiro passo rumo a uma vida mais saudável
        </Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleSignUp}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Cadastre-se</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleSignIn}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Ao criar sua conta, você concorda com nossos{' '}
          <Text style={styles.link} onPress={handleTermsPress}>
            Termos de Uso
          </Text>{' '}
          e{' '}
          <Text style={styles.link} onPress={handlePrivacyPress}>
            Política de Privacidade
          </Text>
          .
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: scaleWidth(30),
  },
  title: {
    fontSize: scaleFontSize(32),
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: scaleHeight(12),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: scaleFontSize(16),
    color: '#666',
    textAlign: 'center',
    lineHeight: scaleHeight(24),
    marginBottom: scaleHeight(40),
  },
  buttonsContainer: {
    gap: scaleHeight(16),
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: scaleHeight(16),
    borderRadius: scaleModerate(12),
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: scaleFontSize(16),
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: scaleHeight(16),
    borderRadius: scaleModerate(12),
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: scaleFontSize(16),
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: scaleWidth(30),
    paddingBottom: scaleHeight(40),
  },
  footerText: {
    fontSize: scaleFontSize(12),
    color: '#666',
    textAlign: 'center',
    lineHeight: scaleHeight(18),
  },
  link: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});
