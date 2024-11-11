import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#fff",
      paddingHorizontal: 20,
    },
    scrollViewContainer: {
      width: '100%',
      paddingBottom: 20,
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 30,
      color: "#333",
    },
    inputLabel: {
      fontSize: 16,
      fontWeight: "500",
      color: "#555",
      marginBottom: 5,
      alignSelf: 'flex-start',
      marginLeft: 26,
    },
    input: {
      height: 45,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 15,
      paddingLeft: 15,
      fontSize: 16,
      color: "#333",
      backgroundColor: "#f9f9f9",
      width: '90%',
    },
    passwordContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15,
      width: '90%',
      position: 'relative',
    },
    inputSenha: {
      height: 45,
      flex: 1,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 10,
      paddingLeft: 15,
      fontSize: 16,
      backgroundColor: "#f9f9f9",
      width: '100%',
      paddingRight: 40,
    },
    eyeIcon: {
      position: 'absolute',
      right: 10,
    },
    submitButton: {
      backgroundColor: "#4CAF50",
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 40,
      marginTop: 20,
      alignItems: "center",
      marginBottom: 20,
      width: "80%",
    },
    submitButtonText: {
      fontSize: 16,
      color: "#fff",
      fontWeight: "bold",
    },
  });
  
  