import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export const LoadingIndicator = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#00f" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',  // Para dar um fundo translúcido
  },
});
