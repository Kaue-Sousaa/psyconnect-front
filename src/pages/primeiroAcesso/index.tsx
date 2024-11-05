import React, { useState } from "react";
import { View, Text} from "react-native";
import { Input } from "../../components/Input";
import { styles } from "./style";
import { Button } from "../../components/Button";
import { MaterialIcons, Octicons } from '@expo/vector-icons';

export default function PrimeiroAcesso() {
    const [email, setEmail] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmSenha, setConfirmSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmSenha, setMostrarConfirmSenha] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleEnviar = () => {
        console.log("Email:", email);
        console.log("Nova Senha:", novaSenha);
        console.log("Confirmação de Senha:", confirmSenha);
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Primeiro Acesso</Text>
            <View style={styles.boxMid}>
                <Input
                    title="Email"
                    value={email}
                    onChangeText={setEmail}
                    IconRigth={MaterialIcons}
                    keyboardType="email-address"
                />
                <Input
                    title="Nova Senha"
                    value={novaSenha}
                    onChangeText={setNovaSenha}
                    secureTextEntry={!mostrarSenha}
                    IconRigth={Octicons}
                    iconRightName={!mostrarSenha ? "eye-closed" : "eye"}
                    onIconRigthPress={() => setMostrarSenha(!mostrarSenha)}
                />
                <Input
                    title="Confirme a Senha"
                    value={confirmSenha}
                    onChangeText={setConfirmSenha}
                    secureTextEntry={!mostrarConfirmSenha}
                    IconRigth={Octicons}
                    iconRightName={!mostrarConfirmSenha ? "eye-closed" : "eye"}
                    onIconRigthPress={() => setMostrarConfirmSenha(!mostrarConfirmSenha)}
                />
            </View>
           <View style={styles.boxBottom}>
                <Button text="ENVIAR" loading={loading} onPress={() => handleEnviar()} />
            </View>
        </View>
    );
}
