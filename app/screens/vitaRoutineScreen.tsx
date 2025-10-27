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
}

interface VitaAnalysis {
  activeTime: string;
  activeTimeChange: number;
  locations: number;
  locationsStatus: string;
  health: number;
  healthStatus: string;
}

interface HealthMetric {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  backgroundColor: string;
}

export default function VitaRoutineScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [showElderlyPicker, setShowElderlyPicker] = useState(false);

  const [selectedElderly] = useState<Elderly>({
    id: '1',
    name: 'João Santos',
    status: 'online',
  });

  const [elderlyList] = useState<Elderly[]>([
    { id: '1', name: 'João Santos', status: 'online' },
    { id: '2', name: 'Ana Costa', status: 'offline' },
    { id: '3', name: 'Maria Silva', status: 'online' },
  ]);

  const [vitaAnalysis] = useState<VitaAnalysis>({
    activeTime: '4h 32min',
    activeTimeChange: 12,
    locations: 3,
    locationsStatus: 'Normal',
    health: 85,
    healthStatus: 'Bom',
  });

  const [healthMetrics] = useState<HealthMetric[]>([
    {
      id: '1',
      title: 'Qualidade do Sono',
      value: '8.2h',
      subtitle: '+0.5h vs média',
      icon: 'moon',
      color: '#34C759',
      backgroundColor: '#E8F8EC',
    },
    {
      id: '2',
      title: 'Atividade Física',
      value: '7.5k',
      subtitle: 'passos hoje',
      icon: 'walk',
      color: '#007AFF',
      backgroundColor: '#E8F4FF',
    },
    {
      id: '3',
      title: 'Tempo ao Ar Livre',
      value: '2h 15min',
      subtitle: 'exposição solar',
      icon: 'sunny',
      color: '#FF9500',
      backgroundColor: '#FFF3E5',
    },
    {
      id: '4',
      title: 'Medicamentos',
      value: '4/4',
      subtitle: 'doses tomadas',
      icon: 'medical',
      color: '#5856D6',
      backgroundColor: '#F0EFFF',
    },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    // Simular carregamento de dados
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerSpacer} />
        <Text style={styles.headerTitle}>Assistente VITA</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
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
          <Text style={styles.analyzingLabel}>Analisando dados de:</Text>
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
                    // setSelectedElderly(elderly);
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

        {/* Análise do Assistente VITA */}
        <View style={styles.vitaAnalysisCard}>
          <View style={styles.vitaHeader}>
            <View style={styles.vitaIconContainer}>
              <Ionicons name="analytics" size={24} color="#007AFF" />
            </View>
            <View style={styles.vitaHeaderText}>
              <Text style={styles.vitaTitle}>Análise do Assistente VITA</Text>
              <Text style={styles.vitaSubtitle}>Dados de hoje</Text>
            </View>
          </View>

          <View style={styles.metricsGrid}>
            {/* Tempo Ativo */}
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Tempo Ativo</Text>
              <Text style={styles.metricValue}>{vitaAnalysis.activeTime}</Text>
              <View style={styles.metricChange}>
                <Ionicons name="trending-up" size={14} color="#34C759" />
                <Text style={styles.metricChangeText}>
                  +{vitaAnalysis.activeTimeChange}% vs ontem
                </Text>
              </View>
            </View>

            {/* Locais */}
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Locais</Text>
              <Text style={styles.metricValue}>{vitaAnalysis.locations}</Text>
              <Text style={styles.metricStatus}>
                {vitaAnalysis.locationsStatus}
              </Text>
            </View>

            {/* Saúde */}
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Saúde</Text>
              <Text style={styles.metricValue}>{vitaAnalysis.health}%</Text>
              <Text style={[styles.metricStatus, styles.healthGood]}>
                {vitaAnalysis.healthStatus}
              </Text>
            </View>
          </View>
        </View>

        {/* Métricas de Saúde */}
        <View style={styles.healthMetricsSection}>
          <Text style={styles.sectionTitle}>Métricas de Saúde</Text>

          <View style={styles.healthMetricsGrid}>
            {healthMetrics.map((metric) => (
              <TouchableOpacity
                key={metric.id}
                style={[
                  styles.healthMetricCard,
                  { backgroundColor: metric.backgroundColor },
                ]}
                activeOpacity={0.7}
              >
                <View
                  style={[styles.metricIconCircle, { backgroundColor: metric.color }]}
                >
                  <Ionicons name={metric.icon} size={24} color="#fff" />
                </View>

                <Text style={styles.healthMetricTitle}>{metric.title}</Text>
                <Text style={[styles.healthMetricValue, { color: metric.color }]}>
                  {metric.value}
                </Text>
                <Text style={styles.healthMetricSubtitle}>{metric.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Insights e Recomendações */}
        <View style={styles.insightsSection}>
          <Text style={styles.sectionTitle}>Insights e Recomendações</Text>

          <View style={styles.insightCard}>
            <View style={styles.insightIcon}>
              <Ionicons name="checkmark-circle" size={24} color="#34C759" />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Ótima rotina de sono</Text>
              <Text style={styles.insightText}>
                João está dormindo acima da média. Continue incentivando bons hábitos noturnos.
              </Text>
            </View>
          </View>

          <View style={styles.insightCard}>
            <View style={styles.insightIcon}>
              <Ionicons name="alert-circle" size={24} color="#FF9500" />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Atenção: Hidratação</Text>
              <Text style={styles.insightText}>
                Incentive a ingestão de água. Recomendado: 2L por dia.
              </Text>
            </View>
          </View>

          <View style={styles.insightCard}>
            <View style={styles.insightIcon}>
              <Ionicons name="star" size={24} color="#5856D6" />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Medicamentos em dia</Text>
              <Text style={styles.insightText}>
                Todas as doses foram tomadas no horário correto. Excelente!
              </Text>
            </View>
          </View>
        </View>

        {/* Espaçamento inferior */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  headerSpacer: {
    width: 32,
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
  },
  elderlySelector: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 16,
  },
  analyzingLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
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
  vitaAnalysisCard: {
    backgroundColor: '#E8F4FF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#B3DDFF',
  },
  vitaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  vitaIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  vitaHeaderText: {
    flex: 1,
  },
  vitaTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 2,
  },
  vitaSubtitle: {
    fontSize: 14,
    color: '#007AFF',
    opacity: 0.8,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  metricItem: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricChangeText: {
    fontSize: 11,
    color: '#34C759',
    fontWeight: '600',
  },
  metricStatus: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  healthGood: {
    color: '#34C759',
    fontWeight: '600',
  },
  healthMetricsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  healthMetricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  healthMetricCard: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  metricIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  healthMetricTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 8,
  },
  healthMetricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  healthMetricSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  insightsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  insightCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  insightIcon: {
    marginRight: 12,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  insightText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 40,
  },
});
