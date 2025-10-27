import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Elderly {
  id: string;
  name: string;
  status: 'online' | 'offline';
  heartRate: number;
  heartRateUpdatedAt: string;
  location: string;
  locationAddress: string;
  locationUpdatedAt: string;
}

interface LocationHistory {
  id: string;
  name: string;
  address: string;
  time: string;
}

export default function DashboardScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedElderly, setSelectedElderly] = useState<Elderly>({
    id: '1',
    name: 'Maria Silva',
    status: 'online',
    heartRate: 72,
    heartRateUpdatedAt: 'há 2min',
    location: 'Casa',
    locationAddress: 'Rua das Flores, 123',
    locationUpdatedAt: 'há 5min',
  });

  const [elderlyList] = useState<Elderly[]>([
    {
      id: '1',
      name: 'Maria Silva',
      status: 'online',
      heartRate: 72,
      heartRateUpdatedAt: 'há 2min',
      location: 'Casa',
      locationAddress: 'Rua das Flores, 123',
      locationUpdatedAt: 'há 5min',
    },
  ]);

  const [locationHistory] = useState<LocationHistory[]>([
    { id: '1', name: 'Casa', address: 'Rua das Flores, 123', time: 'há 5min' },
    { id: '2', name: 'Farmácia', address: 'Av. Central, 456', time: 'há 1h' },
    { id: '3', name: 'Mercado', address: 'Rua do Comércio, 789', time: 'há 3h' },
    { id: '4', name: 'Parque', address: 'Praça da Liberdade', time: 'há 5h' },
  ]);

  const [showElderlyPicker, setShowElderlyPicker] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Simular carregamento de dados
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleCall = () => {
    console.log('Iniciando chamada para:', selectedElderly.name);
  };

  const handleSOS = () => {
    console.log('SOS acionado para:', selectedElderly.name);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.backButton} />
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity onPress={onRefresh} style={styles.refreshButton}>
          <Ionicons name="refresh" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Seletor de Idoso */}
        <View style={styles.elderlySelector}>
          <TouchableOpacity
            style={styles.elderlyButton}
            onPress={() => setShowElderlyPicker(!showElderlyPicker)}
          >
            <View style={styles.elderlyInfo}>
              <Text style={styles.elderlyName}>{selectedElderly.name}</Text>
              <View style={styles.statusRow}>
                <View
                  style={[
                    styles.statusDot,
                    selectedElderly.status === 'online'
                      ? styles.statusOnline
                      : styles.statusOffline,
                  ]}
                />
                <Text style={styles.statusText}>
                  {selectedElderly.status === 'online' ? 'Online' : 'Offline'}
                </Text>
              </View>
            </View>
            <Ionicons
              name={showElderlyPicker ? 'chevron-up' : 'chevron-down'}
              size={24}
              color="#666"
            />
          </TouchableOpacity>

          {showElderlyPicker && (
            <View style={styles.elderlyDropdown}>
              {elderlyList.map((elderly) => (
                <TouchableOpacity
                  key={elderly.id}
                  style={styles.elderlyOption}
                  onPress={() => {
                    setSelectedElderly(elderly);
                    setShowElderlyPicker(false);
                  }}
                >
                  <Text style={styles.elderlyOptionName}>{elderly.name}</Text>
                  <View style={styles.statusRow}>
                    <View
                      style={[
                        styles.statusDot,
                        elderly.status === 'online'
                          ? styles.statusOnline
                          : styles.statusOffline,
                      ]}
                    />
                    <Text style={styles.statusText}>
                      {elderly.status === 'online' ? 'Online' : 'Offline'}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Cartão do Idoso */}
        <View style={styles.elderlyCard}>
          <View style={styles.elderlyCardHeader}>
            <Text style={styles.elderlyCardName}>{selectedElderly.name}</Text>
            <View style={styles.statusRow}>
              <View
                style={[
                  styles.statusDotLarge,
                  selectedElderly.status === 'online'
                    ? styles.statusOnline
                    : styles.statusOffline,
                ]}
              />
              <Text style={styles.statusTextLarge}>
                {selectedElderly.status === 'online' ? 'Online' : 'Offline'}
              </Text>
            </View>
          </View>

          {/* Informações Principais */}
          <View style={styles.infoGrid}>
            {/* Batimentos */}
            <View style={[styles.infoCard, styles.heartRateCard]}>
              <View style={styles.infoCardHeader}>
                <Ionicons name="heart" size={24} color="#FF3B30" />
                <Text style={styles.infoCardTitle}>Batimentos</Text>
              </View>
              <Text style={styles.infoCardValue}>{selectedElderly.heartRate} bpm</Text>
              <Text style={styles.infoCardTime}>{selectedElderly.heartRateUpdatedAt}</Text>
            </View>

            {/* Localização */}
            <View style={[styles.infoCard, styles.locationCard]}>
              <View style={styles.infoCardHeader}>
                <Ionicons name="location" size={24} color="#007AFF" />
                <Text style={styles.infoCardTitle}>Localização</Text>
              </View>
              <Text style={styles.infoCardValue}>{selectedElderly.location}</Text>
              <Text style={styles.infoCardTime}>{selectedElderly.locationUpdatedAt}</Text>
            </View>
          </View>
        </View>

        {/* Ações Rápidas */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={[styles.actionButton, styles.callButton]}
              onPress={handleCall}
            >
              <Ionicons name="call" size={28} color="#fff" />
              <Text style={styles.actionButtonText}>Ligar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.sosButton]}
              onPress={handleSOS}
            >
              <Ionicons name="warning" size={28} color="#fff" />
              <Text style={styles.actionButtonText}>SOS</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Últimas Localizações */}
        <View style={styles.locationsSection}>
          <Text style={styles.sectionTitle}>Últimas Localizações</Text>
          {locationHistory.map((location, index) => (
            <View
              key={location.id}
              style={[
                styles.locationItem,
                index === 0 && styles.currentLocationItem,
              ]}
            >
              <View style={styles.locationIconContainer}>
                <Ionicons
                  name={index === 0 ? 'location' : 'location-outline'}
                  size={24}
                  color={index === 0 ? '#007AFF' : '#666'}
                />
              </View>
              <View style={styles.locationDetails}>
                <View style={styles.locationHeader}>
                  <Text style={styles.locationName}>
                    {location.name}
                    {index === 0 && (
                      <Text style={styles.currentBadge}> • Atual</Text>
                    )}
                  </Text>
                  <Text style={styles.locationTime}>{location.time}</Text>
                </View>
                <Text style={styles.locationAddress}>{location.address}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  refreshButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  elderlySelector: {
    marginBottom: 20,
  },
  elderlyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  elderlyInfo: {
    flex: 1,
  },
  elderlyName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusDotLarge: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statusOnline: {
    backgroundColor: '#34C759',
  },
  statusOffline: {
    backgroundColor: '#999',
  },
  statusText: {
    fontSize: 14,
    color: '#666',
  },
  statusTextLarge: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  elderlyDropdown: {
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  elderlyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  elderlyOptionName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  elderlyCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  elderlyCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  elderlyCardName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  infoCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
  },
  heartRateCard: {
    backgroundColor: '#FFE5E5',
  },
  locationCard: {
    backgroundColor: '#E8F4FF',
  },
  infoCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  infoCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  infoCardValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  infoCardTime: {
    fontSize: 12,
    color: '#999',
  },
  actionsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
  },
  callButton: {
    backgroundColor: '#34C759',
  },
  sosButton: {
    backgroundColor: '#FF3B30',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  locationsSection: {
    marginBottom: 24,
  },
  locationItem: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  currentLocationItem: {
    backgroundColor: '#E8F4FF',
    borderColor: '#007AFF',
  },
  locationIconContainer: {
    marginRight: 12,
  },
  locationDetails: {
    flex: 1,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  currentBadge: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  locationTime: {
    fontSize: 12,
    color: '#999',
  },
  locationAddress: {
    fontSize: 14,
    color: '#666',
  },
});
