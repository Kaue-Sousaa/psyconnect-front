import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { HomeNavigationProp } from '../types/navigationTypes';

export default function Home() {
  const navigation = useNavigation<HomeNavigationProp>();
  const [submenuVisible, setSubmenuVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuIcon}
        onPress={() => setSubmenuVisible(!submenuVisible)}
      >
        <MaterialIcons name="menu" size={30} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Informações sobre Autismo e Síndrome de Down</Text>

      {submenuVisible && (
        <View style={styles.submenu}>
          <Button title="Agendamento" onPress={() => navigation.navigate('Agendamento')} />
          <Button title="Cadastro de Usuário" onPress={() => navigation.navigate('Cadastro')} />
        </View>
      )}
    </View>
  );
}
