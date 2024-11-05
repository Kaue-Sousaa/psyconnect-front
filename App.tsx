import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/pages/login';
import PrimeiroAcesso from './src/pages/primeiroAcesso';
import Home from './src/pages/home';
import Cadastro from './src/pages/cadastroUsuario';
import CadastroAluno from './src/pages/cadastrarAluno';

type RootStackParamList = {
  Login: undefined;
  PrimeiroAcesso: undefined;
  Home: undefined;
  Cadastro: undefined;
  CadastroAluno: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="PrimeiroAcesso" component={PrimeiroAcesso} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="CadastroAluno" component={CadastroAluno} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
