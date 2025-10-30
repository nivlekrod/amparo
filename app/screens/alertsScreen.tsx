import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert as RNAlert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { scaleWidth, scaleHeight, scaleFontSize, scaleModerate } from '../../utils/responsive';

type AlertType = 'urgent' | 'info' | 'warning' | 'success' | 'reminder';
type FilterType = 'all' | 'urgent' | 'informative';

interface AlertItem {
  id: string;
  type: AlertType;
  elderlyName: string;
  message: string;
  time: string;
  isRead: boolean;
  icon: keyof typeof Ionicons.glyphMap;
}

export default function AlertsScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [alerts, setAlerts] = useState<AlertItem[]>([
    {
      id: '1',
      type: 'urgent',
      elderlyName: 'João Santos',
      message: 'João Santos apresentou batimentos de 120 bpm às 14:30',
      time: 'há 5 min',
      isRead: false,
      icon: 'heart',
    },
    {
      id: '2',
      type: 'info',
      elderlyName: 'Ana Costa',
      message: 'Ana Costa tomou Losartana conforme prescrição',
      time: 'há 15 min',
      isRead: false,
      icon: 'medical',
    },
    {
      id: '3',
      type: 'warning',
      elderlyName: 'Pedro Oliveira',
      message: 'Pedro Oliveira pode ter sofrido uma queda às 13:45',
      time: 'há 1h',
      isRead: false,
      icon: 'warning',
    },
    {
      id: '4',
      type: 'success',
      elderlyName: 'Maria Ferreira',
      message: 'Maria Ferreira fez check-in de segurança às 12:00',
      time: 'há 2h',
      isRead: false,
      icon: 'checkmark-circle',
    },
    {
      id: '5',
      type: 'reminder',
      elderlyName: 'José Silva',
      message: 'Lembrete: José Silva deve tomar medicação para pressão às 15:00',
      time: 'há 3h',
      isRead: false,
      icon: 'notifications',
    },
    {
      id: '6',
      type: 'info',
      elderlyName: 'Carlos Santos',
      message: 'Carlos Santos concluiu caminhada diária de 30 minutos',
      time: 'há 4h',
      isRead: true,
      icon: 'walk',
    },
    {
      id: '7',
      type: 'urgent',
      elderlyName: 'Ana Costa',
      message: 'Ana Costa saiu da zona de segurança às 10:15',
      time: 'há 5h',
      isRead: true,
      icon: 'location',
    },
  ]);

  const getAlertConfig = (type: AlertType) => {
    switch (type) {
      case 'urgent':
        return {
          label: 'URGENTE',
          color: '#FF3B30',
          backgroundColor: '#FFE5E5',
          borderColor: '#FFCDD2',
        };
      case 'info':
        return {
          label: 'INFO',
          color: '#007AFF',
          backgroundColor: '#E8F4FF',
          borderColor: '#B3DDFF',
        };
      case 'warning':
        return {
          label: 'ATENÇÃO',
          color: '#FF9500',
          backgroundColor: '#FFF3E5',
          borderColor: '#FFE0B2',
        };
      case 'success':
        return {
          label: 'OK',
          color: '#34C759',
          backgroundColor: '#E8F8EC',
          borderColor: '#B8E6C3',
        };
      case 'reminder':
        return {
          label: 'LEMBRETE',
          color: '#5856D6',
          backgroundColor: '#F0EFFF',
          borderColor: '#D0CFFF',
        };
      default:
        return {
          label: 'INFO',
          color: '#666',
          backgroundColor: '#f5f5f5',
          borderColor: '#e0e0e0',
        };
    }
  };

  const filteredAlerts = alerts.filter((alert) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'urgent') return alert.type === 'urgent' || alert.type === 'warning';
    if (activeFilter === 'informative') return alert.type === 'info' || alert.type === 'success' || alert.type === 'reminder';
    return true;
  });

  const unreadCount = alerts.filter((alert) => !alert.isRead).length;

  const handleBack = () => {
    router.back();
  };

  const handleMarkAllAsRead = () => {
    RNAlert.alert(
      'Marcar todos como lidos',
      'Deseja marcar todos os alertas como lidos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: () => {
            setAlerts(alerts.map((alert) => ({ ...alert, isRead: true })));
          },
        },
      ]
    );
  };

  const handleMarkAsRead = (id: string) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id ? { ...alert, isRead: true } : alert
      )
    );
  };

  const handleAlertPress = (alert: AlertItem) => {
    console.log('Ver detalhes do alerta:', alert.elderlyName);
    // Navegar para detalhes do alerta ou do idoso
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerSpacer} />
        <Text style={styles.headerTitle}>Alertas</Text>
        <TouchableOpacity onPress={handleMarkAllAsRead}>
          <Text style={styles.markAllButton}>Marcar todos</Text>
        </TouchableOpacity>
      </View>

      {/* Badge de alertas não lidos */}
      {unreadCount > 0 && (
        <View style={styles.unreadBanner}>
          <Ionicons name="notifications" size={20} color="#FF3B30" />
          <Text style={styles.unreadBannerText}>
            Você tem {unreadCount} {unreadCount === 1 ? 'alerta não lido' : 'alertas não lidos'}
          </Text>
        </View>
      )}

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
                {alerts.length}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === 'urgent' && styles.filterButtonActive,
            ]}
            onPress={() => setActiveFilter('urgent')}
          >
            <Text
              style={[
                styles.filterButtonText,
                activeFilter === 'urgent' && styles.filterButtonTextActive,
              ]}
            >
              Urgentes
            </Text>
            <View
              style={[
                styles.filterBadge,
                activeFilter === 'urgent' && styles.filterBadgeActive,
              ]}
            >
              <Text
                style={[
                  styles.filterBadgeText,
                  activeFilter === 'urgent' && styles.filterBadgeTextActive,
                ]}
              >
                {alerts.filter((a) => a.type === 'urgent' || a.type === 'warning').length}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === 'informative' && styles.filterButtonActive,
            ]}
            onPress={() => setActiveFilter('informative')}
          >
            <Text
              style={[
                styles.filterButtonText,
                activeFilter === 'informative' && styles.filterButtonTextActive,
              ]}
            >
              Informativos
            </Text>
            <View
              style={[
                styles.filterBadge,
                activeFilter === 'informative' && styles.filterBadgeActive,
              ]}
            >
              <Text
                style={[
                  styles.filterBadgeText,
                  activeFilter === 'informative' && styles.filterBadgeTextActive,
                ]}
              >
                {alerts.filter((a) => a.type === 'info' || a.type === 'success' || a.type === 'reminder').length}
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Lista de Alertas */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {filteredAlerts.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="notifications-off-outline" size={64} color="#ccc" />
            <Text style={styles.emptyStateText}>Nenhum alerta encontrado</Text>
            <Text style={styles.emptyStateSubtext}>
              Ajuste os filtros para ver mais alertas
            </Text>
          </View>
        ) : (
          filteredAlerts.map((alert) => {
            const config = getAlertConfig(alert.type);
            return (
              <TouchableOpacity
                key={alert.id}
                style={[
                  styles.alertCard,
                  !alert.isRead && styles.alertCardUnread,
                  { borderLeftColor: config.color },
                ]}
                onPress={() => handleAlertPress(alert)}
                activeOpacity={0.7}
              >
                {/* Indicador de não lido */}
                {!alert.isRead && <View style={styles.unreadDot} />}

                {/* Cabeçalho do Alerta */}
                <View style={styles.alertHeader}>
                  <View
                    style={[
                      styles.alertIcon,
                      { backgroundColor: config.backgroundColor },
                    ]}
                  >
                    <Ionicons name={alert.icon} size={24} color={config.color} />
                  </View>

                  <View style={styles.alertHeaderInfo}>
                    <View style={styles.alertTitleRow}>
                      <View
                        style={[
                          styles.typeBadge,
                          {
                            backgroundColor: config.backgroundColor,
                            borderColor: config.borderColor,
                          },
                        ]}
                      >
                        <Text style={[styles.typeBadgeText, { color: config.color }]}>
                          {config.label}
                        </Text>
                      </View>
                      <Text style={styles.alertTime}>{alert.time}</Text>
                    </View>
                    <Text style={styles.elderlyName}>{alert.elderlyName}</Text>
                  </View>
                </View>

                {/* Mensagem do Alerta */}
                <Text style={styles.alertMessage}>{alert.message}</Text>

                {/* Ação */}
                {!alert.isRead && (
                  <TouchableOpacity
                    style={styles.markAsReadButton}
                    onPress={() => handleMarkAsRead(alert.id)}
                  >
                    <Ionicons name="checkmark-circle-outline" size={18} color="#007AFF" />
                    <Text style={styles.markAsReadButtonText}>Marcar como lido</Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            );
          })
        )}
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
    borderBottomWidth: scaleWidth(1),
    borderBottomColor: '#e0e0e0',
  },
  headerSpacer: {
    width: scaleWidth(32),
  },
  headerTitle: {
    fontSize: scaleFontSize(20),
    fontWeight: '700',
    color: '#1a1a1a',
  },
  markAllButton: {
    fontSize: scaleFontSize(14),
    fontWeight: '600',
    color: '#007AFF',
  },
  unreadBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(8),
    backgroundColor: '#FFE5E5',
    paddingHorizontal: scaleWidth(20),
    paddingVertical: scaleHeight(12),
    borderBottomWidth: scaleWidth(1),
    borderBottomColor: '#FFCDD2',
  },
  unreadBannerText: {
    fontSize: scaleFontSize(14),
    fontWeight: '600',
    color: '#FF3B30',
  },
  filtersContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: scaleWidth(1),
    borderBottomColor: '#e0e0e0',
  },
  filtersContent: {
    paddingHorizontal: scaleWidth(20),
    paddingVertical: scaleHeight(16),
    gap: scaleWidth(12),
  },
  filterButton: {
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
  filterButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: scaleFontSize(15),
    fontWeight: '600',
    color: '#666',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  filterBadge: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: scaleWidth(8),
    paddingVertical: scaleHeight(2),
    borderRadius: scaleModerate(10),
    minWidth: scaleWidth(24),
    alignItems: 'center',
  },
  filterBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  filterBadgeText: {
    fontSize: scaleFontSize(12),
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
    padding: scaleWidth(20),
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scaleHeight(80),
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
  alertCard: {
    backgroundColor: '#fff',
    borderRadius: scaleModerate(12),
    padding: scaleWidth(16),
    marginBottom: scaleHeight(16),
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderLeftWidth: scaleWidth(4),
    position: 'relative',
  },
  alertCardUnread: {
    backgroundColor: '#f9f9f9',
  },
  unreadDot: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: scaleWidth(10),
    height: scaleWidth(10),
    borderRadius: scaleModerate(5),
    backgroundColor: '#FF3B30',
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: scaleHeight(12),
  },
  alertIcon: {
    width: scaleWidth(48),
    height: scaleWidth(48),
    borderRadius: scaleModerate(24),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  alertHeaderInfo: {
    flex: 1,
  },
  alertTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scaleHeight(4),
  },
  typeBadge: {
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(4),
    borderRadius: scaleModerate(6),
    borderWidth: 1,
  },
  typeBadgeText: {
    fontSize: scaleFontSize(11),
    fontWeight: '700',
  },
  alertTime: {
    fontSize: scaleFontSize(12),
    color: '#999',
    fontWeight: '500',
  },
  elderlyName: {
    fontSize: scaleFontSize(14),
    fontWeight: '600',
    color: '#666',
  },
  alertMessage: {
    fontSize: scaleFontSize(15),
    color: '#1a1a1a',
    lineHeight: scaleWidth(22),
    marginBottom: scaleHeight(12),
  },
  markAsReadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(6),
    paddingVertical: scaleHeight(8),
    paddingHorizontal: scaleWidth(12),
    backgroundColor: '#E8F4FF',
    borderRadius: scaleModerate(8),
    alignSelf: 'flex-start',
  },
  markAsReadButtonText: {
    fontSize: scaleFontSize(14),
    fontWeight: '600',
    color: '#007AFF',
  },
});
