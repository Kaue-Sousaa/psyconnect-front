import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";

import {styles} from "./style"
import Constants from "expo-constants";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const baseURL = Constants.expoConfig?.extra?.API_URL;

export default function CadastroUsuario() {
    const navigation = useNavigation<NavigationProp<any>>();
    
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [telefone, setTelefone] = useState("");
    const [role, setRole] = useState("USUARIO");
    const [isProfessor, setIsProfessor] = useState(false);
    
    const handleSubmit = async () => {
        try {
            const response = await fetch(`${baseURL}/v1/usuario/cadastro`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome,
                    email,
                    cpf: cpf.replace(/[.-]/g, ""),
                    dataNascimento,
                    telefone,
                    role,
                    isProfessor,
                }),
            });
    
            if (response.status == 200) {
                Alert.alert("Sucesso", "Usuário cadastrado!");
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Main' }],
                });
                resetForm();
            } else {
                const errorData = await response.json();
                Alert.alert("Erro", errorData.message || "Falha ao cadastrar usuário.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            Alert.alert("Erro", "Não foi possível cadastrar o usuário. Tente novamente.");
        }
    };
    
    const resetForm = () => {
        setNome("");
        setEmail("");
        setCpf("");
        setDataNascimento("");
        setTelefone("");
        setRole("USUARIO");
        setIsProfessor(false);
    };

    const formatarCpf = (input: string) => {
        const apenasNumeros = input.replace(/\D/g, "");
        if (apenasNumeros.length <= 11) {
            const cpfFormatado = apenasNumeros
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d{2})$/, "$1-$2");
            return cpfFormatado;
        }
        return input;
    };

    const formatarData = (input: string) => {
        const apenasNumeros = input.replace(/\D/g, "");
        if (apenasNumeros.length <= 8) {
            const dataFormatada = apenasNumeros
                .replace(/(\d{2})(\d)/, "$1/$2")
                .replace(/(\d{2})(\d)/, "$1/$2");
            return dataFormatada;
        }
        return input;
    };

    const formatarTelefone = (input: string) => {
        const apenasNumeros = input.replace(/\D/g, "");
        if (apenasNumeros.length <= 10) {
            const telefoneFormatado = apenasNumeros
                .replace(/(\d{2})(\d)/, "($1) $2")
                .replace(/(\d{4})(\d)/, "$1-$2");
            return telefoneFormatado;
        }
        return input;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro de Usuário</Text>

            <TextInput
                style={styles.input}
                placeholder="Nome Completo"
                value={nome}
                onChangeText={setNome}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <TextInput
                style={styles.input}
                placeholder="CPF"
                value={cpf}
                onChangeText={(text) => setCpf(formatarCpf(text))}
                keyboardType="numeric"
                maxLength={14}
            />

            <TextInput
                style={styles.input}
                placeholder="Data de Nascimento (DD/MM/AAAA)"
                value={dataNascimento}
                onChangeText={(text) => setDataNascimento(formatarData(text))}
                keyboardType="numeric"
                maxLength={10}
            />

            <TextInput
                style={styles.input}
                placeholder="Telefone"
                value={telefone}
                onChangeText={(text) => setTelefone(formatarTelefone(text))}
                keyboardType="phone-pad"
                maxLength={15}
            />

            <View style={styles.toggleContainer}>
                <Text style={styles.professorText}>É Professor?</Text>
                <TouchableOpacity
                    style={styles.toggleButton}
                    onPress={() => setIsProfessor(prev => !prev)}
                >
                    <Text style={styles.toggleButtonText}>
                        {isProfessor ? "Sim" : "Não"}
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
}
