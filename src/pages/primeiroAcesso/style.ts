import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: "bold",
        color: "#333",
    },
    boxMid: {
        height: height * 0.25,
        width: '100%',
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    input: {
        width: "100%",
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
    },
    boxBottom: {
        height: height * 0.3,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    iconContainer: {
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
});