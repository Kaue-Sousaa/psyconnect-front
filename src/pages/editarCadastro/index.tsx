import React, { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { styles } from "./style";
import Constants from "expo-constants";
import {useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Octicons } from '@expo/vector-icons';

const baseURL = Constants.expoConfig?.extra?.API_URL;

export default function EditarUsuario() {
    const navigation = useNavigation();

    const [id, setId] = useState(null);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [telefone, setTelefone] = useState("");
    const [role, setRole] = useState("");
    const [isProfessor, setIsProfessor] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmSenha, setConfirmSenha] = useState("");
    const [showPassword, setShowPassword] = useState(true);
  
    useEffect(() => {
      const carregarDadosUsuario = async () => {
        const token = await AsyncStorage.getItem('accessToken');
        const email = await AsyncStorage.getItem('email');
        const response = await fetch(`${baseURL}/v1/usuario/${email}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        const usuario = await response.json();
        setId(usuario.id);
        setNome(usuario.nome);
        setEmail(usuario.email);
        setCpf(formatarCpf(usuario.cpf));
        setDataNascimento(usuario.dataNascimento);
        setTelefone(usuario.telefone);
        setRole(usuario.role);
        setIsProfessor(usuario.isProfessor);
      };
      carregarDadosUsuario();
    }, []);
  
    const handleSubmit = async () => {
      if(senha !== confirmSenha){
        return Alert.alert("Erro", "As senhas não coincidem.");
      }
        
      const token = await AsyncStorage.getItem('accessToken');
      const response = await fetch(`${baseURL}/v1/usuario/atualiza`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
            id,
            nome,
            email,
            cpf: cpf.replace(/[.-]/g, ""),
            dataNascimento,
            telefone,
            role,
            isProfessor,
            senha,
            confirmSenha
            }),
        });
  
      if (response.ok) {
        Alert.alert("Sucesso", "Dados atualizados!");
        navigation.goBack();
      } else {
        const errorData = await response.json();
        Alert.alert("Erro", errorData.message || "Falha ao atualizar dados.");
      }
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
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.title}>Editar Dados</Text>
  
        <Text style={styles.inputLabel}>Nome Completo:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          value={nome}
          onChangeText={setNome}
        />
  
        <Text style={styles.inputLabel}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
  
        <Text style={styles.inputLabel}>CPF:</Text>
        <TextInput
          style={styles.input}
          placeholder="CPF"
          value={cpf}
          onChangeText={(text) => setCpf(formatarCpf(text))}
          keyboardType="numeric"
          maxLength={14}
        />
  
        <Text style={styles.inputLabel}>Data de Nascimento:</Text>
        <TextInput
          style={styles.input}
          placeholder="Data de Nascimento (DD/MM/AAAA)"
          value={dataNascimento}
          onChangeText={(text) => setDataNascimento(formatarData(text))}
          keyboardType="numeric"
          maxLength={10}
        />
  
        <Text style={styles.inputLabel}>Telefone:</Text>
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={telefone}
          onChangeText={(text) => setTelefone(formatarTelefone(text))}
          keyboardType="phone-pad"
          maxLength={15}
        />
  
        <Text style={styles.inputLabel}>Senha:</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputSenha}
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={showPassword}
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
            <Octicons name={showPassword ? "eye-closed" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>
  
        <Text style={styles.inputLabel}>Confirmar Senha:</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputSenha}
            placeholder="Confirmar Senha"
            value={confirmSenha}
            onChangeText={setConfirmSenha}
            secureTextEntry={showPassword}
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
            <Octicons name={showPassword ? "eye-closed" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>
  
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>
    );
}

