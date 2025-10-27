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

export default function SignUpScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    console.log('Cadastro:', name, email, phone, password);
    // Implementar lógica de cadastro aqui
    // Após cadastro bem-sucedido, redireciona para login
    router.push('/screens/loginScreen');
  };

  const handleLogin = () => {
    router.back();
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
          <Text style={styles.title}>Criar conta</Text>
          <Text style={styles.subtitle}>Preencha seus dados para começar</Text>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome completo</Text>
              <TextInput
                style={styles.input}
                placeholder="Seu nome"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

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
              <Text style={styles.label}>Telefone</Text>
              <TextInput
                style={styles.input}
                placeholder="(00) 00000-0000"
                placeholderTextColor="#999"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                autoComplete="tel"
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

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirmar senha</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#999"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleSignUp}
              activeOpacity={0.8}
            >
              <Text style={styles.signupButtonText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Já tem uma conta?{' '}
            <Text style={styles.loginLink} onPress={handleLogin}>
              Entrar
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
  signupButton: {
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
  signupButtonText: {
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
  loginLink: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
