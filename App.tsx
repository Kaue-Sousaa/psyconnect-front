import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './src/pages/login';
import PrimeiroAcesso from './src/pages/primeiroAcesso';
import Home from './src/pages/home';
import Cadastro from './src/pages/cadastroUsuario';
import Agendamento from './src/pages/cadastrarAluno';
import EditarUsuario from './src/pages/editarCadastro';

import { AuthProvider, useAuth, Role } from './src/utils/AuthContext';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeDrawer() {
  const { setRole, role, logout } = useAuth();
  const navigation = useNavigation<any>();

  useEffect(() => {
    const loadRole = async () => {
      const storedRole = await AsyncStorage.getItem('role');
      if (storedRole) {
        setRole(storedRole as Role);
      }
    };
    loadRole();
  }, []);

  const handleLogout = async () => {
    logout();
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('usuario');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('role');

    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen 
          name="Home" 
          component={Home}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        {role !== 'USUARIO' && <Drawer.Screen name="Cadastro" component={Cadastro} options={{
          drawerIcon: ({color, size}) => (
            <Icon name="person-add" color={color} size={size}/>
          )
        }} />}
        <Drawer.Screen 
          name="Agendamento" 
          component={Agendamento}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon name="calendar-today" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen 
          name="Editar Perfil" 
          component={EditarUsuario} 
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon name="mode-edit" color={color} size={size} />
            ),
          }}
        />
      </Drawer.Navigator>

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          position: 'absolute',
          top: 5,
          right: 20,
          zIndex: 1,
          backgroundColor: 'transparent',
          padding: 10,
        }}
      >
        <Icon name="exit-to-app" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
}

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Primeiro Acesso" component={PrimeiroAcesso} />
      <Stack.Screen name="Main" component={HomeDrawer} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}