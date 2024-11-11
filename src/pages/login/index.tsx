import React, { useState } from "react";
import { style } from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Text, View, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from "expo-constants";
import { useAuth } from '../../utils/AuthContext';

const baseURL = Constants.expoConfig?.extra?.API_URL;

export default function Login() {
    const navigation = useNavigation<NavigationProp<any>>();
    const { setRole } = useAuth();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [loading, setLoading] = useState(false);

    const validarEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    async function getLogin() {
        try {
            setLoading(true);
    
            if (!email) {
                return Alert.alert("Erro", "O campo de email não pode estar vazio.");
            }
            if (!validarEmail(email)) {
                return Alert.alert("Erro", "Por favor, insira um email válido.");
            }
            if (!senha) {
                return Alert.alert("Erro", "O campo de senha não pode estar vazio.");
            }
    
            const response = await fetch(`${baseURL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });
    
            if (response.ok) {
                const data = await response.json();
                await AsyncStorage.setItem('accessToken', data.accessToken);
                await AsyncStorage.setItem('usuario', data.usuario);
                await AsyncStorage.setItem('email', data.email);
                await AsyncStorage.setItem('role', data.role);

                setRole(data.role);

                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Main' }],
                });
            } else if (response.status === 403) {
                const errorData = await response.json();
                if (errorData.message === "É necessário alterar a senha no primeiro acesso.") {
                    navigation.navigate('Primeiro Acesso', { email });
                    setSenha('');
                } else {
                    Alert.alert('Erro', errorData.message || 'Erro ao fazer login');
                }
            } else {
                const errorData = await response.json();
                Alert.alert('Erro ao fazer login', errorData.message);
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Erro', 'Não foi possível conectar ao servidor');
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={style.container}>
            <View style={style.boxTop}>
                <Text style={style.text}>Bem-vindo ao PsyConnect!</Text>
            </View>
            <View style={style.boxMid}>
                <Input 
                    title="ENDEREÇO E-MAIL"
                    value={email}
                    onChangeText={setEmail}
                    IconRigth={MaterialIcons}
                    iconRightName="email"
                />
                <Input 
                    title="SENHA"
                    value={senha}
                    onChangeText={setSenha}
                    IconRigth={Octicons}
                    iconRightName={showPassword ? "eye" : "eye-closed"}
                    onIconRigthPress={() => setShowPassword(!showPassword)}
                    secureTextEntry={showPassword}
                />
            </View>
            <View style={style.boxBottom}>
                <Button text="ENTRAR" loading={loading} onPress={getLogin} />
            </View>
        </View>
    );
}
