import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import { Input } from "../../components/Input";
import { styles } from "./style";
import { Button } from "../../components/Button";
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { useRoute, RouteProp, NavigationProp, useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { RootStackParamList } from "../types/navigationTypes";

const baseURL = Constants.expoConfig?.extra?.API_URL;

export default function PrimeiroAcesso() {
    const navigation = useNavigation<NavigationProp<any>>();
    const route = useRoute<RouteProp<RootStackParamList, 'PrimeiroAcesso'>>();  
    const { email: emailInicial } = route.params;  

    const [email, setEmail] = useState(emailInicial);
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmSenha, setConfirmSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmSenha, setMostrarConfirmSenha] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        Alert.alert(
            "Alteração de Senha",
            "Para garantir a segurança, por favor, defina uma nova senha."
        );
    }, []);

    const validarEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    async function handleEnviar() {
        try{
            if (!email) {
                return Alert.alert("Erro", "O campo de email não pode estar vazio.");
            }
            if (!validarEmail(email)) {
                return Alert.alert("Erro", "Por favor, insira um email válido.");
            }
            if (!novaSenha || !confirmSenha) {
                return Alert.alert("Erro", "Os campos de nova senha e confirmação de senha não podem estar vazios.");
            }
            if (novaSenha !== confirmSenha) {
                return Alert.alert("Erro", "As senhas não coincidem.");
            }
    
            const response = await fetch(`${baseURL}/v1/usuario/primeiro-acesso`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, novaSenha, confirmSenha }),
            });
            if(response.ok){
                Alert.alert("Senha atualizada");
                navigation.navigate('Login', { email });
            }else{
                let errorMessage = 'Erro desconhecido';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } catch (error) {
                    console.log('Erro ao parsear resposta JSON:', error);
                }
                Alert.alert('Erro ao fazer Primeiro Acesso', errorMessage);
            }
            setLoading(false);

        }catch(error){
            console.log(error)
            Alert.alert('Erro', 'Não foi possível conectar ao servidor');
        }
        
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Primeiro Acesso</Text>
            <View style={styles.formContainer}>
                <Input
                    title="Email"
                    value={email}
                    onChangeText={setEmail}
                    IconRigth={MaterialIcons}
                    keyboardType="email-address"
                />
                <Input
                    title="Nova Senha"
                    value={novaSenha}
                    onChangeText={setNovaSenha}
                    secureTextEntry={!mostrarSenha}
                    IconRigth={Octicons}
                    iconRightName={mostrarSenha ? "eye" : "eye-closed"}
                    onIconRigthPress={() => setMostrarSenha(!mostrarSenha)}
                />
                <Input
                    title="Confirme a Senha"
                    value={confirmSenha}
                    onChangeText={setConfirmSenha}
                    secureTextEntry={!mostrarConfirmSenha}
                    IconRigth={Octicons}
                    iconRightName={mostrarConfirmSenha ? "eye" : "eye-closed"}
                    onIconRigthPress={() => setMostrarConfirmSenha(!mostrarConfirmSenha)}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button text="ENVIAR" loading={loading} onPress={handleEnviar} />
            </View>
        </View>
    );
}
