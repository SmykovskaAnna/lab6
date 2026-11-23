import LottieView from 'lottie-react-native';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

export default function Torch({ style }: { style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.glow} />
      <LottieView source={require('../../assets/animations/torch.json')} autoPlay loop style={styles.flame} />
      <View style={styles.handle} />
      <View style={styles.handleBand} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'flex-end' },
  glow: { position: 'absolute', top: 10, width: 62, height: 74, borderRadius: 40, backgroundColor: 'rgba(255, 119, 18, 0.18)', shadowColor: '#ff6a00', shadowOpacity: 0.9, shadowRadius: 20, elevation: 12 },
  handle: { position: 'absolute', bottom: 4, zIndex: 2, width: 18, height: 78, borderRadius: 6, borderWidth: 2, borderColor: '#a66b32', backgroundColor: '#432414' },
  handleBand: { position: 'absolute', zIndex: 3, bottom: 70, width: 22, height: 8, borderRadius: 3, backgroundColor: '#b17a35' },
  flame: { position: 'absolute', top: -5, width: '100%', height: '92%' },
});
