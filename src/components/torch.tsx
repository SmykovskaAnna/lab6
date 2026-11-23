import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

export default function Torch({ style }: { style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.flame}>🔥</Text>
      <View style={styles.handle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  flame: { fontSize: 40 },
  handle: { width: 8, height: 68, marginTop: -4, borderRadius: 4, backgroundColor: '#633315' },
});
