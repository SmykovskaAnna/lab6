import type { ReactNode } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Torch from '@/components/torch';

interface MedievalScreenProps {
  title?: string;
  subtitle?: string;
  onEnterClick?: () => void;
  buttonLabel?: string;
  fileError?: boolean;
  dragon?: ReactNode;
}

export default function MedievalScreen({
  title = 'Dungeons and Dragons game',
  subtitle = 'Start your journey',
  onEnterClick,
  buttonLabel = 'Start game',
  fileError = false,
  dragon,
}: MedievalScreenProps) {
  return (
    <View style={styles.background}>
      <Image source={require('../../assets/medieval_wood.jpg')} resizeMode="cover" style={styles.backgroundImage} />
      <View style={styles.overlay} />
      <View pointerEvents="none" style={styles.dragonLayer}>{dragon}</View>
      <SafeAreaView style={styles.container}>
        <Torch style={styles.torch} />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          {fileError && <Text style={styles.error}>Game info file is missing or invalid. Showing defaults.</Text>}
          <Pressable onPress={onEnterClick} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
            <Text style={styles.buttonText}>{buttonLabel}</Text>
          </Pressable>
        </View>
        <Torch style={[styles.torch, styles.torchRight]} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  backgroundImage: { ...StyleSheet.absoluteFill, width: '100%', height: '100%' },
  overlay: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  dragonLayer: { ...StyleSheet.absoluteFill, zIndex: 1 },
  container: { flex: 1, zIndex: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 8 },
  torch: { width: 72, height: 160 },
  torchRight: { transform: [{ scaleX: -1 }] },
  title: { color: '#D4AF37', fontFamily: 'Medieval', fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, textShadowColor: '#201306', textShadowRadius: 8 },
  subtitle: { color: '#F5DEB3', fontFamily: 'Medieval', fontSize: 18, textAlign: 'center', marginBottom: 28 },
  error: { color: '#F5DEB3', textAlign: 'center', fontSize: 12, marginBottom: 14 },
  button: { backgroundColor: '#70431e', borderColor: '#D4AF37', borderWidth: 2, paddingVertical: 13, paddingHorizontal: 24, borderRadius: 8, elevation: 5 },
  buttonPressed: { transform: [{ scale: 0.94 }], opacity: 0.85, backgroundColor: '#98652f' },
  buttonText: { color: '#FFF1CF', fontFamily: 'Medieval', fontSize: 18 },
});
