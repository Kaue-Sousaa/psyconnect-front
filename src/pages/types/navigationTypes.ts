import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Login: undefined;
  PrimeiroAcesso: { email: string };
  Home: undefined;
  Cadastro: undefined;
  Agendamento: undefined;
};

export type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
