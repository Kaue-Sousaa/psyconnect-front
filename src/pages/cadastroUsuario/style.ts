import {StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#F0F4FF",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#4A4E69",
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: '#BFC0C0',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        backgroundColor: "#FFF",
        color: "#4A4E69",
    },
    toggleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 20,
    },
    professorText: {
        fontSize: 16,
        color: "#4A4E69",
    },
    toggleButton: {
        backgroundColor: "#FFD166",
        padding: 10,
        alignItems: "center",
        borderRadius: 5,
        width: 80,
    },
    toggleButtonText: {
        color: "#4A4E69",
        fontWeight: "bold",
    },
    submitButton: {
        backgroundColor: "#6DC97A",
        padding: 15,
        alignItems: "center",
        borderRadius: 5,
        width: "100%",
    },
    submitButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});
