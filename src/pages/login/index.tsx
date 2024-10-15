import React, { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator, ImageBackground } from 'react-native';
import { style } from './styles';
import logo from '../../assets/logo.png';
import autismo from '../../assets/simbolo-autismo.png';  // Importa a imagem
import { MaterialIcons } from '@expo/vector-icons';
import { themas } from "../../global/themes";

export default function Login() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);

    async function getLogin() {
        try {
            setLoading(true);

            if (!email || !senha) {
                setLoading(false);
                return Alert.alert('Atenção: ', 'Informe os campos obrigatórios');
            }

            setTimeout(() => {
                Alert.alert('Sucesso', 'Logado com sucesso');
                setLoading(false);
            }, 3000);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        // <ImageBackground
        //     source={autismo}
        //     style={{ flex: 1}} 
        //     resizeMode="cover" 
        // >
            <View style={style.container}>
                <View style={style.boxTop}>
                    <Image
                        source={autismo}
                        style={style.logo}
                        resizeMode="contain"
                    />
                    <Text style={style.text}>Bem-vindo(a) ao PsyConnect</Text>
                </View>

                <View style={style.boxMid}>
                    <Text style={style.titleInput}>ENDEREÇO E-MAIL:</Text>
                    <View style={style.boxInput}>
                        <TextInput
                            style={style.input}
                            value={email}
                            onChangeText={setEmail}
                        />
                        <MaterialIcons
                            name="email"
                            size={20}
                            color={themas.Colors.gray}
                        />
                    </View>

                    <Text style={style.titleInput}>SENHA:</Text>
                    <View style={style.boxInput}>
                        <TextInput
                            style={style.input}
                            value={senha}
                            onChangeText={setSenha}
                        />
                        <MaterialIcons
                            name="remove-red-eye"
                            size={20}
                            color={themas.Colors.gray}
                        />
                    </View>
                </View>

                <View style={style.boxBottom}>
                    <TouchableOpacity style={style.button} onPress={() => getLogin()}>
                        {loading ?
                            <ActivityIndicator color={'#FFFF'} size={'small'} />
                            :
                            <Text style={style.textButton}>Entrar</Text>}
                    </TouchableOpacity>
                </View>
            </View>
        // </ImageBackground>
    );
}