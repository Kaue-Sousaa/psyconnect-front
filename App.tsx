import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/pages/login';
import PrimeiroAcesso from './src/pages/primeiroAcesso';
import Home from './src/pages/home';
import Cadastro from './src/pages/cadastroUsuario';
import Agendamento from './src/pages/cadastrarAluno';
import { createDrawerNavigator } from '@react-navigation/drawer';


type RootStackParamList = {
  Login: undefined;
  "Primeiro Acesso": undefined;
  Home: undefined;
  Cadastro: undefined;
  Agendamento: undefined;
};

const Drawer = createDrawerNavigator();

// const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Primeiro Acesso" component={PrimeiroAcesso} />
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Cadastro" component={Cadastro} />
        <Drawer.Screen name="Agendamento" component={Agendamento} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
