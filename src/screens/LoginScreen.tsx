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
import { loginUser } from '../database/database';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    const user = await loginUser(email.trim(), password);

    if (user) {
      navigation.replace('Home', { userName: user.name });
    } else {
      Alert.alert(
        'Login não encontrado',
        'E-mail ou senha inválidos. Se você ainda não tem conta, faça seu cadastro.',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Cadastrar', onPress: () => navigation.navigate('Register') },
        ]
      );
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
            <View style={styles.logoArea}>
              <Text style={styles.logoText}>
                <Text style={styles.logoPink}>mídia</Text>
                <Text style={styles.logoWhite}>on</Text>
              </Text>

              <Text style={styles.slogan}>
                ORGANIZE <Text style={styles.sloganPink}>E</Text> SIRVA COM PROPÓSITO
              </Text>

              <Text style={styles.started}>Let's get started!</Text>
            </View>

            <View style={styles.form}>
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

              <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin}>
                <Text style={styles.btnPrimaryText}>Entrar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnGoogle}>
                <Text style={styles.btnGoogleText}>Entrar com Google</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerText}>
                  Não tem login? <Text style={styles.registerBold}>Cadastre-se</Text>
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.forgotArea}>
                <Text style={styles.forgotText}>Esqueceu a senha?</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 32,
  },
  logoArea: {
    alignItems: 'center',
    marginBottom: 44,
  },
  logoText: {
    fontSize: 56,
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
    marginTop: 12,
    textAlign: 'center',
  },
  sloganPink: {
    color: '#E91E8C',
  },
  started: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 16,
  },
  form: {
    width: '100%',
  },
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
    marginBottom: 28,
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
    marginBottom: 14,
  },
  btnPrimaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnGoogle: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 22,
  },
  btnGoogleText: {
    color: '#111111',
    fontSize: 16,
    fontWeight: '500',
  },
  registerText: {
    textAlign: 'center',
    color: '#CFCFCF',
    fontSize: 14,
    marginBottom: 16,
  },
  registerBold: {
    color: '#E91E8C',
    fontWeight: 'bold',
  },
  forgotArea: {
    alignItems: 'center',
  },
  forgotText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});