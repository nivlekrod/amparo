import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function EditProfileScreen() {
  const router = useRouter();
  
  const [name, setName] = useState('Maria Silva');
  const [email, setEmail] = useState('maria.silva@email.com');
  const [phone, setPhone] = useState('(11) 98765-4321');
  const [birthDate, setBirthDate] = useState(new Date(1985, 4, 15));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [role, setRole] = useState('Cuidador(a)');
  const [showRolePicker, setShowRolePicker] = useState(false);
  const [institution, setInstitution] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  const roles = [
    'Cuidador(a)',
    'Enfermeiro(a)',
    'Médico(a)',
    'Fisioterapeuta',
    'Familiar',
    'Outro',
  ];

  const handleBack = () => {
    if (hasChanges) {
      Alert.alert(
        'Descartar alterações?',
        'Você tem alterações não salvas. Deseja descartar?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Descartar', style: 'destructive', onPress: () => router.back() },
        ]
      );
    } else {
      router.back();
    }
  };

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha o nome completo.');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha o e-mail.');
      return;
    }

    if (!phone.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha o telefone.');
      return;
    }

    Alert.alert(
      'Salvar alterações',
      'Deseja salvar as alterações no seu perfil?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Salvar',
          onPress: () => {
            console.log('Perfil salvo:', { name, email, phone, birthDate, role, institution });
            setHasChanges(false);
            Alert.alert('Sucesso', 'Perfil atualizado com sucesso!', [
              { text: 'OK', onPress: () => router.back() },
            ]);
          },
        },
      ]
    );
  };

  const handleChangePhoto = () => {
    Alert.alert(
      'Alterar Foto',
      'Escolha uma opção',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Tirar Foto', onPress: () => console.log('Tirar foto') },
        { text: 'Escolher da Galeria', onPress: () => console.log('Escolher da galeria') },
      ]
    );
  };

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatPhone = (text: string): string => {
    const numbers = text.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setBirthDate(selectedDate);
      setHasChanges(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Perfil</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveButton}>Salvar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Foto de Perfil */}
        <View style={styles.photoSection}>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={handleChangePhoto}
            activeOpacity={0.7}
          >
            <View style={styles.avatar}>
              <Ionicons name="person" size={50} color="#007AFF" />
            </View>
            <View style={styles.addPhotoButton}>
              <Ionicons name="add" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
          <Text style={styles.changePhotoText}>Toque para alterar a foto</Text>
        </View>

        {/* Formulário */}
        <View style={styles.form}>
          {/* Nome Completo */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome Completo *</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Digite seu nome completo"
                placeholderTextColor="#999"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  setHasChanges(true);
                }}
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email *</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Digite seu e-mail"
                placeholderTextColor="#999"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setHasChanges(true);
                }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Telefone */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Telefone *</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="call-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="(00) 00000-0000"
                placeholderTextColor="#999"
                value={phone}
                onChangeText={(text) => {
                  setPhone(formatPhone(text));
                  setHasChanges(true);
                }}
                keyboardType="phone-pad"
                maxLength={15}
              />
            </View>
          </View>

          {/* Data de Nascimento */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Data de Nascimento *</Text>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons name="calendar-outline" size={20} color="#666" style={styles.inputIcon} />
              <Text style={styles.dateText}>{formatDate(birthDate)}</Text>
              <Ionicons name="chevron-down" size={20} color="#999" />
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={birthDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onDateChange}
              maximumDate={new Date()}
              minimumDate={new Date(1920, 0, 1)}
            />
          )}

          {/* Cargo/Função */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cargo/Função *</Text>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => setShowRolePicker(!showRolePicker)}
            >
              <Ionicons name="briefcase-outline" size={20} color="#666" style={styles.inputIcon} />
              <Text style={styles.dateText}>{role}</Text>
              <Ionicons
                name={showRolePicker ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#999"
              />
            </TouchableOpacity>

            {showRolePicker && (
              <View style={styles.dropdown}>
                {roles.map((roleOption) => (
                  <TouchableOpacity
                    key={roleOption}
                    style={[
                      styles.dropdownItem,
                      role === roleOption && styles.dropdownItemSelected,
                    ]}
                    onPress={() => {
                      setRole(roleOption);
                      setShowRolePicker(false);
                      setHasChanges(true);
                    }}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        role === roleOption && styles.dropdownItemTextSelected,
                      ]}
                    >
                      {roleOption}
                    </Text>
                    {role === roleOption && (
                      <Ionicons name="checkmark" size={20} color="#007AFF" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Instituição */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Instituição</Text>
            <Text style={styles.labelSubtitle}>Opcional - Nome da instituição onde trabalha</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="business-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Ex: Hospital São Lucas"
                placeholderTextColor="#999"
                value={institution}
                onChangeText={(text) => {
                  setInstitution(text);
                  setHasChanges(true);
                }}
              />
            </View>
          </View>

          {/* Informação adicional */}
          <View style={styles.infoBox}>
            <Ionicons name="information-circle" size={20} color="#007AFF" />
            <Text style={styles.infoText}>
              Mantenha seus dados atualizados para garantir a melhor experiência no aplicativo.
            </Text>
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
  saveButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  content: {
    flex: 1,
  },
  photoSection: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E8F4FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  addPhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  changePhotoText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  labelSubtitle: {
    fontSize: 13,
    color: '#999',
    marginTop: -4,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
  },
  dropdown: {
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemSelected: {
    backgroundColor: '#E8F4FF',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  dropdownItemTextSelected: {
    fontWeight: '600',
    color: '#007AFF',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#E8F4FF',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#007AFF',
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 40,
  },
});
