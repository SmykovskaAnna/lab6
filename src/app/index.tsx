import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system/legacy';
import { useFonts } from 'expo-font';
import { useEffect, useRef, useState } from 'react';
import { Animated, Platform, StyleSheet, useWindowDimensions } from 'react-native';
import MedievalScreen from '@/components/medieval-screen';
import { lockPortrait, unlockOrientation } from '@/components/orientation';

const FALLBACK_TITLE = 'Dungeons and Dragons game';
const FALLBACK_VERSION = 'Version 1.0';

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({ Medieval: require('../../assets/fonts/MedievalSharp.ttf') });
  const [gameInfo, setGameInfo] = useState({ title: FALLBACK_TITLE, version: FALLBACK_VERSION });
  const [fileError, setFileError] = useState(false);
  const [started, setStarted] = useState(false);
  const { width, height } = useWindowDimensions();
  const dragonX = useRef(new Animated.Value(-100)).current;
  const dragonY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    lockPortrait().catch(() => {});
    return () => { unlockOrientation().catch(() => {}); };
  }, []);

  useEffect(() => {
    let active = true;
    async function readGameInfo() {
      try {
        const asset = Asset.fromModule(require('../../assets/data/game-info.txt'));
        let contents: string;
        if (Platform.OS === 'web') {
          const response = await fetch(asset.uri);
          if (!response.ok) throw new Error('Text file request failed');
          contents = await response.text();
        } else {
          await asset.downloadAsync();
          if (!asset.localUri) throw new Error('Text file is unavailable');
          contents = await FileSystem.readAsStringAsync(asset.localUri);
        }
        const [title, version] = contents.trim().split('|').map((part) => part.trim());
        if (!title || !version) throw new Error('Invalid game info');
        if (active) setGameInfo({ title, version });
      } catch (error) {
        console.warn('Could not read game-info.txt; using default game info.', error);
        if (active) setFileError(true);
      }
    }
    readGameInfo();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let mounted = true;
    let timer: ReturnType<typeof setTimeout>;
    const fly = () => {
      if (!mounted) return;
      dragonX.setValue(-100);
      const startY = height * (0.12 + Math.random() * 0.5);
      const endY = Math.max(16, Math.min(height - 80, startY + (Math.random() - 0.5) * 180));
      dragonY.setValue(startY);
      const useNativeDriver = Platform.OS !== 'web';
      Animated.parallel([
        Animated.timing(dragonX, { toValue: width + 100, duration: 4000, useNativeDriver }),
        Animated.timing(dragonY, { toValue: endY, duration: 4000, useNativeDriver }),
      ]).start();
      timer = setTimeout(fly, 5000);
    };
    fly();
    return () => { mounted = false; clearTimeout(timer); dragonX.stopAnimation(); dragonY.stopAnimation(); };
  }, [dragonX, dragonY, height, width]);

  if (!fontsLoaded) return null;

  return (
    <MedievalScreen
      title={gameInfo.title}
      subtitle={gameInfo.version}
      onEnterClick={() => setStarted(true)}
      buttonLabel={started ? 'Your journey begins' : 'Start your journey'}
      fileError={fileError}
      dragon={(
        <Animated.Text style={[styles.dragon, { transform: [{ translateX: dragonX }, { translateY: dragonY }] }]}>🐉</Animated.Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  dragon: { position: 'absolute', top: 0, left: 0, fontSize: 46, zIndex: 1 },
});
