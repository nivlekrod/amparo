import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterElderlyScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [watchCode, setWatchCode] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [healthConditions, setHealthConditions] = useState('');
  const [medications, setMedications] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const formatBirthDate = (text: string) => {
    const numbers = text.replace(/\D/g, '');
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 4) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    } else {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
    }
  };

  const handleBirthDateChange = (text: string) => {
    const formatted = formatBirthDate(text);
    setBirthDate(formatted);
  };

  const calculateAge = (birthDateStr: string): number => {
    const [day, month, year] = birthDateStr.split('/').map(Number);
    const birth = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleSave = () => {
    // Validação dos campos obrigatórios
    if (!name.trim()) {
      alert('Por favor, preencha o nome completo do idoso.');
      return;
    }

    if (!birthDate.trim()) {
      alert('Por favor, preencha a data de nascimento.');
      return;
    }

    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(birthDate)) {
      alert('Por favor, digite a data no formato DD/MM/AAAA.');
      return;
    }

    const [day, month, year] = birthDate.split('/').map(Number);
    const birthDateObj = new Date(year, month - 1, day);
    const today = new Date();
    
    if (birthDateObj > today) {
      alert('A data de nascimento não pode ser no futuro.');
      return;
    }

    if (month < 1 || month > 12 || day < 1 || day > 31) {
      alert('Por favor, digite uma data válida.');
      return;
    }

    const age = calculateAge(birthDate);
    if (age < 0 || age > 150) {
      alert('Por favor, digite uma data de nascimento válida.');
      return;
    }

    if (!watchCode.trim()) {
      alert('Por favor, preencha o código do relógio.');
      return;
    }

    if (watchCode.length !== 6) {
      alert('O código do relógio deve ter exatamente 6 dígitos.');
      return;
    }

    if (!emergencyPhone.trim()) {
      alert('Por favor, preencha o telefone de emergência.');
      return;
    }

    const phoneDigits = emergencyPhone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      alert('Por favor, digite um telefone válido.');
      return;
    }

    const calculatedAge = calculateAge(birthDate);
    
    const elderlyData = {
      name,
      birthDate,
      age: calculatedAge,
      watchCode,
      emergencyPhone,
      healthConditions,
      medications,
      registeredAt: new Date().toISOString(),
    };

    // Por enquanto apenas exibe os dados no console
    console.log('Cadastro do idoso:', elderlyData);
    setShowSuccessModal(true);
  };

  const handleAddAnother = () => {
    // Limpar formulário
    setName('');
    setBirthDate('');
    setWatchCode('');
    setEmergencyPhone('');
    setHealthConditions('');
    setMedications('');
    setShowSuccessModal(false);
  };

  const handleFinish = () => {
    router.push({
      pathname: '/screens/initialSetupScreen',
      params: { elderlyRegistered: 'true' }
    });
  };

  if (showSuccessModal) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successContent}>
          <View style={styles.successIconContainer}>
            <Ionicons name="checkmark-circle" size={80} color="#34C759" />
          </View>
          <Text style={styles.successTitle}>Idoso Cadastrado!</Text>
          <Text style={styles.successMessage}>
            O idoso {name} foi cadastrado com sucesso.
          </Text>
          <View style={styles.successButtons}>
            <TouchableOpacity
              style={styles.addAnotherButton}
              onPress={handleAddAnother}
              activeOpacity={0.8}
            >
              <Ionicons name="add-circle-outline" size={20} color="#007AFF" />
              <Text style={styles.addAnotherButtonText}>Adicionar Outro</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.finishButton}
              onPress={handleFinish}
              activeOpacity={0.8}
            >
              <Text style={styles.finishButtonText}>Concluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cadastrar Idoso</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.form}>
          {/* Nome Completo */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nome Completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o nome completo do idoso"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          {/* Data de Nascimento */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Data de Nascimento</Text>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/AAAA"
              placeholderTextColor="#999"
              value={birthDate}
              onChangeText={handleBirthDateChange}
              keyboardType="number-pad"
              maxLength={10}
            />
          </View>

          {/* Código do Relógio */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Código do Relógio</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o código de 6 dígitos"
              placeholderTextColor="#999"
              value={watchCode}
              onChangeText={setWatchCode}
              keyboardType="number-pad"
              maxLength={6}
            />
            <Text style={styles.helperText}>
              O código está no relógio do idoso
            </Text>
          </View>

          {/* Telefone de Emergência */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Telefone de Emergência</Text>
            <TextInput
              style={styles.input}
              placeholder="(11) 99999-9999"
              placeholderTextColor="#999"
              value={emergencyPhone}
              onChangeText={setEmergencyPhone}
              keyboardType="phone-pad"
              maxLength={15}
            />
          </View>

          {/* Condições de Saúde */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Condições de Saúde</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Ex: Hipertensão, Diabetes, Problemas cardíacos, etc."
              placeholderTextColor="#999"
              value={healthConditions}
              onChangeText={setHealthConditions}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Medicamentos em Uso */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Medicamentos em Uso</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Liste os medicamentos que o idoso toma regularmente"
              placeholderTextColor="#999"
              value={medications}
              onChangeText={setMedications}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
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
    minHeight: 100,
    paddingTop: 14,
  },
  helperText: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: -4,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
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
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  successContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  successContent: {
    alignItems: 'center',
    width: '100%',
  },
  successIconContainer: {
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  successButtons: {
    width: '100%',
    gap: 12,
  },
  addAnotherButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F4FF',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  addAnotherButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  finishButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
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
  finishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
