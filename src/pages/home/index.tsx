import React, { useState } from 'react';
import { View, Text, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from "./styles";
import { HomeNavigationProp } from '../types/navigationTypes'; 

export default function Home() {
  const navigation = useNavigation<HomeNavigationProp>();

  const [submenuVisible, setSubmenuVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informações sobre Autismo e Síndrome de Down</Text>
      
      <Button title="Abrir Submenu" onPress={() => setSubmenuVisible(!submenuVisible)} />

      {submenuVisible && (
        <View style={styles.submenu}>
          <Button title="Cadastrar Aluno" onPress={() => navigation.navigate('CadastroAluno')} />
          <Button title="Cadastro de Usuário" onPress={() => navigation.navigate('Cadastro')} />
        </View>
      )}
    </View>
  );
}