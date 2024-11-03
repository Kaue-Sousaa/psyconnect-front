import React, { useState } from "react";
import { View, TextInput, Button, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import {styles} from "./style"

export default function PrimeiroAcesso() {
    const [email, setEmail] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmSenha, setConfirmSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmSenha, setMostrarConfirmSenha] = useState(false);

    const handleEnviar = () => {
        console.log("Email:", email);
        console.log("Nova Senha:", novaSenha);
        console.log("Confirmação de Senha:", confirmSenha);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Primeiro Acesso</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Nova Senha"
                    value={novaSenha}
                    onChangeText={setNovaSenha}
                    secureTextEntry={!mostrarSenha}
                />
                <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)} style={styles.iconContainer}>
                    <Icon name={mostrarSenha ? "eye" : "eye-slash"} size={20} color="#333" />
                </TouchableOpacity>
            </View>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Confirme a Senha"
                    value={confirmSenha}
                    onChangeText={setConfirmSenha}
                    secureTextEntry={!mostrarConfirmSenha}
                />
                <TouchableOpacity onPress={() => setMostrarConfirmSenha(!mostrarConfirmSenha)} style={styles.iconContainer}>
                    <Icon name={mostrarConfirmSenha ? "eye" : "eye-slash"} size={20} color="#333" />
                </TouchableOpacity>
            </View>
            <Button title="Enviar" onPress={handleEnviar} />
        </View>
    );
}

