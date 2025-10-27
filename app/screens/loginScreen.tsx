import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login:', email, password);
    // Implementar lógica de login aqui
    // Verificar se é primeira vez do usuário ou se não completou setup inicial
    const isFirstTime = true; // Substituir por lógica real de verificação
    
    if (isFirstTime) {
      router.push('/screens/initialSetupScreen');
    } else {
      router.push('/screens/dashboardScreen');
    }
  };

  const handleForgotPassword = () => {
    router.push('/screens/forgotPasswordScreen');
  };

  const handleSignUp = () => {
    router.push('/screens/signupScreen');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={styles.title}>Bem-vindo!</Text>
          <Text style={styles.subtitle}>Entre na sua conta</Text>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="seu@email.com"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity
              onPress={handleForgotPassword}
              activeOpacity={0.7}
            >
              <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Text style={styles.loginButtonText}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Não tem uma conta?{' '}
            <Text style={styles.signupLink} onPress={handleSignUp}>
              Cadastre-se
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#007AFF',
    textAlign: 'right',
    marginTop: -8,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 30,
    paddingBottom: 40,
    paddingTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  signupLink: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
