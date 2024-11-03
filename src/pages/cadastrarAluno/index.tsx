import React, { useState } from "react";
import { View, Text, TextInput, Modal, TouchableOpacity, FlatList, Alert } from "react-native";
import { Calendar } from "react-native-calendars";
import { Picker } from "@react-native-picker/picker";

import {styles} from './style'

interface Aluno {
    nome: string;
    dataNascimento: string;
    habilidade: string;
    dificuldade: string;
    responsavel: string;
    data: string | null;
}

export default function CadastroAluno() {
    const [nome, setNome] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [habilidade, setHabilidade] = useState("");
    const [dificuldade, setDificuldade] = useState("");
    const [responsavel, setResponsavel] = useState("");
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [alunosCadastrados, setAlunosCadastrados] = useState<Aluno[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const handleDayPress = (day: { dateString: string }) => {
        setSelectedDate(day.dateString);
        setModalVisible(true);
    };

    const handleSave = () => {
        const novoAluno: Aluno = { 
            nome, 
            dataNascimento, 
            habilidade, 
            dificuldade, 
            responsavel, 
            data: selectedDate 
        };
        
        if (editingIndex !== null) {
            const updatedAlunos = [...alunosCadastrados];
            updatedAlunos[editingIndex] = novoAluno;
            setAlunosCadastrados(updatedAlunos);
        } else {
            setAlunosCadastrados(prevAlunos => [...prevAlunos, novoAluno]);
        }
        
        resetForm();
        setModalVisible(false);
    };

    const resetForm = () => {
        setNome("");
        setDataNascimento("");
        setHabilidade("");
        setDificuldade("");
        setResponsavel("");
        setEditingIndex(null);
    };

    const handleEdit = (index: number) => {
        const aluno = alunosCadastrados[index];
        setNome(aluno.nome);
        setDataNascimento(aluno.dataNascimento);
        setHabilidade(aluno.habilidade);
        setDificuldade(aluno.dificuldade);
        setResponsavel(aluno.responsavel);
        setEditingIndex(index);
        setSelectedDate(aluno.data);
        setModalVisible(true);
    };

    const handleCancel = () => {
        resetForm();
        setModalVisible(false);
    };

    const formatarData = (input: string) => {
        const apenasNumeros = input.replace(/\D/g, "");
        if (apenasNumeros.length <= 8) {
            return apenasNumeros.replace(/(\d{2})(\d)/, "$1/$2").replace(/(\d{2})(\d)/, "$1/$2");
        }
        return input;
    };

    const formatDateTitle = (dateString: string | null): string => {
        if (!dateString) return "";
        const [year, month, day] = dateString.split("-");
        return `${day}/${month}/${year}`;
    };
    
    const alunosPorDia = () => {
        const diasAlunos: Record<string, Aluno[]> = {};

        alunosCadastrados.forEach(aluno => {
            if (aluno.data) {
                if (!diasAlunos[aluno.data]) {
                    diasAlunos[aluno.data] = [];
                }
                diasAlunos[aluno.data].push(aluno);
            }
        });
        const datasOrdenadas = Object.keys(diasAlunos).sort();
        return datasOrdenadas.map(data => ({
            data,
            alunos: diasAlunos[data],
        }));
    };

    return (
        <View style={styles.container}>
            <Calendar
                onDayPress={handleDayPress}
                markedDates={alunosCadastrados.reduce<Record<string, { marked: boolean; dotColor: string }>>((acc, aluno) => {
                    if (aluno.data) {
                        acc[aluno.data] = { marked: true, dotColor: 'blue' }; 
                    }
                    return acc;
                }, {})}
            />
    
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCancel}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>{editingIndex !== null ? "Editar Aluno" : "Cadastro do Aluno"} para {formatDateTitle(selectedDate)}</Text>
    
                        <TextInput
                            placeholder="Nome"
                            value={nome}
                            onChangeText={setNome}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Data de Nascimento (DD/MM/AAAA)"
                            value={dataNascimento}
                            onChangeText={(text) => setDataNascimento(formatarData(text))}
                            keyboardType="numeric"
                            maxLength={10}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Habilidade"
                            value={habilidade}
                            onChangeText={setHabilidade}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Dificuldade"
                            value={dificuldade}
                            onChangeText={setDificuldade}
                            style={styles.input}
                        />
    
                        <View style={styles.pickerContainer}>
                            <Text style={styles.pickerLabel}>Responsável:</Text>
                            <Picker
                                selectedValue={responsavel}
                                onValueChange={setResponsavel}
                                style={styles.picker}
                            >
                                <Picker.Item label="Selecione um responsável" value="" />
                                <Picker.Item label="Responsável 1" value="Responsável 1" />
                                <Picker.Item label="Responsável 2" value="Responsável 2" />
                                <Picker.Item label="Responsável 3" value="Responsável 3" />
                            </Picker>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                                <Text style={styles.buttonText}>Salvar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <FlatList
                data={alunosPorDia()}
                keyExtractor={(item) => item.data}
                ListHeaderComponent={<Text style={styles.alunosTitle}>Agendamentos do mês:</Text>}
                renderItem={({ item }) => (
                    <View style={styles.diaContainer}>
                        <Text style={styles.diaText}>{formatDateTitle(item.data)}</Text>
                        {item.alunos.map((aluno, index) => (
                            <TouchableOpacity key={index} onPress={() => handleEdit(alunosCadastrados.findIndex(a => a === aluno))} style={styles.alunoItem}>
                                <Text style={styles.alunoNome}>{aluno.nome}</Text>
                                <Text>Data Nascimento: {aluno.dataNascimento}</Text>
                                <Text>Responsável: {aluno.responsavel}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
                style={styles.alunosContainer}
            />
        </View>
    );
}
