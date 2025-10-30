import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scaleWidth, scaleHeight, scaleFontSize, scaleModerate } from '../../utils/responsive';

export default function InitialSetupScreen() {
  const router = useRouter();
  const [elderlyRegistered, setElderlyRegistered] = useState(false);
  const [locationsRegistered, setLocationsRegistered] = useState(false);
  const [notificationsConfigured, setNotificationsConfigured] = useState(false);

  const loadSetupStatus = async () => {
    try {
      const elderlyStatus = await AsyncStorage.getItem('elderlyRegistered');
      const locationsStatus = await AsyncStorage.getItem('locationsRegistered');
      const notificationsStatus = await AsyncStorage.getItem('notificationsConfigured');
      
      if (elderlyStatus === 'true') setElderlyRegistered(true);
      if (locationsStatus === 'true') setLocationsRegistered(true);
      if (notificationsStatus === 'true') setNotificationsConfigured(true);
    } catch (error) {
      console.error('Erro ao carregar status:', error);
    }
  };

  useEffect(() => {
    loadSetupStatus();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadSetupStatus();
    }, [])
  );

  const handleRegisterElderly = async () => {
    console.log('Cadastrar Idoso');
    await AsyncStorage.setItem('elderlyRegistered', 'false');
    router.push('/screens/registerElderlyScreen');
  };

  const handleRegisterLocations = async () => {
    await AsyncStorage.setItem('locationsRegistered', 'false');
    router.push('/screens/registerLocationsScreen');
  };

  const handleConfigureNotifications = async () => {
    await AsyncStorage.setItem('notificationsConfigured', 'false');
    router.push('/screens/notificationsScreen');
  };

  const handleContinue = async () => {
    if (elderlyRegistered) {
      await AsyncStorage.setItem('@has_completed_setup', 'true');
      router.replace('/(tabs)/home');
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
    paddingHorizontal: scaleWidth(20),
    paddingTop: scaleHeight(60),
    paddingBottom: scaleHeight(40),
  },
  header: {
    marginBottom: scaleHeight(32),
  },
  title: {
    fontSize: scaleFontSize(32),
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: scaleHeight(8),
  },
  subtitle: {
    fontSize: scaleFontSize(16),
    color: '#666',
    lineHeight: scaleHeight(24),
  },
  sectionsContainer: {
    gap: scaleHeight(16),
    marginBottom: scaleHeight(32),
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: scaleModerate(16),
    padding: scaleWidth(20),
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: scaleHeight(16),
  },
  iconContainer: {
    width: scaleWidth(48),
    height: scaleWidth(48),
    borderRadius: scaleModerate(12),
    backgroundColor: '#E8F4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scaleWidth(12),
  },
  cardContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleHeight(4),
    flexWrap: 'wrap',
  },
  cardTitle: {
    fontSize: scaleFontSize(18),
    fontWeight: '600',
    color: '#1a1a1a',
    marginRight: scaleWidth(8),
  },
  requiredBadge: {
    backgroundColor: '#FFE5E5',
    paddingHorizontal: scaleWidth(8),
    paddingVertical: scaleHeight(2),
    borderRadius: scaleModerate(6),
  },
  requiredText: {
    fontSize: scaleFontSize(11),
    fontWeight: '600',
    color: '#FF3B30',
  },
  optionalBadge: {
    backgroundColor: '#E8F4FF',
    paddingHorizontal: scaleWidth(8),
    paddingVertical: scaleHeight(2),
    borderRadius: scaleModerate(6),
  },
  optionalText: {
    fontSize: scaleFontSize(11),
    fontWeight: '600',
    color: '#007AFF',
  },
  cardDescription: {
    fontSize: scaleFontSize(14),
    color: '#666',
    lineHeight: scaleHeight(20),
  },
  actionButton: {
    backgroundColor: '#007AFF',
    paddingVertical: scaleHeight(12),
    borderRadius: scaleModerate(10),
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: scaleFontSize(15),
    fontWeight: '600',
  },
  completedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scaleHeight(12),
    borderRadius: scaleModerate(10),
    backgroundColor: '#E8F8EC',
    gap: scaleWidth(8),
  },
  completedButtonText: {
    color: '#34C759',
    fontSize: scaleFontSize(15),
    fontWeight: '600',
  },
  footer: {
    marginTop: scaleHeight(16),
  },
  continueButton: {
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
  continueButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: scaleFontSize(16),
    fontWeight: '600',
  },
  footerHint: {
    fontSize: scaleFontSize(13),
    color: '#999',
    textAlign: 'center',
    marginTop: scaleHeight(12),
  },
  completedSection: {
    gap: scaleHeight(8),
  },
  addAnotherButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: scaleHeight(10),
    borderRadius: scaleModerate(10),
    gap: scaleWidth(6),
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  addAnotherButtonText: {
    color: '#007AFF',
    fontSize: scaleFontSize(14),
    fontWeight: '600',
  },
});
