import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scaleWidth, scaleHeight, scaleFontSize, scaleModerate } from '../../utils/responsive';

interface Location {
  id: string;
  name: string;
  address: string;
  associatedTo: string;
  category: string;
  startTime: string;
  endTime: string;
  days: string[];
}

export default function RegisterLocationsScreen() {
  const router = useRouter();
  const [locations, setLocations] = useState<Location[]>([
    {
      id: '1',
      name: 'Casa',
      address: 'Rua das Flores, 123',
      associatedTo: 'Maria Silva',
      category: 'Residência principal',
      startTime: '18:00',
      endTime: '08:00',
      days: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
    },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [associatedTo, setAssociatedTo] = useState('');
  const [category, setCategory] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  const categories = [
    { label: 'Residência principal', icon: 'home' },
    { label: 'Trabalho', icon: 'briefcase' },
    { label: 'Saúde', icon: 'medical' },
    { label: 'Lazer', icon: 'game-controller' },
    { label: 'Família', icon: 'people' },
    { label: 'Outros', icon: 'ellipsis-horizontal' },
  ];

  const getCategoryIcon = (categoryLabel: string): string => {
    const cat = categories.find(c => c.label === categoryLabel);
    return cat?.icon || 'location';
  };

  const handleBack = async () => {
    if (locations.length > 0) {
      await AsyncStorage.setItem('locationsRegistered', 'true');
    }
    router.back();
  };

  const handleAdd = () => {
    resetForm();
    setEditingId(null);
    setShowAddModal(true);
  };

  const handleEdit = (location: Location) => {
    setName(location.name);
    setAddress(location.address);
    setAssociatedTo(location.associatedTo);
    setCategory(location.category);
    setStartTime(location.startTime);
    setEndTime(location.endTime);
    setSelectedDays(location.days);
    setEditingId(location.id);
    setShowAddModal(true);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Confirmar exclusão',
      'Deseja realmente excluir esta localização?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setLocations(locations.filter(loc => loc.id !== id));
          },
        },
      ]
    );
  };

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const formatTime = (text: string) => {
    const numbers = text.replace(/\D/g, '');
    if (numbers.length <= 2) {
      return numbers;
    }
    return `${numbers.slice(0, 2)}:${numbers.slice(2, 4)}`;
  };

  const resetForm = () => {
    setName('');
    setAddress('');
    setAssociatedTo('');
    setCategory('');
    setStartTime('');
    setEndTime('');
    setSelectedDays([]);
  };

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha o nome do local.');
      return;
    }

    if (!address.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha o endereço.');
      return;
    }

    if (!associatedTo.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha o nome associado.');
      return;
    }

    if (!category) {
      Alert.alert('Atenção', 'Por favor, selecione uma categoria.');
      return;
    }

    if (!startTime || !endTime) {
      Alert.alert('Atenção', 'Por favor, preencha os horários.');
      return;
    }

    if (selectedDays.length === 0) {
      Alert.alert('Atenção', 'Por favor, selecione pelo menos um dia.');
      return;
    }

    const locationData: Location = {
      id: editingId || Date.now().toString(),
      name,
      address,
      associatedTo,
      category,
      startTime,
      endTime,
      days: selectedDays,
    };

    if (editingId) {
      setLocations(locations.map(loc => loc.id === editingId ? locationData : loc));
      setShowAddModal(false);
      resetForm();
    } else {
      setLocations([...locations, locationData]);
      setShowAddModal(false);
      resetForm();
      Alert.alert(
        'Sucesso',
        'Localização cadastrada com sucesso! Você pode adicionar mais localizações ou voltar para a configuração inicial.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Localizações</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Ionicons name="add" size={20} color="#007AFF" />
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Seção de ajuda */}
        <View style={styles.helpBox}>
          <View style={styles.helpHeader}>
            <Ionicons name="information-circle" size={20} color="#007AFF" />
            <Text style={styles.helpTitle}>Como funciona</Text>
          </View>
          <Text style={styles.helpText}>
            Cadastre locais importantes para facilitar o monitoramento dos idosos. Estes locais aparecerão no histórico de localização.
          </Text>
        </View>

        {/* Lista de localizações */}
        {locations.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="location-outline" size={64} color="#ccc" />
            <Text style={styles.emptyStateText}>Nenhuma localização cadastrada</Text>
            <Text style={styles.emptyStateSubtext}>
              Toque em &quot;+ Adicionar&quot; para cadastrar
            </Text>
          </View>
        ) : (
          locations.map((location) => (
            <View key={location.id} style={styles.locationCard}>
              <View style={styles.locationHeader}>
                <View style={styles.locationNameRow}>
                  <View style={styles.categoryIconCircle}>
                    <Ionicons name={getCategoryIcon(location.category) as any} size={20} color="#007AFF" />
                  </View>
                  <Text style={styles.locationName}>{location.name}</Text>
                </View>
                <View style={styles.locationActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleEdit(location)}
                  >
                    <Ionicons name="pencil" size={18} color="#007AFF" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDelete(location.id)}
                  >
                    <Ionicons name="trash-outline" size={18} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.locationInfo}>
                <View style={styles.infoRow}>
                  <Ionicons name="location-outline" size={16} color="#666" />
                  <Text style={styles.infoLabel}>Endereço:</Text>
                  <Text style={styles.infoText}>{location.address}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Ionicons name="person-outline" size={16} color="#666" />
                  <Text style={styles.infoLabel}>Associado à:</Text>
                  <Text style={styles.infoLink}>{location.associatedTo}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Ionicons name={getCategoryIcon(location.category) as any} size={16} color="#666" />
                  <Text style={styles.infoLabel}>Categoria:</Text>
                  <Text style={styles.infoText}>{location.category}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Ionicons name="time-outline" size={16} color="#666" />
                  <Text style={styles.infoLabel}>Horário:</Text>
                  <Text style={styles.infoText}>{location.startTime} - {location.endTime}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Ionicons name="calendar-outline" size={16} color="#666" />
                  <Text style={styles.infoLabel}>Dias:</Text>
                  <Text style={styles.infoText}>{location.days.join(', ')}</Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Modal de adicionar/editar */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowAddModal(false)}>
              <Text style={styles.modalCancel}>Cancelar</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              {editingId ? 'Editar Localização' : 'Nova Localização'}
            </Text>
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.modalSave}>Salvar</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome do local *</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Casa, Trabalho, Academia..."
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Endereço *</Text>
              <TextInput
                style={styles.input}
                placeholder="Rua, número, bairro"
                placeholderTextColor="#999"
                value={address}
                onChangeText={setAddress}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Associado à *</Text>
              <TextInput
                style={styles.input}
                placeholder="Nome do idoso"
                placeholderTextColor="#999"
                value={associatedTo}
                onChangeText={setAssociatedTo}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Categoria *</Text>
              <View style={styles.categoryGrid}>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat.label}
                    style={[
                      styles.categoryChip,
                      category === cat.label && styles.categoryChipSelected,
                    ]}
                    onPress={() => setCategory(cat.label)}
                  >
                    <Ionicons 
                      name={cat.icon as any} 
                      size={18} 
                      color={category === cat.label ? '#fff' : '#666'} 
                    />
                    <Text
                      style={[
                        styles.categoryChipText,
                        category === cat.label && styles.categoryChipTextSelected,
                      ]}
                    >
                      {cat.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.timeRow}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>Horário início *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="00:00"
                  placeholderTextColor="#999"
                  value={startTime}
                  onChangeText={(text) => setStartTime(formatTime(text))}
                  keyboardType="number-pad"
                  maxLength={5}
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>Horário fim *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="00:00"
                  placeholderTextColor="#999"
                  value={endTime}
                  onChangeText={(text) => setEndTime(formatTime(text))}
                  keyboardType="number-pad"
                  maxLength={5}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Dias da semana *</Text>
              <View style={styles.daysGrid}>
                {daysOfWeek.map((day) => (
                  <TouchableOpacity
                    key={day}
                    style={[
                      styles.dayChip,
                      selectedDays.includes(day) && styles.dayChipSelected,
                    ]}
                    onPress={() => toggleDay(day)}
                  >
                    <Text
                      style={[
                        styles.dayChipText,
                        selectedDays.includes(day) && styles.dayChipTextSelected,
                      ]}
                    >
                      {day.slice(0, 3)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
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
    paddingBottom: scaleHeight(16),
    borderBottomWidth: scaleWidth(1),
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: scaleWidth(4),
  },
  headerTitle: {
    fontSize: scaleFontSize(20),
    fontWeight: '600',
    color: '#1a1a1a',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(4),
  },
  addButtonText: {
    fontSize: scaleFontSize(16),
    color: '#007AFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: scaleWidth(20),
  },
  helpBox: {
    backgroundColor: '#E8F4FF',
    borderRadius: scaleModerate(12),
    padding: scaleWidth(16),
    marginBottom: scaleHeight(24),
    borderWidth: 1,
    borderColor: '#B3DDFF',
  },
  helpHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(8),
    marginBottom: scaleHeight(8),
  },
  helpTitle: {
    fontSize: scaleFontSize(16),
    fontWeight: '600',
    color: '#007AFF',
  },
  helpText: {
    fontSize: scaleFontSize(14),
    color: '#1a1a1a',
    lineHeight: scaleWidth(20),
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scaleHeight(60),
  },
  emptyStateText: {
    fontSize: scaleFontSize(18),
    fontWeight: '600',
    color: '#999',
    marginTop: scaleHeight(16),
  },
  emptyStateSubtext: {
    fontSize: scaleFontSize(14),
    color: '#ccc',
    marginTop: scaleHeight(8),
  },
  locationCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: scaleModerate(12),
    padding: scaleWidth(16),
    marginBottom: scaleHeight(16),
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scaleHeight(12),
  },
  locationNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(12),
    flex: 1,
  },
  categoryIconCircle: {
    width: scaleWidth(40),
    height: scaleWidth(40),
    borderRadius: scaleModerate(20),
    backgroundColor: '#E8F4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationName: {
    fontSize: scaleFontSize(18),
    fontWeight: '600',
    color: '#1a1a1a',
    flex: 1,
  },
  locationActions: {
    flexDirection: 'row',
    gap: scaleWidth(12),
  },
  actionButton: {
    padding: scaleWidth(4),
  },
  locationInfo: {
    gap: scaleWidth(8),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(8),
  },
  infoLabel: {
    fontSize: scaleFontSize(14),
    fontWeight: '600',
    color: '#666',
  },
  infoText: {
    fontSize: scaleFontSize(14),
    color: '#1a1a1a',
    flex: 1,
  },
  infoLink: {
    fontSize: scaleFontSize(14),
    color: '#007AFF',
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(20),
    paddingTop: scaleHeight(60),
    paddingBottom: scaleHeight(16),
    borderBottomWidth: scaleWidth(1),
    borderBottomColor: '#f0f0f0',
  },
  modalCancel: {
    fontSize: scaleFontSize(16),
    color: '#666',
  },
  modalTitle: {
    fontSize: scaleFontSize(18),
    fontWeight: '600',
    color: '#1a1a1a',
  },
  modalSave: {
    fontSize: scaleFontSize(16),
    color: '#007AFF',
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: scaleWidth(20),
  },
  inputGroup: {
    marginBottom: scaleHeight(20),
  },
  label: {
    fontSize: scaleFontSize(14),
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: scaleHeight(8),
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: scaleModerate(12),
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(14),
    fontSize: scaleFontSize(16),
    color: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scaleWidth(8),
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(8),
    backgroundColor: '#f5f5f5',
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(10),
    borderRadius: scaleModerate(20),
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryChipSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryChipText: {
    fontSize: scaleFontSize(14),
    color: '#666',
    fontWeight: '500',
  },
  categoryChipTextSelected: {
    color: '#fff',
  },
  timeRow: {
    flexDirection: 'row',
    gap: scaleWidth(12),
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scaleWidth(8),
  },
  dayChip: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: scaleWidth(12),
    paddingVertical: scaleHeight(8),
    borderRadius: scaleModerate(8),
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minWidth: scaleWidth(50),
    alignItems: 'center',
  },
  dayChipSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  dayChipText: {
    fontSize: scaleFontSize(13),
    color: '#666',
    fontWeight: '500',
  },
  dayChipTextSelected: {
    color: '#fff',
  },
});
