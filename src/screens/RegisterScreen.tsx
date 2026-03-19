import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { registerUser } from '../database/database';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>;
};

export default function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirm) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    const success = await registerUser(name.trim(), email.trim(), password);
    if (success) {
      Alert.alert('Sucesso', 'Conta criada! Faça login.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } else {
      Alert.alert('Erro', 'E-mail já cadastrado.');
    }
  };

  return (
    <LinearGradient colors={['#0B0B3B', '#1A0B2E']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          style={styles.keyboard}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Logo */}
            <View style={styles.logoArea}>
              <Text style={styles.logoText}>
                <Text style={styles.logoPink}>mídia</Text>
                <Text style={styles.logoWhite}>on</Text>
              </Text>
              <Text style={styles.slogan}>
                ORGANIZE <Text style={styles.sloganPink}>E</Text> SIRVA COM PROPÓSITO
              </Text>
              <Text style={styles.pageTitle}>Criar Conta</Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                placeholder="Seu nome completo"
                placeholderTextColor="#8f8f8f"
                value={name}
                onChangeText={setName}
              />

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="exemplo@gmail.com"
                placeholderTextColor="#8f8f8f"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              <Text style={styles.label}>Senha</Text>
              <View style={styles.passwordRow}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="••••••••"
                  placeholderTextColor="#8f8f8f"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={22}
                    color="#bdbdbd"
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Confirmar Senha</Text>
              <View style={styles.passwordRow}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="••••••••"
                  placeholderTextColor="#8f8f8f"
                  secureTextEntry={!showConfirm}
                  value={confirm}
                  onChangeText={setConfirm}
                />
                <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                  <Ionicons
                    name={showConfirm ? 'eye-off-outline' : 'eye-outline'}
                    size={22}
                    color="#bdbdbd"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.btnPrimary} onPress={handleRegister}>
                <Text style={styles.btnPrimaryText}>Cadastrar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.loginText}>
                  Já tem conta? <Text style={styles.loginBold}>Entrar</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  keyboard: { flex: 1 },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 32,
  },
  logoArea: {
    alignItems: 'center',
    marginBottom: 36,
  },
  logoText: {
    fontSize: 52,
    letterSpacing: -1,
  },
  logoPink: {
    color: '#E91E8C',
    fontWeight: '300',
  },
  logoWhite: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  slogan: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    marginTop: 10,
    textAlign: 'center',
  },
  sloganPink: {
    color: '#E91E8C',
  },
  pageTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 14,
  },
  form: { width: '100%' },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: '#FFFFFF',
    fontSize: 15,
    marginBottom: 20,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    color: '#FFFFFF',
    fontSize: 15,
  },
  btnPrimary: {
    backgroundColor: '#E91E8C',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  btnPrimaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginText: {
    textAlign: 'center',
    color: '#CFCFCF',
    fontSize: 14,
  },
  loginBold: {
    color: '#E91E8C',
    fontWeight: 'bold',
  },
});