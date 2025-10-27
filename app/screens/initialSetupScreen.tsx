import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function InitialSetupScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [elderlyRegistered, setElderlyRegistered] = useState(false);
  const [locationsRegistered, setLocationsRegistered] = useState(false);
  const [notificationsConfigured, setNotificationsConfigured] = useState(false);

  useEffect(() => {
    if (params.elderlyRegistered === 'true') {
      setElderlyRegistered(true);
    }
  }, [params]);

  const handleRegisterElderly = () => {
    console.log('Cadastrar Idoso');
    router.push('/screens/registerElderlyScreen');
  };

  const handleRegisterLocations = () => {
    router.push('/screens/registerLocationsScreen');
  };

  const handleConfigureNotifications = () => {
    router.push('/screens/notificationsScreen');
  };

  const handleContinue = () => {
    if (elderlyRegistered) {
      router.push('/screens/dashboardScreen');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Configuração Inicial</Text>
        <Text style={styles.subtitle}>
          Vamos começar! Configure seu perfil para começar a usar o Amparo.
        </Text>
      </View>

      <View style={styles.sectionsContainer}>
        {/* Cadastrar Idoso */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name="person" size={24} color="#007AFF" />
            </View>
            <View style={styles.cardContent}>
              <View style={styles.titleRow}>
                <Text style={styles.cardTitle}>Cadastrar Idoso</Text>
                <View style={styles.requiredBadge}>
                  <Text style={styles.requiredText}>Obrigatório</Text>
                </View>
              </View>
              <Text style={styles.cardDescription}>
                Adicione informações do idoso para monitoramento
              </Text>
            </View>
          </View>
          {elderlyRegistered ? (
            <View style={styles.completedSection}>
              <View style={styles.completedButton}>
                <Ionicons name="checkmark-circle" size={20} color="#34C759" />
                <Text style={styles.completedButtonText}>Concluído</Text>
              </View>
              <TouchableOpacity
                style={styles.addAnotherButton}
                onPress={handleRegisterElderly}
                activeOpacity={0.8}
              >
                <Ionicons name="add-circle-outline" size={18} color="#007AFF" />
                <Text style={styles.addAnotherButtonText}>Adicionar Outro</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleRegisterElderly}
              activeOpacity={0.8}
            >
              <Text style={styles.actionButtonText}>Cadastrar</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Cadastrar Localizações */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name="location" size={24} color="#007AFF" />
            </View>
            <View style={styles.cardContent}>
              <View style={styles.titleRow}>
                <Text style={styles.cardTitle}>Cadastrar Localizações</Text>
                <View style={styles.optionalBadge}>
                  <Text style={styles.optionalText}>Opcional</Text>
                </View>
              </View>
              <Text style={styles.cardDescription}>
                Configure locais importantes para monitoramento
              </Text>
            </View>
          </View>
          {locationsRegistered ? (
            <View style={styles.completedButton}>
              <Ionicons name="checkmark-circle" size={20} color="#34C759" />
              <Text style={styles.completedButtonText}>Concluído</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleRegisterLocations}
              activeOpacity={0.8}
            >
              <Text style={styles.actionButtonText}>Cadastrar</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Configurar Notificações */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name="notifications" size={24} color="#007AFF" />
            </View>
            <View style={styles.cardContent}>
              <View style={styles.titleRow}>
                <Text style={styles.cardTitle}>Configurar Notificações</Text>
                <View style={styles.optionalBadge}>
                  <Text style={styles.optionalText}>Opcional</Text>
                </View>
              </View>
              <Text style={styles.cardDescription}>
                Configure alertas e notificações
              </Text>
            </View>
          </View>
          {notificationsConfigured ? (
            <View style={styles.completedButton}>
              <Ionicons name="checkmark-circle" size={20} color="#34C759" />
              <Text style={styles.completedButtonText}>Concluído</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleConfigureNotifications}
              activeOpacity={0.8}
            >
              <Text style={styles.actionButtonText}>Cadastrar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Botão Continuar */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !elderlyRegistered && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          activeOpacity={0.8}
          disabled={!elderlyRegistered}
        >
          <Text style={styles.continueButtonText}>Continuar</Text>
        </TouchableOpacity>
        {!elderlyRegistered && (
          <Text style={styles.footerHint}>
            Complete o cadastro do idoso para continuar
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
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
    lineHeight: 24,
  },
  sectionsContainer: {
    gap: 16,
    marginBottom: 32,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#E8F4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginRight: 8,
  },
  requiredBadge: {
    backgroundColor: '#FFE5E5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  requiredText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FF3B30',
  },
  optionalBadge: {
    backgroundColor: '#E8F4FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  optionalText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#007AFF',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  completedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#E8F8EC',
    gap: 8,
  },
  completedButtonText: {
    color: '#34C759',
    fontSize: 15,
    fontWeight: '600',
  },
  footer: {
    marginTop: 16,
  },
  continueButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
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
  continueButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footerHint: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    marginTop: 12,
  },
  completedSection: {
    gap: 8,
  },
  addAnotherButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  addAnotherButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
