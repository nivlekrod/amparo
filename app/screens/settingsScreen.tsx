import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { scaleWidth, scaleHeight, scaleFontSize, scaleModerate } from '../../utils/responsive';

interface Elderly {
  id: string;
  name: string;
  age: number;
  status: 'online' | 'offline';
}

export default function SettingsScreen() {
  const router = useRouter();
  
  const [caregiver] = useState({
    name: 'Maria Silva',
    email: 'maria.silva@email.com',
    role: 'Cuidadora',
    avatar: null,
  });

  const [elderlyList] = useState<Elderly[]>([
    { id: '1', name: 'José Silva', age: 75, status: 'online' },
    { id: '2', name: 'Ana Costa', age: 82, status: 'offline' },
  ]);

  const handleBack = () => {
    router.back();
  };

  const handleEditProfile = () => {
    router.push('/screens/editProfileScreen');
  };

  const handleAddElderly = () => {
    router.push('/screens/registerElderlyScreen');
  };

  const handleViewAllElderly = () => {
    router.push('/screens/elderlyListScreen');
  };

  const handlePrivacy = () => {
    console.log('Privacidade e segurança');
    // router.push('/screens/privacyScreen');
  };

  const handleNotifications = () => {
    router.push('/screens/notificationsScreen');
  };

  const handleLocations = () => {
    router.push('/screens/registerLocationsScreen');
  };

  const handleHelp = () => {
    console.log('Ajuda e suporte');
    // router.push('/screens/helpScreen');
  };

  const handleAbout = () => {
    console.log('Sobre o Amparo');
    // router.push('/screens/aboutScreen');
  };

  const handleLogout = () => {
    console.log('Sair da conta');
    // Implementar logout
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configurações</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content}>
        {/* Card do Cuidador */}
        <View style={styles.caregiverCard}>
          <View style={styles.avatarContainer}>
            {caregiver.avatar ? (
              <Image source={{ uri: caregiver.avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={40} color="#007AFF" />
              </View>
            )}
          </View>
          
          <View style={styles.caregiverInfo}>
            <Text style={styles.caregiverName}>{caregiver.name}</Text>
            <Text style={styles.caregiverEmail}>{caregiver.email}</Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>{caregiver.role}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditProfile}
          >
            <Ionicons name="pencil" size={18} color="#007AFF" />
            <Text style={styles.editButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>

        {/* Idosos Cadastrados */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Idosos Cadastrados</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddElderly}
            >
              <Ionicons name="add-circle" size={20} color="#007AFF" />
              <Text style={styles.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.elderlyList}>
            {elderlyList.slice(0, 2).map((elderly) => (
              <View key={elderly.id} style={styles.elderlyItem}>
                <View style={styles.elderlyAvatar}>
                  <Ionicons name="person-outline" size={20} color="#666" />
                </View>
                <View style={styles.elderlyInfo}>
                  <Text style={styles.elderlyName}>{elderly.name}</Text>
                  <Text style={styles.elderlyAge}>{elderly.age} anos</Text>
                </View>
                <View
                  style={[
                    styles.statusDot,
                    elderly.status === 'online'
                      ? styles.statusOnline
                      : styles.statusOffline,
                  ]}
                />
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={handleViewAllElderly}
          >
            <Text style={styles.viewAllButtonText}>Ver Todos os Idosos</Text>
            <Ionicons name="chevron-forward" size={18} color="#007AFF" />
          </TouchableOpacity>
        </View>

        {/* Configurações Gerais */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configurações Gerais</Text>

          <View style={styles.settingsList}>
            {/* Privacidade */}
            <TouchableOpacity
              style={styles.settingItem}
              onPress={handlePrivacy}
            >
              <View style={[styles.settingIcon, styles.iconGreen]}>
                <Ionicons name="lock-closed" size={22} color="#34C759" />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Privacidade</Text>
                <Text style={styles.settingSubtitle}>Dados e segurança</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            {/* Notificações */}
            <TouchableOpacity
              style={styles.settingItem}
              onPress={handleNotifications}
            >
              <View style={[styles.settingIcon, styles.iconYellow]}>
                <Ionicons name="notifications" size={22} color="#FFCC00" />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Notificações</Text>
                <Text style={styles.settingSubtitle}>
                  Cadastrar e gerenciar alertas
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            {/* Localizações */}
            <TouchableOpacity
              style={styles.settingItem}
              onPress={handleLocations}
            >
              <View style={[styles.settingIcon, styles.iconBlue]}>
                <Ionicons name="location" size={22} color="#007AFF" />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Localizações</Text>
                <Text style={styles.settingSubtitle}>
                  Gerenciar locais cadastrados
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            {/* Ajuda e Suporte */}
            <TouchableOpacity
              style={styles.settingItem}
              onPress={handleHelp}
            >
              <View style={[styles.settingIcon, styles.iconPurple]}>
                <Ionicons name="help-circle" size={22} color="#5856D6" />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Ajuda e Suporte</Text>
                <Text style={styles.settingSubtitle}>
                  Central de ajuda e contato
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            {/* Sobre */}
            <TouchableOpacity
              style={styles.settingItem}
              onPress={handleAbout}
            >
              <View style={[styles.settingIcon, styles.iconGray]}>
                <Ionicons name="information-circle" size={22} color="#8E8E93" />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Sobre o Amparo</Text>
                <Text style={styles.settingSubtitle}>
                  Versão 1.0.0 - Termos de uso
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Botão de Sair */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={22} color="#FF3B30" />
          <Text style={styles.logoutButtonText}>Sair da Conta</Text>
        </TouchableOpacity>

        {/* Espaçamento inferior */}
        <View style={styles.bottomSpacer} />
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
  backButton: {
    padding: scaleWidth(4),
  },
  headerTitle: {
    fontSize: scaleFontSize(20),
    fontWeight: '700',
    color: '#1a1a1a',
  },
  headerSpacer: {
    width: scaleWidth(32),
  },
  content: {
    flex: 1,
    padding: scaleWidth(20),
  },
  caregiverCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: scaleModerate(16),
    padding: scaleWidth(20),
    marginBottom: scaleHeight(24),
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: scaleHeight(16),
  },
  avatar: {
    width: scaleWidth(80),
    height: scaleWidth(80),
    borderRadius: scaleModerate(40),
  },
  avatarPlaceholder: {
    width: scaleWidth(80),
    height: scaleWidth(80),
    borderRadius: scaleModerate(40),
    backgroundColor: '#E8F4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  caregiverInfo: {
    alignItems: 'center',
    marginBottom: scaleHeight(16),
  },
  caregiverName: {
    fontSize: scaleFontSize(22),
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: scaleHeight(4),
  },
  caregiverEmail: {
    fontSize: scaleFontSize(14),
    color: '#666',
    marginBottom: scaleHeight(8),
  },
  roleBadge: {
    backgroundColor: '#E8F4FF',
    paddingHorizontal: scaleWidth(12),
    paddingVertical: scaleHeight(6),
    borderRadius: scaleModerate(8),
  },
  roleText: {
    fontSize: scaleFontSize(13),
    fontWeight: '600',
    color: '#007AFF',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(8),
    backgroundColor: '#E8F4FF',
    paddingHorizontal: scaleWidth(20),
    paddingVertical: scaleHeight(12),
    borderRadius: scaleModerate(10),
  },
  editButtonText: {
    fontSize: scaleFontSize(15),
    fontWeight: '600',
    color: '#007AFF',
  },
  section: {
    marginBottom: scaleHeight(24),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scaleHeight(12),
  },
  sectionTitle: {
    fontSize: scaleFontSize(18),
    fontWeight: '700',
    color: '#1a1a1a',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(4),
  },
  addButtonText: {
    fontSize: scaleFontSize(15),
    fontWeight: '600',
    color: '#007AFF',
  },
  elderlyList: {
    backgroundColor: '#f9f9f9',
    borderRadius: scaleModerate(12),
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  elderlyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scaleWidth(16),
    borderBottomWidth: scaleWidth(1),
    borderBottomColor: '#e0e0e0',
  },
  elderlyAvatar: {
    width: scaleWidth(40),
    height: scaleWidth(40),
    borderRadius: scaleModerate(20),
    backgroundColor: '#E8F4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  elderlyInfo: {
    flex: 1,
  },
  elderlyName: {
    fontSize: scaleFontSize(16),
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: scaleHeight(2),
  },
  elderlyAge: {
    fontSize: scaleFontSize(14),
    color: '#666',
  },
  statusDot: {
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
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scaleWidth(8),
    marginTop: scaleHeight(12),
    paddingVertical: scaleHeight(12),
  },
  viewAllButtonText: {
    fontSize: scaleFontSize(15),
    fontWeight: '600',
    color: '#007AFF',
  },
  settingsList: {
    backgroundColor: '#f9f9f9',
    borderRadius: scaleModerate(12),
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scaleWidth(16),
    borderBottomWidth: scaleWidth(1),
    borderBottomColor: '#e0e0e0',
  },
  settingIcon: {
    width: scaleWidth(44),
    height: scaleWidth(44),
    borderRadius: scaleModerate(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconGreen: {
    backgroundColor: '#E8F8EC',
  },
  iconYellow: {
    backgroundColor: '#FFF9E5',
  },
  iconBlue: {
    backgroundColor: '#E8F4FF',
  },
  iconPurple: {
    backgroundColor: '#F0EFFF',
  },
  iconGray: {
    backgroundColor: '#F5F5F5',
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: scaleFontSize(16),
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: scaleHeight(2),
  },
  settingSubtitle: {
    fontSize: scaleFontSize(13),
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scaleWidth(8),
    backgroundColor: '#FFF3F3',
    paddingVertical: scaleHeight(14),
    borderRadius: scaleModerate(12),
    marginTop: scaleHeight(8),
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  logoutButtonText: {
    fontSize: scaleFontSize(16),
    fontWeight: '600',
    color: '#FF3B30',
  },
  bottomSpacer: {
    height: scaleWidth(40),
  },
});
