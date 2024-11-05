import { StackNavigationProp } from '@react-navigation/stack';


export type RootStackParamList = {
  Login: undefined;
  PrimeiroAcesso: undefined;
  Home: undefined;
  Cadastro: undefined;
  CadastroAluno: undefined;
};

export type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
