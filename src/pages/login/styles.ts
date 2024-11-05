import { StyleSheet, Dimensions } from "react-native";
import { themas } from "../../global/themes";

const { height } = Dimensions.get('window');

export const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    boxTop: {
        height: height * 0.3,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxMid: {
        height: height * 0.25,
        width: '100%',
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    boxBottom: {
        height: height * 0.3,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    boxInput: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderRadius: 25,
        borderColor: themas.Colors.lightGray,
        backgroundColor: themas.Colors.bgScreen,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    logo: {
        width: 80,
        height: 80,
        marginTop: 40,
    },
    text: {
        marginTop: 35,
        fontSize: 20,
        fontWeight: 'bold',
    },
    input: {
        height: '100%',
        width: '100%',
        borderRadius: 25,
    },
    titleInput: {
        marginLeft: 5,
        color: themas.Colors.gray,
        marginTop: 10,
    },
    textBottom: {
        fontSize: 16,
        color: themas.Colors.gray,
        textAlign: 'center',
    },
    textBottomCreate: {
        fontSize: 16,
        color: themas.Colors.primary,
    },
    button: {
        marginTop: 20,
        width: '100%',
        borderRadius: 25,
        backgroundColor: themas.Colors.primary, 
        paddingVertical: 15,
        alignItems: 'center', 
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
