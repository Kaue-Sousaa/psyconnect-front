import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { HomeNavigationProp } from '../types/navigationTypes';

import imgMathUndead from '../../assets/math-vs-undead.png';
import imgMisterioSonho from '../../assets/O Mistério dos Sonho.png';
import imgWordBubbles from '../../assets/Word Bubbles.png';

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [selectedGame, setSelectedGame] = useState<{ title: string; image: any; description: string } | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<{ title: string; tips: string } | null>(null);

  type IconName = 'accessibility' | 'face' | 'favorite' | 'psychology'; // Definição do tipo restrito

  const highlightCards = [
    { title: 'Math vs Undead', image: imgMathUndead, description: 'Para gostar de matemática, que tal combater os zumbis acertando continhas? A cada nível um novo desafio envolvendo multiplicação, divisão, subtração e adição. Acertando o cálculo você vai eliminando os zumbis. Excelente jogo para exercitar cálculos mentais. Indicado para crianças maiores de 8 anos. Gratuito e disponível para Iphone, Ipad e Android.' },
    { title: 'O Mistério dos Sonhos', image: imgMisterioSonho, description: 'Para ajudar os guardiões, vocês precisarão executar algumas missões para chegar ao objetivo final. A criança estará envolvida em diversas funções cognitivas. Em muitos momentos é preciso ler, executar comandos, raciocinar, entender as regras e estar muito atento ao objetivo final.' },
    { title: 'Word Bubbles', image: imgWordBubbles, description: 'Desenvolve a aprendizagem da escrita pois possibilita a criança envolver-se em deduções de escrita. Junte bolinhas e forme palavras. Um jogo com atrativos visuais, auditivos e táteis que desperta grande interesse nos pequenos. Disponível na Apple Store (smartphones e tablets) e na Playstore (uma versão similar). Gratuito'},
  ]; 

  const conditions: { 
    title: string; 
    description: string; 
    icon: IconName; 
    tips: string; 
  }[] = [
    {
      title: 'Autismo',
      description: 'Informações sobre autismo e cuidados especiais.',
      icon: 'accessibility',
      tips: 'Ofereça uma rotina estruturada e esteja atento à comunicação não-verbal. Use linguagem simples e direta para interações e reforce comportamentos positivos.',
    },
    {
      title: 'Síndrome de Down',
      description: 'Conheça mais sobre a Síndrome de Down.',
      icon: 'face',
      tips: 'Incentive o desenvolvimento das habilidades motoras e da fala. Seja paciente e celebre pequenas conquistas, fornecendo estímulos adequados para o desenvolvimento.',
    },
    {
      title: 'Deficiência Mental',
      description: 'Informações sobre deficiência mental e cuidados especiais.',
      icon: 'psychology',
      tips: 'Crie um ambiente seguro e acolhedor, oferecendo suporte emocional e educacional. Utilize métodos de ensino adaptados e incentive a autonomia da criança sempre que possível.',
    },
    {
      title: 'Outras Condições',
      description: 'Informações sobre outras condições.',
      icon: 'favorite',
      tips: 'Compreenda as necessidades individuais de cada criança e ofereça apoio emocional. Envolva profissionais especializados para orientação personalizada.',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Informações para Responsáveis</Text>

      
      <Text style={styles.sectionTitle}>Dicas de Jogos Educativos</Text>

    
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
        {highlightCards.map((card, index) => (
          <TouchableOpacity
            key={index}
            style={styles.carouselCard}
            onPress={() => {
              setSelectedGame(card);
              setModalVisible(true);
            }}
          >
            <Image source={card.image} style={styles.carouselImage} />
            <Text style={styles.carouselCardTitle}>{card.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>


      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedGame && (
              <>
                <Image source={selectedGame.image} style={styles.modalImage} />
                <Text style={styles.modalTitle}>{selectedGame.title}</Text>
                <Text style={styles.modalDescription}>{selectedGame.description}</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      
      <View style={styles.infoSection}>
        {conditions.map((condition, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => {
              setSelectedCondition(condition);
              setInfoModalVisible(true);
            }}
          >
            <MaterialIcons name={condition.icon || 'info'} size={40} color="#4F4F4F" />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{condition.title}</Text>
              <Text style={styles.cardDescription}>{condition.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

   
      <Modal
        visible={infoModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setInfoModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedCondition && (
              <>
                <Text style={styles.modalTitle}>{selectedCondition.title}</Text>
                <Text style={styles.modalDescription}>{selectedCondition.tips}</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setInfoModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
