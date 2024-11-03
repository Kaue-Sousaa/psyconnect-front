import React from 'react';
import { View, Text, Image } from 'react-native';

import {styles} from './styles'

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao PsiConnect</Text>
      <Text style={styles.description}>
        Oferecemos suporte pedagógico e psicológico para o desenvolvimento do seu filho.
      </Text>

      <Image 
        source={{ uri: 'https://example.com/image.jpg' }} 
        style={styles.image} 
      />
    </View>
  );
};

export default Home;
