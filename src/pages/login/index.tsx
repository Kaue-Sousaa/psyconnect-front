import React, { useState } from "react";
import { style } from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Text, View, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { MaterialIcons, Octicons } from '@expo/vector-icons';

export default function Login() {
    const navigation = useNavigation<NavigationProp<any>>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [loading, setLoading] = useState(false);

    async function getLogin() {
        try {
            setLoading(true);

            if (!email || !password) {
                return Alert.alert('Atenção:', 'Informe os campos obrigatórios!');
            }
            
            if (email === 'test@example.com' && password === '123456') {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            } else {
                Alert.alert('Erro', 'Email ou senha incorretos');
            }
        } catch (error) {
            console.log(error);
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
                    onIconRigthPress={() => console.log('Ola')}
                />
                <Input 
                    title="SENHA"
                    value={password}
                    onChangeText={setPassword}
                    IconRigth={Octicons}
                    iconRightName={showPassword ? "eye-closed" : "eye"}
                    onIconRigthPress={() => setShowPassword(!showPassword)}
                    secureTextEntry={showPassword}
                />
            </View>
            <View style={style.boxBottom}>
                <Button text="ENTRAR" loading={loading} onPress={() => getLogin()} />
            </View>
        </View>
    );
}
