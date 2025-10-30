import React, { useState, useEffect } from 'react';
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
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { dimensions, scaleWidth, scaleHeight, scaleFontSize, scaleModerate, wp, hp } from '../../utils/responsive';

const { width } = dimensions;

interface Elderly {
  id: string;
  name: string;
  status: 'online' | 'offline';
  heartRate: number;
  heartRateUpdatedAt: string;
  location: string;
  locationAddress: string;
  locationUpdatedAt: string;
  latitude: number;
  longitude: number;
}

interface LocationHistory {
  id: string;
  name: string;
  address: string;
  time: string;
  latitude: number;
  longitude: number;
}

export default function DashboardScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  
  const [selectedElderly, setSelectedElderly] = useState<Elderly>({
    id: '1',
    name: 'Maria Silva',
    status: 'online',
    heartRate: 72,
    heartRateUpdatedAt: 'há 2min',
    location: 'Casa',
    locationAddress: 'Rua das Flores, 123',
    locationUpdatedAt: 'há 5min',
    latitude: -23.5505,
    longitude: -46.6333,
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
      latitude: -23.5505,
      longitude: -46.6333,
    },
  ]);

  const [locationHistory] = useState<LocationHistory[]>([
    { 
      id: '1', 
      name: 'Casa', 
      address: 'Rua das Flores, 123', 
      time: 'há 5min',
      latitude: -23.5505,
      longitude: -46.6333,
    },
    { 
      id: '2', 
      name: 'Farmácia', 
      address: 'Av. Central, 456', 
      time: 'há 1h',
      latitude: -23.5515,
      longitude: -46.6343,
    },
    { 
      id: '3', 
      name: 'Mercado', 
      address: 'Rua do Comércio, 789', 
      time: 'há 3h',
      latitude: -23.5525,
      longitude: -46.6353,
    },
    { 
      id: '4', 
      name: 'Parque', 
      address: 'Praça da Liberdade', 
      time: 'há 5h',
      latitude: -23.5535,
      longitude: -46.6363,
    },
  ]);

  const [showElderlyPicker, setShowElderlyPicker] = useState(false);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
    } catch (error) {
      console.error('Erro ao obter localização:', error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simular carregamento de dados e atualização de localização
    requestLocationPermission();
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

        {/* Mapa em Tempo Real */}
        <View style={styles.mapSection}>
          <View style={styles.mapHeader}>
            <View style={styles.mapTitleContainer}>
              <Text style={styles.sectionTitle}>Localização em Tempo Real</Text>
              <Text style={styles.mapSubtitle}>Rastreado via WearOS</Text>
            </View>
            <View style={styles.liveIndicator}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>AO VIVO</Text>
            </View>
          </View>
          
          <View style={styles.mapContainer}>
            {currentLocation && (
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                  latitude: selectedElderly.latitude,
                  longitude: selectedElderly.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                showsUserLocation={false}
                showsMyLocationButton={false}
              >
                {/* Marcador da localização do WearOS do idoso */}
                <Marker
                  coordinate={{
                    latitude: selectedElderly.latitude,
                    longitude: selectedElderly.longitude,
                  }}
                  title={selectedElderly.name}
                  description={`${selectedElderly.location} - Via WearOS`}
                >
                  <View style={styles.customMarker}>
                    <View style={styles.markerPulse} />
                    <View style={styles.markerInner}>
                      <Ionicons name="watch" size={20} color="#fff" />
                    </View>
                  </View>
                </Marker>
              </MapView>
            )}
          </View>
          
          <View style={styles.mapInfo}>
            <Ionicons name="watch" size={16} color="#007AFF" />
            <Text style={styles.mapInfoText}>
              {selectedElderly.location} - {selectedElderly.locationAddress}
            </Text>
            <View style={styles.wearOSBadge}>
              <Text style={styles.wearOSText}>WearOS</Text>
            </View>
          </View>
        </View>

        {/* Últimas Localizações */}
        <View style={styles.locationsSection}>
          <Text style={styles.sectionTitle}>Histórico de Localizações</Text>
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
    paddingHorizontal: scaleWidth(20),
    paddingTop: scaleHeight(60),
    paddingBottom: scaleHeight(20),
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: scaleWidth(4),
  },
  headerTitle: {
    fontSize: scaleFontSize(20),
    fontWeight: '700',
    color: '#1a1a1a',
  },
  refreshButton: {
    padding: scaleWidth(4),
  },
  content: {
    flex: 1,
    padding: scaleWidth(20),
  },
  elderlySelector: {
    marginBottom: scaleHeight(20),
  },
  elderlyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    padding: scaleWidth(16),
    borderRadius: scaleModerate(12),
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  elderlyInfo: {
    flex: 1,
  },
  elderlyName: {
    fontSize: scaleFontSize(18),
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: scaleHeight(4),
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(6),
  },
  statusDot: {
    width: scaleWidth(8),
    height: scaleWidth(8),
    borderRadius: scaleModerate(4),
  },
  statusDotLarge: {
    width: scaleWidth(10),
    height: scaleWidth(10),
    borderRadius: scaleModerate(5),
  },
  statusOnline: {
    backgroundColor: '#34C759',
  },
  statusOffline: {
    backgroundColor: '#999',
  },
  statusText: {
    fontSize: scaleFontSize(14),
    color: '#666',
  },
  statusTextLarge: {
    fontSize: scaleFontSize(16),
    color: '#666',
    fontWeight: '500',
  },
  elderlyDropdown: {
    marginTop: scaleHeight(8),
    backgroundColor: '#fff',
    borderRadius: scaleModerate(12),
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  elderlyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scaleWidth(16),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  elderlyOptionName: {
    fontSize: scaleFontSize(16),
    fontWeight: '500',
    color: '#1a1a1a',
  },
  elderlyCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: scaleModerate(16),
    padding: scaleWidth(20),
    marginBottom: scaleHeight(24),
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  elderlyCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scaleHeight(20),
  },
  elderlyCardName: {
    fontSize: scaleFontSize(22),
    fontWeight: '700',
    color: '#1a1a1a',
  },
  infoGrid: {
    flexDirection: 'row',
    gap: scaleWidth(12),
  },
  infoCard: {
    flex: 1,
    borderRadius: scaleModerate(12),
    padding: scaleWidth(16),
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
    gap: scaleWidth(8),
    marginBottom: scaleHeight(12),
  },
  infoCardTitle: {
    fontSize: scaleFontSize(14),
    fontWeight: '600',
    color: '#666',
  },
  infoCardValue: {
    fontSize: scaleFontSize(24),
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: scaleHeight(4),
  },
  infoCardTime: {
    fontSize: scaleFontSize(12),
    color: '#999',
  },
  actionsSection: {
    marginBottom: scaleHeight(24),
  },
  sectionTitle: {
    fontSize: scaleFontSize(18),
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: scaleHeight(12),
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: scaleWidth(12),
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scaleWidth(8),
    paddingVertical: scaleHeight(16),
    borderRadius: scaleModerate(12),
  },
  callButton: {
    backgroundColor: '#34C759',
  },
  sosButton: {
    backgroundColor: '#FF3B30',
  },
  actionButtonText: {
    fontSize: scaleFontSize(16),
    fontWeight: '700',
    color: '#fff',
  },
  locationsSection: {
    marginBottom: scaleHeight(24),
  },
  mapSection: {
    marginBottom: scaleHeight(24),
  },
  mapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scaleHeight(12),
  },
  mapTitleContainer: {
    flex: 1,
  },
  mapSubtitle: {
    fontSize: scaleFontSize(12),
    color: '#999',
    marginTop: scaleHeight(2),
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(6),
    backgroundColor: '#FFE5E5',
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(4),
    borderRadius: scaleModerate(12),
  },
  liveDot: {
    width: scaleWidth(8),
    height: scaleWidth(8),
    borderRadius: scaleModerate(4),
    backgroundColor: '#FF3B30',
  },
  liveText: {
    fontSize: scaleFontSize(11),
    fontWeight: '700',
    color: '#FF3B30',
  },
  mapContainer: {
    height: scaleHeight(300),
    borderRadius: scaleModerate(16),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  customMarker: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  markerPulse: {
    position: 'absolute',
    width: scaleWidth(60),
    height: scaleWidth(60),
    borderRadius: scaleModerate(30),
    backgroundColor: 'rgba(0, 122, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(0, 122, 255, 0.3)',
  },
  markerInner: {
    width: scaleWidth(40),
    height: scaleWidth(40),
    borderRadius: scaleModerate(20),
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mapInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(8),
    marginTop: scaleHeight(12),
    padding: scaleWidth(12),
    backgroundColor: '#E8F4FF',
    borderRadius: scaleModerate(10),
  },
  mapInfoText: {
    flex: 1,
    fontSize: scaleFontSize(14),
    color: '#007AFF',
    fontWeight: '600',
  },
  wearOSBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: scaleWidth(8),
    paddingVertical: scaleHeight(4),
    borderRadius: scaleModerate(6),
  },
  wearOSText: {
    fontSize: scaleFontSize(11),
    fontWeight: '700',
    color: '#fff',
  },
  locationItem: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: scaleModerate(12),
    padding: scaleWidth(16),
    marginBottom: scaleHeight(12),
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  currentLocationItem: {
    backgroundColor: '#E8F4FF',
    borderColor: '#007AFF',
  },
  locationIconContainer: {
    marginRight: scaleWidth(12),
  },
  locationDetails: {
    flex: 1,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scaleHeight(4),
  },
  locationName: {
    fontSize: scaleFontSize(16),
    fontWeight: '600',
    color: '#1a1a1a',
  },
  currentBadge: {
    fontSize: scaleFontSize(14),
    fontWeight: '600',
    color: '#007AFF',
  },
  locationTime: {
    fontSize: scaleFontSize(12),
    color: '#999',
  },
  locationAddress: {
    fontSize: scaleFontSize(14),
    color: '#666',
  },
});
