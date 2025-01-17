import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Picker } from "@react-native-picker/picker";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from "./style";
import { Swipeable } from "react-native-gesture-handler";

const baseURL = Constants.expoConfig?.extra?.API_URL;

interface Aluno {
  id: string | null;
  nome: string;
  dataNascimento: string;
  dataAgendamento: string;
  habilidade: string;
  dificuldade: string;
  responsavel: string;
  data: string | null;
}

interface UsuarioDto {
  nome: string;
}

export default function CadastroAluno() {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [userLogado, setUserLogado] = useState<string | null>(null);

  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [dataAgendamento, setDataAgendamento] = useState("");
  const [habilidade, setHabilidade] = useState("");
  const [dificuldade, setDificuldade] = useState("");
  const [responsavel, setResponsavel] = useState<UsuarioDto | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [alunosCadastrados, setAlunosCadastrados] = useState<Aluno[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [responsaveis, setResponsaveis] = useState<UsuarioDto[]>([]);
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    const loadTokenAndRole = async () => {
      const storedToken = await AsyncStorage.getItem("accessToken");
      const storedRole = await AsyncStorage.getItem("role");
      const storedUser = await AsyncStorage.getItem("usuario");

      setToken(storedToken);
      setRole(storedRole);
      setUserLogado(storedUser);
    };
    loadTokenAndRole();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      setDataAgendamento(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (token && role && userLogado) {
      handleMonthChange({ month, year });
      fetchResponsaveis();
    }
  }, [token, role, userLogado, month, year]);

  const fetchResponsaveis = async () => {
    try {
      const response = await fetch(`${baseURL}/v1/usuario/role-usuario`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const responsaveisData: UsuarioDto[] = await response.json();
        setResponsaveis(responsaveisData);
      } else {
        Alert.alert("Erro", "Não foi possível carregar os responsáveis.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      Alert.alert("Erro", "Falha ao buscar responsáveis.");
    }
  };

  const handleMonthChange = async (monthInfo: {
    month: number;
    year: number;
  }) => {
    const { year, month } = monthInfo;

    try {
      if (!role || !userLogado) return;

      const url =
        role === "USUARIO"
          ? `${baseURL}/v1/aluno/${userLogado}?mes=${month}&ano=${year}`
          : `${baseURL}/v1/aluno/consulta?mes=${month}&ano=${year}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const alunosData: Aluno[] = await response.json();
        const alunosOrganizados = alunosData.map((aluno) => ({
          ...aluno,
          data: aluno.dataAgendamento,
        }));
        setAlunosCadastrados(alunosOrganizados);
      } else {
        Alert.alert(
          "Erro",
          "Não foi possível carregar os alunos para este mês."
        );
      }
    } catch (error) {
      console.error("Erro ao buscar alunos do mês:", error);
      Alert.alert("Erro", "Falha ao carregar alunos.");
    }
  };

  const handleDayPress = (day: { dateString: string }) => {
    if (role !== "USUARIO") {
      setSelectedDate(day.dateString);
      setModalVisible(true);
    }
  };

  const handleSave = async () => {
    const alunoId = editingIndex === null ? null : id;

    const novoAluno: Aluno = {
      id: alunoId,
      nome,
      dataNascimento,
      dataAgendamento,
      habilidade,
      dificuldade,
      responsavel: responsavel?.nome || "",
      data: selectedDate,
    };

    try {
      const url =
        editingIndex === null
          ? `${baseURL}/v1/aluno/cadastro`
          : `${baseURL}/v1/aluno`;

      const method = editingIndex === null ? "POST" : "PUT";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(novoAluno),
      });

      if (response.ok || response.status === 201) {
        Alert.alert(
          "Sucesso",
          editingIndex === null
            ? "Cadastro realizado!"
            : "Atualização realizada!"
        );

        if (editingIndex === null) {
          setAlunosCadastrados((prevAlunos) => [...prevAlunos, novoAluno]);
        } else {
          const updatedAlunos = [...alunosCadastrados];
          updatedAlunos[editingIndex] = novoAluno;
          setAlunosCadastrados(updatedAlunos);
        }

        resetForm();
        setModalVisible(false);
      } else {
        const errorData = await response.json();
        Alert.alert("Erro", errorData.message || "Falha ao salvar os dados.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      Alert.alert("Erro", "Não foi possível salvar os dados. Tente novamente.");
    }
  };

  const resetForm = () => {
    setNome("");
    setDataNascimento("");
    setHabilidade("");
    setDificuldade("");
    setResponsavel(null);
    setEditingIndex(null);
  };

  const handleEdit = (id: string | null) => {
    const aluno = alunosCadastrados.find((aluno) => aluno.id === id);
    if (aluno) {
      setId(aluno.id!);
      setNome(aluno.nome);
      setDataNascimento(aluno.dataNascimento);
      setHabilidade(aluno.habilidade);
      setDificuldade(aluno.dificuldade);
      setResponsavel(
        responsaveis.find((r) => r.nome === aluno.responsavel) || null
      );
      setEditingIndex(alunosCadastrados.findIndex((a) => a.id === id));
      setSelectedDate(aluno.data);
      setModalVisible(true);
    }
  };

  const handleDelete = async (id: string | null) => {
    try {
      const response = await fetch(`${baseURL}/v1/aluno/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok || response.status === 204) {
        setAlunosCadastrados((prevAlunos) =>
          prevAlunos.filter((aluno) => aluno.id !== id)
        );
        Alert.alert("Sucesso", "Aluno excluído com sucesso.");
      } else {
        Alert.alert("Erro", "Não foi possível excluir o aluno.");
      }
    } catch (error) {
      console.error("Erro ao excluir aluno:", error);
      Alert.alert("Erro", "Falha ao excluir aluno.");
    }
  };

  const renderRightActions = (id: string | null) => (
    <TouchableOpacity
      style={styles.cancelButton}
      onPress={() => handleDelete(id)}
    >
      <Text style={styles.buttonText}>Excluir</Text>
    </TouchableOpacity>
  );

  const handleCancel = () => {
    resetForm();
    setModalVisible(false);
  };

  const formatarData = (input: string) => {
    const apenasNumeros = input.replace(/\D/g, "");
    if (apenasNumeros.length <= 8) {
      return apenasNumeros
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\d{2})(\d)/, "$1/$2");
    }
    return input;
  };

  const formatDateTitle = (dateString: string | null): string => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const alunosPorDia = (alunosFiltrados?: Aluno[]) => {
    const diasAlunos: Record<string, Aluno[]> = {};

    alunosCadastrados.forEach((aluno) => {
      if (aluno.data) {
        if (!diasAlunos[aluno.data]) {
          diasAlunos[aluno.data] = [];
        }
        diasAlunos[aluno.data].push(aluno);
      }
    });
    const datasOrdenadas = Object.keys(diasAlunos).sort();
    return datasOrdenadas.map((data) => ({
      data,
      alunos: diasAlunos[data],
    }));
  };

  const alunosFiltrados =
    role === "USUARIO"
      ? alunosCadastrados.filter((aluno) => aluno.responsavel === userLogado)
      : alunosCadastrados;

  return (
    <View style={styles.container}>
      <Calendar
        locale={"pt-BR"}
        onDayPress={handleDayPress}
        onMonthChange={handleMonthChange}
        markedDates={alunosCadastrados.reduce<
          Record<string, { marked: boolean; dotColor: string }>
        >((acc, aluno) => {
          if (aluno.data) {
            acc[aluno.data] = { marked: true, dotColor: "blue" };
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
            <Text>
              {editingIndex !== null ? "Editar Aluno" : "Cadastro do Aluno"}{" "}
              para {formatDateTitle(selectedDate)}
            </Text>

            <TextInput
              placeholder="Nome"
              value={nome}
              onChangeText={setNome}
              style={styles.input}
              editable={role !== "USUARIO"}
            />
            <TextInput
              placeholder="Data de Nascimento (DD/MM/AAAA)"
              value={dataNascimento}
              onChangeText={(text) => setDataNascimento(formatarData(text))}
              keyboardType="numeric"
              maxLength={10}
              style={styles.input}
              editable={role !== "USUARIO"}
            />
            <TextInput
              placeholder="Habilidade"
              value={habilidade}
              onChangeText={setHabilidade}
              style={styles.input}
              editable={role !== "USUARIO"}
            />
            <TextInput
              placeholder="Dificuldade"
              value={dificuldade}
              onChangeText={setDificuldade}
              style={styles.input}
              editable={role !== "USUARIO"}
            />

            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Responsável:</Text>
              <Picker
                enabled={role !== "USUARIO"}
                selectedValue={responsavel?.nome}
                onValueChange={(value) =>
                  setResponsavel(
                    responsaveis.find((r) => r.nome === value) || null
                  )
                }
              >
                <Picker.Item label="Selecione o Responsável" value="" />
                {responsaveis.map((responsavelItem) => (
                  <Picker.Item
                    key={responsavelItem.nome}
                    label={responsavelItem.nome}
                    value={responsavelItem.nome}
                  />
                ))}
              </Picker>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                disabled={role === "USUARIO"}
                style={styles.saveButton}
                onPress={handleSave}
              >
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Text style={styles.alunosTitle}>Agendamentos do mês:</Text>
      <FlatList
        data={alunosPorDia(alunosFiltrados)}
        keyExtractor={(item, index) => `${item.data}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.diaContainer}>
            <Text style={styles.diaText}>{formatDateTitle(item.data)}</Text>
            {item.alunos.map((aluno) => (
              <Swipeable
                enabled={role !== "USUARIO"}
                key={aluno.id}
                renderRightActions={() => renderRightActions(aluno.id)}
              >
                <TouchableOpacity
                  style={styles.alunoItem}
                  onPress={() => handleEdit(aluno.id)}
                >
                  <Text style={styles.alunoNome}>{aluno.nome}</Text>
                  <Text>Data Nascimento: {aluno.dataNascimento}</Text>
                  <Text>Responsável: {aluno.responsavel}</Text>
                </TouchableOpacity>
              </Swipeable>
            ))}
          </View>
        )}
      />
    </View>
  );
}
