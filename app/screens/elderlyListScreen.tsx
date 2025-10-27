import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Elderly {
  id: string;
  name: string;
  age: number;
  status: 'online' | 'absent';
  lastActivity: string;
  location: string;
  isKnownLocation: boolean;
  latitude?: number;
  longitude?: number;
  color: string;
}

type FilterType = 'all' | 'online' | 'absent';

export default function ElderlyListScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const [elderlyList] = useState<Elderly[]>([
    {
      id: '1',
      name: 'José Silva',
      age: 75,
      status: 'online',
      lastActivity: 'há 5 min',
      location: 'Casa',
      isKnownLocation: true,
      color: '#FF3B30',
    },
    {
      id: '2',
      name: 'Ana Costa',
      age: 82,
      status: 'absent',
      lastActivity: 'há 2h',
      location: 'Desconhecido',
      isKnownLocation: false,
      latitude: -23.5505,
      longitude: -46.6333,
      color: '#34C759',
    },
    {
      id: '3',
      name: 'Carlos Santos',
      age: 68,
      status: 'online',
      lastActivity: 'há 15 min',
      location: 'Farmácia',
      isKnownLocation: true,
      color: '#007AFF',
    },
    {
      id: '4',
      name: 'Maria Oliveira',
      age: 79,
      status: 'online',
      lastActivity: 'há 1h',
      location: 'Parque',
      isKnownLocation: true,
      color: '#FFCC00',
    },
    {
      id: '5',
      name: 'João Pereira',
      age: 71,
      status: 'absent',
      lastActivity: 'há 4h',
      location: 'Desconhecido',
      isKnownLocation: false,
      latitude: -23.5515,
      longitude: -46.6343,
      color: '#5856D6',
    },
  ]);

  const filteredElderly = elderlyList.filter((elderly) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'online') return elderly.status === 'online';
    if (activeFilter === 'absent') return elderly.status === 'absent';
    return true;
  });

  const handleBack = () => {
    router.back();
  };

  const handleAddElderly = () => {
    router.push('/screens/registerElderlyScreen');
  };

  const handleElderlyDetails = (elderly: Elderly) => {
    console.log('Ver detalhes de:', elderly.name);
    // router.push(`/screens/elderlyDetailsScreen?id=${elderly.id}`);
  };

  const handleViewLocation = (elderly: Elderly) => {
    if (elderly.latitude && elderly.longitude) {
      Alert.alert(
        'Localização',
        `Ver localização de ${elderly.name} no mapa`,
        [{ text: 'OK' }]
      );
      // Navegar para o mapa com as coordenadas
    }
  };

  const getStatusColor = (status: 'online' | 'absent') => {
    return status === 'online' ? '#34C759' : '#FF9500';
  };

  const getStatusText = (status: 'online' | 'absent') => {
    return status === 'online' ? 'Online' : 'Ausente';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Idosos Cadastrados</Text>
        <TouchableOpacity style={styles.addHeaderButton} onPress={handleAddElderly}>
          <Ionicons name="add" size={28} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Filtros */}
      <View style={styles.filtersContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
        >
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === 'all' && styles.filterButtonActive,
            ]}
            onPress={() => setActiveFilter('all')}
          >
            <Text
              style={[
                styles.filterButtonText,
                activeFilter === 'all' && styles.filterButtonTextActive,
              ]}
            >
              Todos
            </Text>
            <View
              style={[
                styles.filterBadge,
                activeFilter === 'all' && styles.filterBadgeActive,
              ]}
            >
              <Text
                style={[
                  styles.filterBadgeText,
                  activeFilter === 'all' && styles.filterBadgeTextActive,
                ]}
              >
                {elderlyList.length}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === 'online' && styles.filterButtonActive,
            ]}
            onPress={() => setActiveFilter('online')}
          >
            <Text
              style={[
                styles.filterButtonText,
                activeFilter === 'online' && styles.filterButtonTextActive,
              ]}
            >
              Online
            </Text>
            <View
              style={[
                styles.filterBadge,
                activeFilter === 'online' && styles.filterBadgeActive,
              ]}
            >
              <Text
                style={[
                  styles.filterBadgeText,
                  activeFilter === 'online' && styles.filterBadgeTextActive,
                ]}
              >
                {elderlyList.filter((e) => e.status === 'online').length}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === 'absent' && styles.filterButtonActive,
            ]}
            onPress={() => setActiveFilter('absent')}
          >
            <Text
              style={[
                styles.filterButtonText,
                activeFilter === 'absent' && styles.filterButtonTextActive,
              ]}
            >
              Ausente
            </Text>
            <View
              style={[
                styles.filterBadge,
                activeFilter === 'absent' && styles.filterBadgeActive,
              ]}
            >
              <Text
                style={[
                  styles.filterBadgeText,
                  activeFilter === 'absent' && styles.filterBadgeTextActive,
                ]}
              >
                {elderlyList.filter((e) => e.status === 'absent').length}
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Lista de Idosos */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {filteredElderly.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={64} color="#ccc" />
            <Text style={styles.emptyStateText}>
              Nenhum idoso encontrado
            </Text>
            <Text style={styles.emptyStateSubtext}>
              Ajuste os filtros ou adicione novos idosos
            </Text>
          </View>
        ) : (
          filteredElderly.map((elderly) => (
            <TouchableOpacity
              key={elderly.id}
              style={styles.elderlyCard}
              onPress={() => handleElderlyDetails(elderly)}
              activeOpacity={0.7}
            >
              {/* Avatar e Info Principal */}
              <View style={styles.elderlyHeader}>
                <View style={[styles.elderlyAvatar, { backgroundColor: elderly.color }]}>
                  <Ionicons name="person" size={28} color="#fff" />
                </View>

                <View style={styles.elderlyMainInfo}>
                  <View style={styles.elderlyNameRow}>
                    <Text style={styles.elderlyName}>{elderly.name}</Text>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: getStatusColor(elderly.status) },
                      ]}
                    >
                      <Text style={styles.statusBadgeText}>
                        {getStatusText(elderly.status)}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.elderlyAge}>{elderly.age} anos</Text>
                </View>

                <Ionicons name="chevron-forward" size={24} color="#999" />
              </View>

              {/* Informações Adicionais */}
              <View style={styles.elderlyDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="time-outline" size={16} color="#666" />
                  <Text style={styles.detailLabel}>Última atividade:</Text>
                  <Text style={styles.detailValue}>{elderly.lastActivity}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Ionicons name="location-outline" size={16} color="#666" />
                  <Text style={styles.detailLabel}>Local:</Text>
                  {elderly.isKnownLocation ? (
                    <Text style={styles.detailValue}>{elderly.location}</Text>
                  ) : (
                    <TouchableOpacity
                      onPress={() => handleViewLocation(elderly)}
                      style={styles.locationLink}
                    >
                      <Text style={styles.locationLinkText}>Ver localização</Text>
                      <Ionicons name="chevron-forward" size={14} color="#007AFF" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Botão Flutuante */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleAddElderly}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
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
  addHeaderButton: {
    padding: 4,
  },
  filtersContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filtersContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  filterBadge: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 24,
    alignItems: 'center',
  },
  filterBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  filterBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666',
  },
  filterBadgeTextActive: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#999',
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 8,
  },
  elderlyCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  elderlyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  elderlyAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  elderlyMainInfo: {
    flex: 1,
  },
  elderlyNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  elderlyName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  elderlyAge: {
    fontSize: 14,
    color: '#666',
  },
  elderlyDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    color: '#1a1a1a',
    flex: 1,
  },
  locationLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  locationLinkText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
