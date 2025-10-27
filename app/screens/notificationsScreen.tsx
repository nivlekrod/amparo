import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import WheelPicker from '@quidone/react-native-wheel-picker';

interface FrequencyConfig {
  type: 'daily' | 'weekly' | 'monthly';
  weekDays?: number[]; // 0-6 (domingo-sábado) - apenas para type='weekly'
  monthDays?: number[]; // 1-31 - apenas para type='monthly'
  label?: string;
}

interface Notification {
  id: string;
  title: string;
  description: string;
  associatedTo: string;
  associatedToColor: string;
  time: string;
  frequency: FrequencyConfig;
  sound: string;
  enabled: boolean;
}

export default function NotificationsScreen() {
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isCheckingPermission, setIsCheckingPermission] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Medicação - Manhã',
      description: 'Tomar remédio para pressão',
      associatedTo: 'Maria Silva',
      associatedToColor: '#FF3B30',
      time: '08:00',
      frequency: { type: 'daily', label: 'Diário' },
      sound: 'default',
      enabled: true,
    },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [associatedTo, setAssociatedTo] = useState('');
  const [associatedToColor, setAssociatedToColor] = useState('#FF3B30');
  const [selectedHour, setSelectedHour] = useState(8);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [frequencyType, setFrequencyType] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [selectedWeekDays, setSelectedWeekDays] = useState<number[]>([]);
  const [selectedMonthDays, setSelectedMonthDays] = useState<number[]>([]);
  const [sound, setSound] = useState('default');
  const [enabled, setEnabled] = useState(true);

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const hoursData = Array.from({ length: 24 }, (_, i) => ({
    value: i,
    label: i.toString().padStart(2, '0'),
  }));
  const minutesData = Array.from({ length: 60 }, (_, i) => ({
    value: i,
    label: i.toString().padStart(2, '0'),
  }));
  const sounds = [
    { label: 'Som padrão do sistema', value: 'default' },
    { label: 'Som de notificação 1', value: 'notification1' },
    { label: 'Som de notificação 2', value: 'notification2' },
    { label: 'Som de alarme', value: 'alarm' },
    { label: 'Som de lembrete', value: 'reminder' },
  ];

  const availableColors = [
    '#FF3B30', '#FF9500', '#FFCC00', '#34C759', '#00C7BE',
    '#30B0C7', '#007AFF', '#5856D6', '#AF52DE', '#FF2D55',
    '#A2845E', '#8E8E93',
  ];

  useEffect(() => {
    checkNotificationPermission();
  }, []);

  const checkNotificationPermission = async () => {
    try {
      // Simular verificação de permissão
      // Em produção, usar expo-notifications
      await new Promise(resolve => setTimeout(resolve, 500));
      setHasPermission(false);
      setIsCheckingPermission(false);
    } catch (error) {
      console.error('Erro ao verificar permissão:', error);
      setIsCheckingPermission(false);
    }
  };

  const requestNotificationPermission = async () => {
    try {
      // Simular solicitação de permissão
      // Em produção, usar expo-notifications
      Alert.alert(
        'Permissão de Notificações',
        'O sistema solicitará permissão para enviar notificações.',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Permitir',
            onPress: () => {
              setHasPermission(true);
              Alert.alert('Sucesso', 'Permissão concedida! Agora você pode adicionar lembretes.');
            },
          },
        ]
      );
    } catch (error) {
      console.error('Erro ao solicitar permissão:', error);
      Alert.alert('Erro', 'Não foi possível solicitar permissão de notificações.');
    }
  };

  const handleBack = () => {
    if (hasPermission) {
      router.push({
        pathname: '/screens/initialSetupScreen',
        params: { notificationsConfigured: 'true' },
      });
    } else {
      router.back();
    }
  };

  const handleAdd = () => {
    resetForm();
    setEditingId(null);
    setShowAddModal(true);
  };

  const handleEdit = (notification: Notification) => {
    setTitle(notification.title);
    setDescription(notification.description);
    setAssociatedTo(notification.associatedTo);
    setAssociatedToColor(notification.associatedToColor);
    
    // Parse time string (HH:MM) to hour and minute
    const [hour, minute] = notification.time.split(':').map(Number);
    setSelectedHour(hour);
    setSelectedMinute(minute);
    
    setFrequencyType(notification.frequency.type);
    setSelectedWeekDays(notification.frequency.weekDays || []);
    setSelectedMonthDays(notification.frequency.monthDays || []);
    setSound(notification.sound);
    setEnabled(notification.enabled);
    setEditingId(notification.id);
    setShowAddModal(true);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Confirmar exclusão',
      'Deseja realmente excluir esta notificação?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setNotifications(notifications.filter(notif => notif.id !== id));
          },
        },
      ]
    );
  };

  const toggleNotification = (id: string) => {
    setNotifications(
      notifications.map(notif =>
        notif.id === id ? { ...notif, enabled: !notif.enabled } : notif
      )
    );
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setAssociatedTo('');
    setAssociatedToColor('#FF3B30');
    setSelectedHour(8);
    setSelectedMinute(0);
    setFrequencyType('daily');
    setSelectedWeekDays([]);
    setSelectedMonthDays([]);
    setSound('default');
    setEnabled(true);
  };

  const formatTimeDisplay = (hour: number, minute: number): string => {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };

  const getFrequencyLabel = (freq: FrequencyConfig): string => {
    if (freq.label) return freq.label;
    
    switch (freq.type) {
      case 'daily':
        return 'Diário';
      case 'weekly':
        if (freq.weekDays) {
          const days = freq.weekDays.map(d => weekDays[d]).join(', ');
          return `Semanal: ${days}`;
        }
        return 'Semanal';
      case 'monthly':
        if (freq.monthDays) {
          const days = freq.monthDays.sort((a, b) => a - b).join(', ');
          return `Mensal: dia ${days}`;
        }
        return 'Mensal';
      default:
        return 'Não definido';
    }
  };

  const buildFrequencyConfig = (): FrequencyConfig => {
    switch (frequencyType) {
      case 'daily':
        return { type: 'daily', label: 'Diário' };
      case 'weekly':
        return {
          type: 'weekly',
          weekDays: selectedWeekDays,
        };
      case 'monthly':
        return {
          type: 'monthly',
          monthDays: selectedMonthDays,
        };
      default:
        return { type: 'daily' };
    }
  };

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha o título.');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha a descrição.');
      return;
    }

    if (!associatedTo.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha o nome do idoso.');
      return;
    }

    if (frequencyType === 'weekly' && selectedWeekDays.length === 0) {
      Alert.alert('Atenção', 'Por favor, selecione pelo menos um dia da semana.');
      return;
    }

    if (frequencyType === 'monthly' && selectedMonthDays.length === 0) {
      Alert.alert('Atenção', 'Por favor, selecione pelo menos um dia do mês.');
      return;
    }

    // Solicitar permissão apenas se a notificação estiver habilitada
    if (enabled && !hasPermission) {
      Alert.alert(
        'Permissão Necessária',
        'Para ativar notificações, é necessário conceder permissão.',
        [
          { text: 'Cancelar', style: 'cancel' },
          { 
            text: 'Configurar', 
            onPress: async () => {
              await requestNotificationPermission();
              // Após obter permissão, salvar
              saveNotification();
            }
          },
        ]
      );
      return;
    }

    saveNotification();
  };

  const saveNotification = () => {
    const notificationData: Notification = {
      id: editingId || Date.now().toString(),
      title,
      description,
      associatedTo,
      associatedToColor,
      time: formatTimeDisplay(selectedHour, selectedMinute),
      frequency: buildFrequencyConfig(),
      sound,
      enabled,
    };

    if (editingId) {
      setNotifications(notifications.map(notif => notif.id === editingId ? notificationData : notif));
    } else {
      setNotifications([...notifications, notificationData]);
    }

    setShowAddModal(false);
    resetForm();
  };

  const testSound = () => {
    const selectedSound = sounds.find(s => s.value === sound);
    Alert.alert(
      'Testar Som',
      `O som "${selectedSound?.label}" será reproduzido usando o som de notificação padrão do sistema.`,
      [
        { text: 'OK' }
      ]
    );
    // Em produção, usar expo-notifications para tocar o som do sistema
    // await Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: 'Teste de Som',
    //     sound: sound,
    //   },
    //   trigger: null,
    // });
  };

  return (
    <View style={styles.container}>
      {isCheckingPermission ? (
        <View style={styles.loadingContainer}>
          <Ionicons name="notifications" size={64} color="#007AFF" />
          <Text style={styles.loadingText}>Verificando permissões...</Text>
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Ionicons name="arrow-back" size={24} color="#007AFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Notificações</Text>
            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
              <Ionicons name="add" size={20} color="#007AFF" />
              <Text style={styles.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            {/* Banner de permissão */}
            {!hasPermission && (
              <View style={styles.permissionBanner}>
                <View style={styles.permissionBannerContent}>
                  <Ionicons name="notifications-off" size={24} color="#FF3B30" />
                  <View style={styles.permissionBannerText}>
                    <Text style={styles.permissionBannerTitle}>Notificações Desativadas</Text>
                    <Text style={styles.permissionBannerSubtitle}>
                      Ative para receber alertas importantes
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.permissionBannerButton}
                  onPress={requestNotificationPermission}
                >
                  <Text style={styles.permissionBannerButtonText}>Ativar</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Seção de ajuda */}
            <View style={styles.helpBox}>
              <View style={styles.helpHeader}>
                <Ionicons name="information-circle" size={20} color="#007AFF" />
                <Text style={styles.helpTitle}>Como funciona</Text>
              </View>
              <Text style={styles.helpText}>
                Configure alertas personalizados para cada idoso. Receba notificações sobre medicamentos, consultas e eventos importantes.
              </Text>
            </View>

            {/* Lista de notificações */}
            {notifications.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="notifications-outline" size={64} color="#ccc" />
                <Text style={styles.emptyStateText}>Nenhuma notificação cadastrada</Text>
                <Text style={styles.emptyStateSubtext}>
                  Toque em &quot;+ Adicionar&quot; para cadastrar
                </Text>
              </View>
            ) : (
              notifications.map((notification) => (
                <View key={notification.id} style={styles.notificationCard}>
                  <View style={styles.notificationHeader}>
                    <View style={styles.notificationTitleRow}>
                      <Text style={styles.notificationTitle}>{notification.title}</Text>
                      <Switch
                        value={notification.enabled}
                        onValueChange={() => toggleNotification(notification.id)}
                        trackColor={{ false: '#ccc', true: '#34C759' }}
                        thumbColor="#fff"
                      />
                    </View>
                    <View style={styles.notificationActions}>
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleEdit(notification)}
                      >
                        <Ionicons name="pencil" size={18} color="#007AFF" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleDelete(notification.id)}
                      >
                        <Ionicons name="trash-outline" size={18} color="#FF3B30" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.notificationInfo}>
                    <Text style={styles.notificationDescription}>{notification.description}</Text>

                    <View style={styles.infoRow}>
                      <Ionicons name="person-outline" size={16} color="#666" />
                      <Text style={styles.infoLabel}>Associado a:</Text>
                      <Text style={[styles.infoAssociated, { color: notification.associatedToColor }]}>
                        {notification.associatedTo}
                      </Text>
                    </View>

                    <View style={styles.infoRow}>
                      <Ionicons name="time-outline" size={16} color="#666" />
                      <Text style={styles.infoLabel}>Horário:</Text>
                      <Text style={styles.infoText}>{notification.time}</Text>
                    </View>

                    <View style={styles.infoRow}>
                      <Ionicons name="calendar-outline" size={16} color="#666" />
                      <Text style={styles.infoLabel}>Frequência:</Text>
                      <Text style={styles.infoText}>{getFrequencyLabel(notification.frequency)}</Text>
                    </View>

                    <View style={styles.infoRow}>
                      <Ionicons name="volume-high-outline" size={16} color="#666" />
                      <Text style={styles.infoLabel}>Som:</Text>
                      <Text style={styles.infoText}>
                        {sounds.find(s => s.value === notification.sound)?.label}
                      </Text>
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
                  {editingId ? 'Editar Notificação' : 'Nova Notificação'}
                </Text>
                <TouchableOpacity onPress={handleSave}>
                  <Text style={styles.modalSave}>Salvar</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalContent}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Título *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: Medicação - Manhã"
                    placeholderTextColor="#999"
                    value={title}
                    onChangeText={setTitle}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Descrição *</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Descreva o alerta"
                    placeholderTextColor="#999"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={3}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Nome do idoso *</Text>
                  <View style={styles.nameColorRow}>
                    <TextInput
                      style={[styles.input, styles.nameInput]}
                      placeholder="Ex: Maria Silva"
                      placeholderTextColor="#999"
                      value={associatedTo}
                      onChangeText={setAssociatedTo}
                    />
                    <TouchableOpacity
                      style={[styles.colorButton, { backgroundColor: associatedToColor }]}
                      onPress={() => setShowColorPicker(!showColorPicker)}
                    >
                      <Ionicons name="color-palette" size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>
                  {showColorPicker && (
                    <View style={styles.colorPicker}>
                      <Text style={styles.colorPickerLabel}>Escolha a cor:</Text>
                      <View style={styles.colorGrid}>
                        {availableColors.map((color) => (
                          <TouchableOpacity
                            key={color}
                            style={[
                              styles.colorOption,
                              { backgroundColor: color },
                              associatedToColor === color && styles.colorOptionSelected,
                            ]}
                            onPress={() => {
                              setAssociatedToColor(color);
                              setShowColorPicker(false);
                            }}
                          >
                            {associatedToColor === color && (
                              <Ionicons name="checkmark" size={20} color="#fff" />
                            )}
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  )}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Horário *</Text>
                  <View style={styles.timePickerContainer}>
                    {/* Hour Picker */}
                    <View style={styles.wheelPickerWrapper}>
                      <WheelPicker
                        data={hoursData}
                        value={selectedHour}
                        onValueChanged={({ item }) => setSelectedHour(item.value)}
                        itemHeight={50}
                        width={80}
                      />
                    </View>

                    <Text style={styles.timeSeparator}>:</Text>

                    {/* Minute Picker */}
                    <View style={styles.wheelPickerWrapper}>
                      <WheelPicker
                        data={minutesData}
                        value={selectedMinute}
                        onValueChanged={({ item }) => setSelectedMinute(item.value)}
                        itemHeight={50}
                        width={80}
                      />
                    </View>
                  </View>
                  
                  {/* Display selected time */}
                  <View style={styles.timeDisplay}>
                    <Ionicons name="time-outline" size={16} color="#007AFF" />
                    <Text style={styles.timeDisplayText}>
                      Horário selecionado: {formatTimeDisplay(selectedHour, selectedMinute)}
                    </Text>
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Frequência *</Text>
                  
                  {/* Tipo de frequência */}
                  <View style={styles.frequencyGrid}>
                    <TouchableOpacity
                      style={[
                        styles.frequencyChip,
                        frequencyType === 'daily' && styles.frequencyChipSelected,
                      ]}
                      onPress={() => {
                        setFrequencyType('daily');
                        setSelectedWeekDays([]);
                        setSelectedMonthDays([]);
                      }}
                    >
                      <Text
                        style={[
                          styles.frequencyChipText,
                          frequencyType === 'daily' && styles.frequencyChipTextSelected,
                        ]}
                      >
                        Todos os dias
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.frequencyChip,
                        frequencyType === 'weekly' && styles.frequencyChipSelected,
                      ]}
                      onPress={() => {
                        setFrequencyType('weekly');
                        setSelectedMonthDays([]);
                      }}
                    >
                      <Text
                        style={[
                          styles.frequencyChipText,
                          frequencyType === 'weekly' && styles.frequencyChipTextSelected,
                        ]}
                      >
                        Dias da semana
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.frequencyChip,
                        frequencyType === 'monthly' && styles.frequencyChipSelected,
                      ]}
                      onPress={() => {
                        setFrequencyType('monthly');
                        setSelectedWeekDays([]);
                      }}
                    >
                      <Text
                        style={[
                          styles.frequencyChipText,
                          frequencyType === 'monthly' && styles.frequencyChipTextSelected,
                        ]}
                      >
                        Dias do mês
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Dias da semana */}
                  {frequencyType === 'weekly' && (
                    <View style={styles.daysSelector}>
                      <Text style={styles.subLabel}>Selecione os dias</Text>
                      <View style={styles.daysGrid}>
                        {weekDays.map((day, index) => {
                          const isSelected = selectedWeekDays.includes(index);
                          return (
                            <TouchableOpacity
                              key={day}
                              style={[
                                styles.dayChip,
                                isSelected && styles.dayChipSelected,
                              ]}
                              onPress={() => {
                                if (isSelected) {
                                  setSelectedWeekDays(selectedWeekDays.filter(d => d !== index));
                                } else {
                                  setSelectedWeekDays([...selectedWeekDays, index].sort());
                                }
                              }}
                            >
                              <Text
                                style={[
                                  styles.dayChipText,
                                  isSelected && styles.dayChipTextSelected,
                                ]}
                              >
                                {day}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </View>
                  )}

                  {/* Dias do mês */}
                  {frequencyType === 'monthly' && (
                    <View style={styles.daysSelector}>
                      <Text style={styles.subLabel}>Selecione os dias do mês</Text>
                      <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        style={styles.monthDaysScroll}
                      >
                        <View style={styles.monthDaysGrid}>
                          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                            const isSelected = selectedMonthDays.includes(day);
                            return (
                              <TouchableOpacity
                                key={day}
                                style={[
                                  styles.monthDayChip,
                                  isSelected && styles.monthDayChipSelected,
                                ]}
                                onPress={() => {
                                  if (isSelected) {
                                    setSelectedMonthDays(selectedMonthDays.filter(d => d !== day));
                                  } else {
                                    setSelectedMonthDays([...selectedMonthDays, day].sort((a, b) => a - b));
                                  }
                                }}
                              >
                                <Text
                                  style={[
                                    styles.monthDayChipText,
                                    isSelected && styles.monthDayChipTextSelected,
                                  ]}
                                >
                                  {day}
                                </Text>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      </ScrollView>
                    </View>
                  )}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Som da notificação</Text>
                  <Text style={styles.soundHelp}>
                    Os sons utilizados são os padrões do sistema operacional
                  </Text>
                  <View style={styles.soundSelector}>
                    {sounds.map((s) => (
                      <TouchableOpacity
                        key={s.value}
                        style={[
                          styles.soundOption,
                          sound === s.value && styles.soundOptionSelected,
                        ]}
                        onPress={() => setSound(s.value)}
                      >
                        <Ionicons
                          name={sound === s.value ? 'radio-button-on' : 'radio-button-off'}
                          size={20}
                          color={sound === s.value ? '#007AFF' : '#999'}
                        />
                        <Text
                          style={[
                            styles.soundOptionText,
                            sound === s.value && styles.soundOptionTextSelected,
                          ]}
                        >
                          {s.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <TouchableOpacity style={styles.testSoundButton} onPress={testSound}>
                    <Ionicons name="play-circle-outline" size={20} color="#007AFF" />
                    <Text style={styles.testSoundButtonText}>Testar som</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.switchGroup}>
                  <View>
                    <Text style={styles.switchLabel}>Notificação ativa</Text>
                    <Text style={styles.switchSubtitle}>
                      Desative para pausar temporariamente
                    </Text>
                  </View>
                  <Switch
                    value={enabled}
                    onValueChange={setEnabled}
                    trackColor={{ false: '#ccc', true: '#34C759' }}
                    thumbColor="#fff"
                  />
                </View>
              </ScrollView>
            </View>
          </Modal>
        </>
      )}
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
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  permissionBanner: {
    backgroundColor: '#FFF3F3',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  permissionBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  permissionBannerText: {
    flex: 1,
  },
  permissionBannerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
    marginBottom: 4,
  },
  permissionBannerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  permissionBannerButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  permissionBannerButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  helpBox: {
    backgroundColor: '#E8F4FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#B3DDFF',
  },
  helpHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  helpText: {
    fontSize: 14,
    color: '#1a1a1a',
    lineHeight: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
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
  notificationCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  notificationHeader: {
    marginBottom: 12,
  },
  notificationTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    flex: 1,
  },
  notificationActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    padding: 4,
  },
  notificationInfo: {
    gap: 8,
  },
  notificationDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  infoText: {
    fontSize: 14,
    color: '#1a1a1a',
    flex: 1,
  },
  infoAssociated: {
    fontSize: 14,
    fontWeight: '600',
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalCancel: {
    fontSize: 16,
    color: '#666',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  modalSave: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
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
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  nameColorRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  nameInput: {
    flex: 1,
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
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
  colorPicker: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  colorPickerLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorOption: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'transparent',
  },
  colorOptionSelected: {
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
  elderlyGrid: {
    gap: 8,
  },
  elderlyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    gap: 10,
  },
  elderlyChipSelected: {
    backgroundColor: '#fff',
    borderWidth: 2,
  },
  elderlyColorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  elderlyChipText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  frequencyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  frequencyChip: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  frequencyChipSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  frequencyChipText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  frequencyChipTextSelected: {
    color: '#fff',
  },
  timePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    paddingVertical: 20,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  wheelPickerWrapper: {
    width: 80,
    height: 200,
    overflow: 'hidden',
  },
  timeSeparator: {
    fontSize: 32,
    color: '#007AFF',
    fontWeight: '700',
  },
  timeDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    padding: 12,
    backgroundColor: '#E8F4FF',
    borderRadius: 8,
  },
  timeDisplayText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  daysSelector: {
    marginTop: 16,
  },
  subLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dayChip: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  dayChipSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  dayChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  dayChipTextSelected: {
    color: '#fff',
  },
  monthDaysScroll: {
    maxHeight: 120,
  },
  monthDaysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingRight: 16,
  },
  monthDayChip: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  monthDayChipSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  monthDayChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  monthDayChipTextSelected: {
    color: '#fff',
  },
  soundSelector: {
    gap: 12,
  },
  soundHelp: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  soundOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  soundOptionSelected: {},
  soundOptionText: {
    fontSize: 16,
    color: '#666',
  },
  soundOptionTextSelected: {
    color: '#007AFF',
    fontWeight: '500',
  },
  testSoundButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#E8F4FF',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 12,
  },
  testSoundButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  switchGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  switchSubtitle: {
    fontSize: 13,
    color: '#666',
  },
});